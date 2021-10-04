const { Holding, Order } = require("../db/Models");

//Get all holdings function
async function getAllHoldings() {
  return await Holding.findAll();
}

//Finds current holdings which are orders that have been executed and current is 1
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

//Create holding function
async function createHolding(investorID, listingID, orderID, current) {
  return await Holding.create({
    InvestorID: investorID,
    ListingID: listingID,
    OrderID: orderID,
    Current: current,
  });
}

module.exports = {
  getAllHoldings,
  getAllCurrentHoldingsByInvestor,
  createHolding,
};
