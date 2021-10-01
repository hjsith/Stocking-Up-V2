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

module.exports = {
  getAllHoldings,
  getAllExecutedOrdersByInvestor,
};
