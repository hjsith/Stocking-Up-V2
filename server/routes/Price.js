import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getPriceForListing } from "../functions/Price.js";

// Init shared
const router = Router();

router.get("/price", async (req, res) => {
  const price = await getPriceForListing(req.query.code);

  return res.status(StatusCodes.OK).json({ price: price.CurrentPrice });
});

export default router;
