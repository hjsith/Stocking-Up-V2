const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  createWatchlist,
  getWatchlistByInvestor,
} = require("../functions/Watchlist");

// Init shared
const router = Router();

router.get("/watchlist", async (req, res) => {
  const watchlist = await getWatchlistByInvestor(req.query.investorID);

  return res.status(StatusCodes.OK).json(watchlist);
});

router.post("/watchlist", async (req, res) => {
  const watchlist = await createWatchlist(
    req.query.investorID,
    req.query.listingID
  );

  return res.status(StatusCodes.CREATED).json(watchlist);
});

module.exports = router;
