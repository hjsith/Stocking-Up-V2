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
