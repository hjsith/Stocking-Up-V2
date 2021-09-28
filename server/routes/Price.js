const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getPriceForListing } = require("../functions/Price");

// Init shared
const router = Router();

router.get("/price", async (req, res) => {
  const price = await getPriceForListing(req.query.code);

  return res.status(StatusCodes.OK).json({ price: price.CurrentPrice });
});

module.exports = router;
