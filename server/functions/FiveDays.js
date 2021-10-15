const { FiveDays } = require("../db/Models");

async function getAllFiveDaysPrices() {
  return await FiveDays.findAll();
}

async function getFiveDaysPricesForListing(code) {
  return await FiveDays.findAll({
    where: {
      ListingID: code,
    },
  });
}

module.exports = {
  getAllFiveDaysPrices,
  getFiveDaysPricesForListing,
};
