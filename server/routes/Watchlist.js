const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllWatchlist } = require("../daos/Watchlist");

// Init shared
const router = Router();

router.get("/watchlist", async (req, res) => {
  const watchlist = await getAllWatchlist();

  return res.status(StatusCodes.OK).json(watchlist);
});

module.exports = router;
