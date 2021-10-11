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
