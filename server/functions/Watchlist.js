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

//used destroy to remove Watchlist check if correct

// async function deleteWatchlist(investorID, listingID) {
//   return await Watchlist.destroy({
//     InvestorID: investorID,
//     ListingID: listingID,
//   });
// }

async function deleteWatchlist(ID) {
  return await Watchlist.destroy({ where: { id: ID } });
}

// let watchlistdeleted = await Watchlist.findOne({ where: { id: ID } });
// order.ExecutionTime = moment.utc();
// await order.save();
// return true;
// }

module.exports = {
  getAllWatchlist,
  createWatchlist,
  getWatchlistByInvestor,
  deleteWatchlist,
  checkIfWatchlistExists,
};
