const { Order, Price } = require("../db/Models");

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

module.exports = {
  getOrdersByInvestor,
  createOrder,
  getAllPendingOrders,
  getAllPendingOrdersByInvestor,
};
