import { TwoWeeks } from "../db/Models.js";

export async function getAllTwoWeeksPrices() {
  return await TwoWeeks.findAll();
}

export async function getTwoWeeksPricesForListing(code) {
  return await TwoWeeks.findAll({
    where: {
      ListingID: code,
    },
  });
}

export async function getTwoWeeksGraphData(code) {
  const prices = await TwoWeeks.findAll({
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
