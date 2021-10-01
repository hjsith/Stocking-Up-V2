const { Order, Price, Holding } = require("../db/Models");
const { investorSell, investorBuy } = require("./Investor");
const { Op } = require("sequelize");
const moment = require("moment");

async function getOrdersByInvestor(investorID) {
  return await Order.findAll({
    where: {
      InvestorID: investorID,
    },
  });
}

async function getAllPendingOrders() {
  return await Order.findAll({
    where: {
      Status: "PENDING",
      ExecutionTime: {
        [Op.lt]: moment.utc(),
      },
    },
  });
}

async function getAllPendingOrdersByInvestor(investorID) {
  return await Order.findAll({
    where: {
      Status: "PENDING",
      InvestorID: investorID,
    },
  });
}

async function createOrder(
  investorID,
  quantityOrder,
  orderTime,
  typeOfOrder,
  listingID,
  executionTime
) {
  let currentPriceObject = await Price.findOne({
    where: {
      ListingID: listingID,
    },
  });
  let orderTotal = currentPriceObject.CurrentPrice * parseInt(quantityOrder);

  if (typeOfOrder == "SELL") {
    let canSell = false;
    (async () => {
      canSell = await sellOrder(
        investorID,
        quantityOrder,
        orderTotal,
        listingID,
        orderTime
      );
    })();

    if (!canSell) {
      return "Error";
    }
  }
  return await Order.create({
    InvestorID: investorID,
    QuantityOrder: parseInt(quantityOrder),
    ListingPrice: currentPriceObject.CurrentPrice,
    OrderTotal: orderTotal,
    ExecutionTime: executionTime,
    OrderTime: orderTime,
    TypeOfOrder: typeOfOrder,
    ListingID: listingID,
    Status: typeOfOrder == "BUY" ? "PENDING" : "EXECUTED",
  });
}
async function sellOrder(
  investorID,
  quantityOrder,
  orderTotal,
  listingID,
  orderTime
) {
  const currentHoldings = await Holding.findAll({
    where: {
      InvestorID: investorID,
      Current: 1,
    },
  });

  let currentPriceObject = await Price.findOne({
    where: {
      ListingID: listingID,
    },
  });

  let orders = [];
  let orderIDs = [];

  var values = new Promise((resolve, reject) => {
    currentHoldings.forEach(async (holding, index, currentHoldings) => {
      await Order.findOne({
        where: {
          ListingID: listingID,
          OrderID: holding.OrderID,
        },
      }).then((order) => {
        if (order != null) {
          orders.push(order);
          orderIDs.push(order.OrderID);
        }
        if (index === currentHoldings.length - 1) resolve();
      });
    });
  });

  let totalQuantity = 0;

  values.then(async () => {
    orders.forEach((order) => {
      totalQuantity += order.QuantityOrder;
    });

    if (quantityOrder > totalQuantity) return false;
    else {
      await investorSell(investorID, orderTotal);
      if (totalQuantity - quantityOrder != 0) {
        await Order.create({
          InvestorID: investorID,
          QuantityOrder: totalQuantity - quantityOrder,
          ListingPrice: currentPriceObject.CurrentPrice,
          OrderTotal:
            currentPriceObject.CurrentPrice * (totalQuantity - quantityOrder),
          ExecutionTime: orderTime,
          OrderTime: orderTime,
          TypeOfOrder: "BUY",
          ListingID: listingID,
          Status: "EXECUTED",
        }).then(async (order) => {
          await Holding.create({
            InvestorID: investorID,
            ListingID: listingID,
            OrderID: order.OrderID,
            Current: 1,
          });
        });
      }

      await Holding.findAll({
        where: {
          OrderID: orderIDs,
        },
      }).then(async (holdings) => {
        holdings.forEach(async (holding) => {
          holding.Current = 0;
          await holding.save();
        });
      });
    }
  });
}

async function pendingOrderCheck() {
  let now = moment.utc();
  console.log(
    "Checking for pending orders prior to: " +
      moment.utc(now, "YYYY-MM-DD HH:mm:ss").format()
  );
  getAllPendingOrders()
    .then((pendingOrders) => {
      pendingOrders.forEach(async (elem) => {
        let orderTotal = elem.OrderTotal;
        let investorID = elem.InvestorID;
        let hasExecuted = await investorBuy(investorID, orderTotal);
        if (hasExecuted) {
          elem.Status = "EXECUTED";
          await Holding.create({
            InvestorID: elem.InvestorID,
            ListingID: elem.ListingID,
            OrderID: elem.OrderID,
            Current: true,
          });
          console.log(
            "Order executed with price and listing code: " +
              elem.OrderTotal +
              " " +
              elem.ListingID
          );
          await elem.save();
        } else {
          elem.Status = "CANCELLED";
          console.log(
            "Order cancelled with price and listing code: " +
              elem.OrderTotal +
              " " +
              elem.ListingID
          );
          await elem.save();
        }
      });
    })
    .then(() => {
      console.log("Done checking for pending orders");
    });
}

module.exports = {
  getOrdersByInvestor,
  createOrder,
  getAllPendingOrders,
  getAllPendingOrdersByInvestor,
  pendingOrderCheck,
};
