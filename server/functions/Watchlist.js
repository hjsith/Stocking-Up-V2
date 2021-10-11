import { Watchlist } from "../db/Models.js";

//Get all watchlist function
export async function getAllWatchlist() {
  return await Watchlist.findAll();
}

//Get all watchlist by investor
export async function getWatchlistByInvestor(investorID) {
  return await Watchlist.findAll({
    where: {
      InvestorID: investorID,
    },
  });
}

//Create watchlist with investor and listing
export async function createWatchlist(investorID, listingID) {
  return await Watchlist.create({
    InvestorID: investorID,
    ListingID: listingID,
  });
}

//Function to check if Watchlist already exsists
export async function checkIfWatchlistExists(investorID, listingID) {
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
export async function deleteWatchlist(ID) {
  return await Watchlist.destroy({ where: { id: ID } });
}
