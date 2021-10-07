const { Price } = require("../db/Models");

async function getAllCurrentPrices() {
  return await Price.findAll();
}

async function getPriceForListing(code) {
  return await Price.findOne({
    where: {
      ListingID: code,
    },
  });
}

async function createPrice(code, currentPrice) {
  return await Price.create({
    ListingID: code,
    CurrentPrice: currentPrice,
  });
}

module.exports = { getAllCurrentPrices, getPriceForListing, createPrice };
