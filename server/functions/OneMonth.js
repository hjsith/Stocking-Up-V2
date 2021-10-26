import { OneMonth } from "../db/Models.js";

export async function getAllOneMonthPrices() {
  return await OneMonth.findAll();
}

export async function getOneMonthPricesForListing(code) {
  return await OneMonth.findAll({
    where: {
      ListingID: code,
    },
  });
}

export async function getOneMonthGraphData(code) {
  const prices = await OneMonth.findAll({
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
