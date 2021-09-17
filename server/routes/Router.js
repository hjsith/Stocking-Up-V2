const express = require("express");
const ListingRouter = require("./Listing");
const PriceRouter = require("./Price");
const InvestorRouter = require("./Investor");
const SignUpRouter = require("./SignUp");
const HoldingRouter = require("./Holding");
const WatchlistRouter = require("./Watchlist");
const OrderRouter = require("./Order");
const ArticleRouter = require("./Article");

const router = express.Router();

// Add sub-routes
router.use(PriceRouter);
router.use(ListingRouter);
router.use(InvestorRouter);
router.use(SignUpRouter);
router.use(HoldingRouter);
router.use(WatchlistRouter);
router.use(OrderRouter);
router.use(ArticleRouter);

module.exports = router;
