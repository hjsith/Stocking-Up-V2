const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  createWatchlist,
  getWatchlistByInvestor,
  deleteWatchlist,
  checkIfWatchlistExists,
} = require("../functions/Watchlist");

// Init shared
const router = Router();

router.get("/watchlist", async (req, res) => {
  const watchlist = await getWatchlistByInvestor(req.query.investorID);

  return res.status(StatusCodes.OK).json(watchlist);
});

router.post("/watchlist", async (req, res) => {
  let watchlistCheck = await checkIfWatchlistExists(
    req.body.investorID,
    req.body.listingID
  );

  if (watchlistCheck == false) {
    const watchlist = await createWatchlist(
      req.body.investorID,
      req.body.listingID
    );

    return res.status(StatusCodes.CREATED).json(watchlist);
  } else {
    return res.status(StatusCodes.CONFLICT).end();
  }
});

router.delete("/watchlistremoved", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  let data = req.body;
  const removedwatchlist = await deleteWatchlist(
    data.ID
    // data.listingID,
    // data.investorID
  );

  return res.status(StatusCodes.OK).end();
});

module.exports = router;
