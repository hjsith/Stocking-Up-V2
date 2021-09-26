const { Watchlist } = require("../db/Models");

async function getAllWatchlist() {
  return await Watchlist.findAll();
}

async function getWatchlistByInvestor(investorID) {
  return await Watchlist.findAll({
    where: {
      InvestorID: investorID,
    },
  });
}

async function createWatchlist(investorID, listingID) {
  return await Watchlist.create({
    InvestorID: investorID,
    ListingID: listingID,
  });
}

//used destroy to remove Watchlist check if correct

async function deleteWatchlist(investorID, listingID) {
  return await Watchlist.destroy({
    InvestorID: investorID,
    ListingID: listingID,
  });
}

module.exports = {
  getAllWatchlist,
  createWatchlist,
  getWatchlistByInvestor,
  deleteWatchlist,
};
