const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllCurrentHoldingsByInvestor } = require("../functions/Holding");

// Init shared
const router = Router();

router.get("/holdings", async (req, res) => {
  // const holdings = await getAllExecutedOrdersByInvestor(req.query.investorID);
  const holdings = await getAllCurrentHoldingsByInvestor(req.query.investorID);

  return res.status(StatusCodes.OK).json(holdings);
});

// post the Holdings an investor has to the api
router.post("/holdings", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  let data = req.body;
  const holding = await createHolding(
    data.investorID,
    data.listingID,
    data.orderID,
    data.current
  );

  return res.status(StatusCodes.CREATED).json(holding);
});

module.exports = router;
