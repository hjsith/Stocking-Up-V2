import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllListings,
  getListing,
  getTop200,
  getop5Gains,
  getop5Declines
} from "../functions/Listing.js";
import { getAuthenticatedUser } from "../functions/Authenticate.js";

// Init shared
const router = Router();

router.get("/listings", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const listings = await getAllListings();
    return res.status(StatusCodes.OK).json(listings);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/listing", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const listing = await getListing(req.query.code);
    return res.status(StatusCodes.OK).json({ name: listing.ListingName });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/listing/industry", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const listing = await getListing(req.query.code);
    return res.status(StatusCodes.OK).json({ name: listing.ListingIndustry });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/listing/priceHigh", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const listing = await getListing(req.query.code);
    return res
      .status(StatusCodes.OK)
      .json({ highPrice: listing.YearHighPrice });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/listing/priceLow", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const listing = await getListing(req.query.code);
    return res.status(StatusCodes.OK).json({ lowPrice: listing.YearLowPrice });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/listing/volumeShares", async (req, res) => {
  const listing = await getListing(req.query.code);

  return res
    .status(StatusCodes.OK)
    .json({ volumeShares: listing.VolumeShares });
});

router.get("/listing/priceClose", async (req, res) => {
  const listing = await getListing(req.query.code);

  return res
    .status(StatusCodes.OK)
    .json({ closingPrice: listing.ClosingPrice });
});

router.get("/listing/Top200", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const top200 = await getTop200();
    return res.status(StatusCodes.OK).json(top200); // response
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/listing/Top5Gains", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const top200 = await getop5Gains();
    return res.status(StatusCodes.OK).json(top200); // response
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});
router.get("/listing/Top5Declines", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const top200 = await getop5Declines();
    return res.status(StatusCodes.OK).json(top200); // response
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

export default router;
