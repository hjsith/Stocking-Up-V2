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
    req.body.investorID,
    req.body.listingID
  );

  return res.status(StatusCodes.CREATED).json(watchlist);
});

module.exports = router;
