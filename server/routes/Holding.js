const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getAllCurrentHoldingsByInvestor,
  createHolding,
} = require("../functions/Holding");
const { getAuthenticatedUser } = require("../functions/Authenticate");

// Init shared
const router = Router();

//Route to get holdings for each investor via investorID and returns the holdings in json
router.get("/holdings", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const holdings = await getAllCurrentHoldingsByInvestor(
      req.query.investorID
    );
    return res.status(StatusCodes.OK).json(holdings);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

//Route to post or create holdings for each investor
router.post("/holdings", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
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
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

module.exports = router;
