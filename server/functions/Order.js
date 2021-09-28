const { Order, Price, Holding } = require("../db/Models");
const { updateInvestorBalanceAfterPurchase } = require("./Investor");
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

  let checkHolding = await Holding.findOne({
    where: {
      ListingID: listingID,
    },
  });

  if (typeOfOrder == "SELL" && checkHolding != null)
    await updateInvestorBalanceAfterPurchase(investorID, orderTotal);
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
        let hasExecuted = await updateInvestorBalanceAfterPurchase(
          investorID,
          -orderTotal
        );
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
