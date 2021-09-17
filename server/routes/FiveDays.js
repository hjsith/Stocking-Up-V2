const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getAllFiveDaysPrices,
  getFiveDaysPricesForListing,
} = require("../daos/FiveDays");

// Init shared
const router = Router();

router.get("/fivedays/all", async (req, res) => {
  const prices = await getAllFiveDaysPrices();

  return res.status(StatusCodes.OK).json(prices);
});

router.get("/fivedays", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const prices = await getFiveDaysPricesForListing(data.code);

  return res.status(StatusCodes.OK).json(prices);
});

module.exports = router;
