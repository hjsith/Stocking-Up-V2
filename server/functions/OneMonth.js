const { OneMonth } = require("../db/Models");

async function getAllOneMonthPrices() {
  return await OneMonth.findAll();
}

async function getOneMonthPricesForListing(code) {
  return await OneMonth.findAll({
    where: {
      ListingID: code,
    },
  });
}

module.exports = {
  getAllOneMonthPrices,
  getOneMonthPricesForListing,
};
