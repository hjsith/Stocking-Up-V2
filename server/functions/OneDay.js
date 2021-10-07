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
