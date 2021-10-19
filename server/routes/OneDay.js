import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllOneDayPrices,
  getOneDayPricesForListing,
  getOneDayGraphData,
} from "../functions/OneDay.js";

// Init shared
const router = Router();

router.get("/oneday/all", async (req, res) => {
  const prices = await getAllOneDayPrices();

  return res.status(StatusCodes.OK).json(prices);
});

router.get("/oneday", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const prices = await getOneDayPricesForListing(data.code);

  return res.status(StatusCodes.OK).json(prices);
});

router.get("/oneday/graph", async (req, res) => {
  var code = req.query.id;

  const prices = await getOneDayGraphData(code);

  return res.status(StatusCodes.OK).json(prices);
});

export default router;
