import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getPriceForListing } from "../functions/Price.js";
import { getAuthenticatedUser } from "../functions/Authenticate.js";

// Init shared
const router = Router();

router.get("/price", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const price = await getPriceForListing(req.query.code);

    return res.status(StatusCodes.OK).json({ price: price.CurrentPrice });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

export default router;
