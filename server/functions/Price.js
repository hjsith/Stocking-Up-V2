import { Price } from "../db/Models.js";

export async function getAllCurrentPrices() {
  return await Price.findAll();
}

export async function getPriceForListing(code) {
  return await Price.findOne({
    where: {
      ListingID: code,
    },
  });
}

export async function createPrice(code, currentPrice) {
  return await Price.create({
    ListingID: code,
    CurrentPrice: currentPrice,
  });
}
