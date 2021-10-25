import { Holding, Order } from "../db/Models.js";

//Get all holdings function
export async function getAllHoldings() {
  return await Holding.findAll();
}

//Finds current holdings which are orders that have been executed and current is 1
export async function getAllCurrentHoldingsByInvestor(investorID) {
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
export async function createHolding(investorID, listingID, orderID, current) {
  return await Holding.create({
    InvestorID: investorID,
    ListingID: listingID,
    OrderID: orderID,
    Current: current,
  });
}
