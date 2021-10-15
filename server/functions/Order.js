import { Order, Price, Holding } from "../db/Models.js";
import { investorSell, investorBuy } from "./Investor.js";
import pkg from "sequelize";
const { Op } = pkg;
import moment from "moment";

// this section of the code retrieves all the orders that an investor may have. This is used for the Portfolio feature.
export async function getOrdersByInvestor(investorID) {
  return await Order.findAll({
    where: {
      InvestorID: investorID,
    },
  });
}

export async function getAllOrdersByInvestor(investorID) {
  return await Order.findAll({
    where: {
      InvestorID: investorID,
    },
  });
}

// this section of the code retrieves all the orders that have a Status of "PENDING".
export async function getAllPendingOrders() {
  return await Order.findAll({
    where: {
      Status: "PENDING",
      ExecutionTime: {
        [Op.lt]: moment.utc(),
      },
    },
  });
}

// this section of the code retrieves all the orders that have a Status of "PENDING".
export async function getAllPendingOrdersByInvestor(investorID) {
  return await Order.findAll({
    where: {
      Status: "PENDING",
      InvestorID: investorID,
    },
  });
}

// this section of the code creates an order, if a user clicks buy or sell in the QuoteManagement.js page.
export async function createOrder(
  investorID,
  quantityOrder,
  orderTime,
  typeOfOrder,
  listingID,
  executionTime
  // to create an order, the current price for the listing is retrieved in the below section of the code.
) {
  let currentPriceObject = await Price.findOne({
    where: {
      ListingID: listingID,
    },
  });

  // the order total is calculated through the current share price and the quantity inputted by the user in the front end
  let orderTotal = currentPriceObject.CurrentPrice * parseInt(quantityOrder);

  // if a user wants to Sell a share in the front end, it will check if a user currently has shares in their holdings to be able to share in the sellOrder() section further below in the code.
  if (typeOfOrder == "SELL") {
    let canSell = false;
    (async () => {
      // if a user does have a share for that listing in their holdings, then it retrieves the order information
      canSell = await sellOrder(
        investorID,
        quantityOrder,
        orderTotal,
        listingID,
        orderTime
      );
    })();
    // an error is presented if a user does not have shares in their holdings for the listing

    if (!canSell) {
      return "Error";
    }
  }

  // in this section of the code an order is then created through retrieving the order information. The status of an order is PENDING if it is a BUY order due to the 15minute timer on all buy orders, otherwise the status is EXECUTED
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

// this section of the code checks if a user holds shares in their holdings in order to ensure they are able to sell shares if it is in their holdings.
export async function sellOrder(
  investorID,
  quantityOrder,
  orderTotal,
  listingID,
  orderTime
) {
  //the current holdings that an investor has is retrieved
  const currentHoldings = await Holding.findAll({
    where: {
      InvestorID: investorID,
      Current: 1,
    },
  });
  //the current price for a listing is retrieved

  let currentPriceObject = await Price.findOne({
    where: {
      ListingID: listingID,
    },
  });
  let orders = [];
  let orderIDs = [];
  // this section finds an order for a listing and adds it into the order array created above
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
  // this section chekcs the quantity for each order based on each listing for the investor to group how many shares the investor has for the listing
  let totalQuantity = 0;

  values.then(async () => {
    orders.forEach((order) => {
      totalQuantity += order.QuantityOrder;
    });
    // the sell is performed only if the quantity that the investor wants to sell is less than their current quantity. After the sell, a new holding is created based on the updated holdings and the orders are updated to reflect the sell
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
      // this section of the code retrives all the orders from the orderIDs array from above and sets it to 0 to indicate that it is not a current holding anymore
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
// this section of the code checks for pending orders and shows in the console if an order is executed after 15min or if a user cancelled the order in their portfolio within the 15 min. If an order is executed, the user's funds are updated and the status of the order is 'EXECUTED'
export async function pendingOrderCheck() {
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

export async function cancelOrder(orderID) {
  let order = await Order.findOne({ where: { OrderID: orderID } });
  order.Status = "CANCELLED";
  await order.save();
  return true;
}

export async function confirmOrder(orderID) {
  let order = await Order.findOne({ where: { OrderID: orderID } });
  order.ExecutionTime = moment.utc();
  await order.save();
  return true;
}
