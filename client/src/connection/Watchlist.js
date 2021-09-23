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
