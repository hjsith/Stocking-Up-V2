const { Listing } = require("../db/Models");

async function getAllListings() {
  return await Listing.findAll();
}

module.exports = { getAllListings };
