const express = require("express");
const ListingRouter = require("./Listing");
const PriceRouter = require("./Price");

const router = express.Router();

// Add sub-routes
router.use(PriceRouter);
router.use(ListingRouter);

module.exports = router;
