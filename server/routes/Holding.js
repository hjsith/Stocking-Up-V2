import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllCurrentHoldingsByInvestor,
  createHolding,
} from "../functions/Holding.js";
import { getAuthenticatedUser } from "../functions/Authenticate.js";
import { getOrderByOrderID } from "../functions/Order.js";
import { getPriceForListing } from "../functions/Price.js";

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

//Calculate holdings profit
router.get("/holdingsprofit", async (req, res) => {
  const holdingsprofit = await getAllCurrentHoldingsByInvestor(req.query.id);
  let sum = 0;
  for (let i = 0; i < holdingsprofit.length; i++) {
    let order = await getOrderByOrderID(holdingsprofit[i].OrderID);
    let priceBought = order.ListingPrice;
    let quantity = order.QuantityOrder;
    let currentPrice = await getPriceForListing(order.ListingID);
    let profit = priceBought * quantity - currentPrice.CurrentPrice * quantity;
    sum += profit;
  }
  return res.status(StatusCodes.OK).json({ profit: sum });
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

export default router;
