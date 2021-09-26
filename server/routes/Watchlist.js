const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  createWatchlist,
  getWatchlistByInvestor,
  deleteWatchlist,
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

//used the same route to post is that right?
router.post("/watchlist", async (req, res) => {
  const watchlist = await deleteWatchlist(
    req.body.investorID,
    req.body.listingID
  );

  return res.status(StatusCodes.CREATED).json(watchlist);
});

module.exports = router;
