import { FiveDays } from "../db/Models.js";

export async function getAllFiveDaysPrices() {
  return await FiveDays.findAll();
}

export async function getFiveDaysPricesForListing(code) {
  return await FiveDays.findAll({
    where: {
      ListingID: code,
    },
  });
}

export async function getFiveDaysGraphData(code) {
  const prices = await FiveDays.findAll({
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
