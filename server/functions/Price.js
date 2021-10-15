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

module.exports = { getAllCurrentPrices, getPriceForListing };
