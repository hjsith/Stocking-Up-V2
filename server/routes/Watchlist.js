const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  createWatchlist,
  getWatchlistByInvestor,
} = require("../functions/Watchlist");

// Init shared
const router = Router();

router.get("/watchlist", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  let data = req.body;
  const watchlist = await getWatchlistByInvestor(data.investorID);

  return res.status(StatusCodes.OK).json(watchlist);
});

router.post("/watchlist", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  let data = req.body;
  const watchlist = await createWatchlist(data.investorID, data.listingID);

  return res.status(StatusCodes.CREATED).json(watchlist);
});

module.exports = router;
