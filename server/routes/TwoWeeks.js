import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllTwoWeeksPrices,
  getTwoWeeksPricesForListing,
  getTwoWeeksGraphData,
} from "../functions/TwoWeeks.js";

// Init shared
const router = Router();

router.get("/twoweeks/all", async (req, res) => {
  const prices = await getAllTwoWeeksPrices();

  return res.status(StatusCodes.OK).json(prices);
});

router.get("/twoweeks", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const prices = await getTwoWeeksPricesForListing(data.code);

  return res.status(StatusCodes.OK).json(prices);
});

router.get("/twoweeks/graph", async (req, res) => {
  var code = req.query.id;

  const prices = await getTwoWeeksGraphData(code);

  return res.status(StatusCodes.OK).json(prices);
});

export default router;
