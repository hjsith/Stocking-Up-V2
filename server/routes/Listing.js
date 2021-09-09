const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllListings } = require("../daos/Listing");

// Init shared
const router = Router();

router.get("/listings", async (req, res) => {
  const listings = await getAllListings();

  return res.status(StatusCodes.OK).json(listings);
});

module.exports = router;
