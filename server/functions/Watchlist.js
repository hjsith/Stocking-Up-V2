const { Watchlist } = require("../db/Models");

//Get all watchlist function
async function getAllWatchlist() {
  return await Watchlist.findAll();
}

//Get all watchlist by investor
async function getWatchlistByInvestor(investorID) {
  return await Watchlist.findAll({
    where: {
      InvestorID: investorID,
    },
  });
}

//Create watchlist with investor and listing
async function createWatchlist(investorID, listingID) {
  return await Watchlist.create({
    InvestorID: investorID,
    ListingID: listingID,
  });
}

//Function to check if Watchlist already exsists
async function checkIfWatchlistExists(investorID, listingID) {
  let watchlistExist = await Watchlist.findOne({
    where: {
      InvestorID: investorID,
      ListingID: listingID,
    },
  });

  if (watchlistExist) {
    return true;
  }
  return false;
}

//Function to delete watchlist
async function deleteWatchlist(ID) {
  return await Watchlist.destroy({ where: { id: ID } });
}

module.exports = {
  getAllWatchlist,
  createWatchlist,
  getWatchlistByInvestor,
  deleteWatchlist,
  checkIfWatchlistExists,
};
