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
