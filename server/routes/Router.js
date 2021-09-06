const { Router } = require("express");
const ListingRouter = require("./Listing");
const PriceRouter = require("./Price");

const router = Router();

// Add sub-routes
router.use(PriceRouter);
router.use(ListingRouter);

module.exports = router;
