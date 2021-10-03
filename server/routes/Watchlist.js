const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  createWatchlist,
  getWatchlistByInvestor,
  deleteWatchlist,
  checkIfWatchlistExists,
} = require("../functions/Watchlist");
const { getAuthenticatedUser } = require("../functions/Authenticate");

// Init shared
const router = Router();

//Route to get watchlist for each investor via investorID and returns the watchlist in json
router.get("/watchlist", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const watchlist = await getWatchlistByInvestor(req.query.investorID);
    return res.status(StatusCodes.OK).json(watchlist);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

//Route to post or create a watchlist by first checking if already exsists and if not creating it for the investor
router.post("/watchlist", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
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
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

//Route to delete a watchlist from an investor's list
router.delete("/watchlistremoved", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("The request doesn't have the correct body format.");
    }
    let data = req.body;
    const removedwatchlist = await deleteWatchlist(data.ID);

    return res.status(StatusCodes.OK).end();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

module.exports = router;
