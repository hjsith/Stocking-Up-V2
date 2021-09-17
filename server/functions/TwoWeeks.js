const { TwoWeeks } = require("../db/Models");

async function getAllTwoWeeksPrices() {
  return await TwoWeeks.findAll();
}

async function getTwoWeeksPricesForListing(code) {
  return await TwoWeeks.findAll({
    where: {
      ListingID: code,
    },
  });
}

module.exports = {
  getAllTwoWeeksPrices,
  getTwoWeeksPricesForListing,
};
