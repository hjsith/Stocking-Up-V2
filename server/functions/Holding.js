const { Holding, Order } = require("../db/Models");

async function getAllHoldings() {
  return await Holding.findAll();
}

//Finds orders which have been executed
async function getAllExecutedOrdersByInvestor(investorID) {
  return await Order.findAll({
    where: {
      Status: "EXECUTED",
      InvestorID: investorID,
    },
  });
}

//Get all Sold orders
async function getAllSoldOrdersbyInvestor(investorID) {
  return await Order.findAll({
    where: {
      TypeOfOrder: "SELL",
      InvestorID: investorID,
    },
  });
}

module.exports = {
  getAllHoldings,
  getAllExecutedOrdersByInvestor,
  getAllSoldOrdersbyInvestor,
};
