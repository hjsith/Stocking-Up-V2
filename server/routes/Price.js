const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllCurrentPrices } = require("../daos/Price");

// Init shared
const router = Router();

router.get("/prices", async (req, res) => {
  const price = await getAllCurrentPrices();

  return res.status(StatusCodes.OK).json(price);
});

module.exports = router;
