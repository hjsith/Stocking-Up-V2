const { Holding } = require("../db/Models");

async function getAllHoldings() {
  return await Holding.findAll();
}

module.exports = {
  getAllHoldings,
};
