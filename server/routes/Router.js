const express = require("express");
const ListingRouter = require("./Listing");
const PriceRouter = require("./Price");
const InvestorRouter = require("./Investor");
const SignUpRouter = require("./SignUp");
const OrderRouter = require("./Order");
const ArticleRouter = require("./Article");
const AchievementsRouter = require("./Achievements");
const ObtainedAchievementsRouter = require("./ObtainedAchievements");
const FriendsRouter = require("./Friends");
const router = express.Router();

// Add sub-routes
router.use(PriceRouter);
router.use(ListingRouter);
router.use(InvestorRouter);
router.use(SignUpRouter);
router.use(OrderRouter);
router.use(ArticleRouter);
router.use(AchievementsRouter);
router.use(ObtainedAchievementsRouter);
router.use(FriendsRouter);

module.exports = router;
