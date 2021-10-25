import { OneDay } from "../db/Models.js";

export async function getAllOneDayPrices() {
  return await OneDay.findAll();
}

export async function getOneDayPricesForListing(code) {
  return await OneDay.findAll({
    where: {
      ListingID: code,
    },
  });
}

export async function getOneDayGraphData(code) {
  const prices = await OneDay.findAll({
    where: {
      ListingID: code,
    },
  });

  var newData = [
    {
      id: code,
      data: [],
    },
  ];

  for (let i = 0; i < prices.length; ++i) {
    newData[0].data.push({
      x: prices[i].DateTimeOfPrice,
      y: prices[i].PastPrice,
    });
  }

  return newData;
}
