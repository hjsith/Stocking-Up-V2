export async function addToWatchlist(investorID, listingID) {
  let results = await fetch("/api/watchlist", {
    method: "POST",
    body: JSON.stringify({
      investorID: investorID,
      listingID: listingID,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return results;
}

export async function getWatchlistByInvestor(investorID) {
  let results = await fetch("/api/watchlist" + "?investorID=" + investorID, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return results;
}
