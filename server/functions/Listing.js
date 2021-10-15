const { Listing } = require("../db/Models");

async function getAllListings() {
  return await Listing.findAll();
}

async function getListing(code) {
  return await Listing.findByPk(code);
}

module.exports = { getAllListings, getListing };
