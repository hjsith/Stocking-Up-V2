const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllListings, getListing } = require("../functions/Listing");

// Init shared
const router = Router();

router.get("/listings", async (req, res) => {
  const listings = await getAllListings();

  return res.status(StatusCodes.OK).json(listings);
});

router.get("/listing", async (req, res) => {
  const listing = await getListing(req.query.code);

  return res.status(StatusCodes.OK).json({ name: listing.ListingName });
});

module.exports = router;
