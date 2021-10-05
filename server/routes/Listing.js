const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllListings, getListing } = require("../functions/Listing");
const { getAuthenticatedUser } = require("../functions/Authenticate");

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
  const listing = await getListing(req.query.code);

  return res.status(StatusCodes.OK).json({ name: listing.ListingName });
});

router.get("/listing/industry", async (req, res) => {
  const listing = await getListing(req.query.code);

  return res.status(StatusCodes.OK).json({ name: listing.ListingIndustry });
});

router.get("/listing/priceHigh", async (req, res) => {
  const listing = await getListing(req.query.code);

  return res.status(StatusCodes.OK).json({ highPrice: listing.YearHighPrice });
});

router.get("/listing/priceLow", async (req, res) => {
  const listing = await getListing(req.query.code);

  return res.status(StatusCodes.OK).json({ lowPrice: listing.YearLowPrice });
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

module.exports = router;
