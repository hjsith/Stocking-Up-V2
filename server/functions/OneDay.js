const { OneDay } = require("../db/Models");

async function getAllOneDayPrices() {
  return await OneDay.findAll();
}

async function getOneDayPricesForListing(code) {
  return await OneDay.findAll({
    where: {
      ListingID: code,
    },
  });
}

module.exports = { getAllOneDayPrices, getOneDayPricesForListing };
