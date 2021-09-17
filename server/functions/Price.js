const { Price } = require("../db/Models");

async function getAllCurrentPrices() {
  return await Price.findAll();
}

module.exports = { getAllCurrentPrices };
