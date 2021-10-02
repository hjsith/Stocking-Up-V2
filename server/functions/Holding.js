const { Holding, Order } = require("../db/Models");

async function getAllHoldings() {
  return await Holding.findAll();
}

//Finds orders which have been executed
async function getAllCurrentHoldingsByInvestor(investorID) {
  const currentHoldings = await Holding.findAll({
    where: {
      InvestorID: investorID,
      Current: 1,
    },
  });

  let temp = [];

  for (let i = 0; i < currentHoldings.length; ++i) {
    await Order.findOne({
      where: {
        OrderID: currentHoldings[i].OrderID,
      },
    }).then((order) => {
      if (order != null) {
        temp.push(order);
      }
    });
  }

  return temp;
}

module.exports = {
  getAllHoldings,
  getAllCurrentHoldingsByInvestor,
};
