import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllOneMonthPrices,
  getOneMonthPricesForListing,
} from "../functions/OneMonth.js";

// Init shared
const router = Router();

router.get("/onemonth/all", async (req, res) => {
  const prices = await getAllOneMonthPrices();

  return res.status(StatusCodes.OK).json(prices);
});

router.get("/onemonth", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const prices = await getOneMonthPricesForListing(data.code);

  return res.status(StatusCodes.OK).json(prices);
});

export default router;
