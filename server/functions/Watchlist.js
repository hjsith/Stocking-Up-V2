const { Watchlist } = require("../db/Models");

async function getAllWatchlist() {
  return await Watchlist.findAll();
}

module.exports = {
  getAllWatchlist,
};
