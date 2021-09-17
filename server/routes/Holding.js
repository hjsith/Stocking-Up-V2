const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllHoldings } = require("../functions/Holding");

// Init shared
const router = Router();

router.get("/holdings", async (req, res) => {
  const holdings = await getAllHoldings();

  return res.status(StatusCodes.OK).json(holdings);
});

module.exports = router;
