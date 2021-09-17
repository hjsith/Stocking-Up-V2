const express = require("express");
const ListingRouter = require("./Listing");
const PriceRouter = require("./Price");
const InvestorRouter = require("./Investor");
const SignUpRouter = require("./SignUp");
const AuthenticationTokensRouter = require("./AuthenticationTokens");
const HoldingRouter = require("./Holding");
const WatchlistRouter = require("./Watchlist");
const OrderRouter = require("./Order");
const ArticleRouter = require("./Article");
const AchievementsRouter = require("./Achievements");
const ObtainedAchievementsRouter = require("./ObtainedAchievements");
const FriendsRouter = require("./Friends");
const ThreadsRouter = require("./Threads");
const CommentsRouter = require("./Comments");

const router = express.Router();

// Add sub-routes
router.use(PriceRouter);
router.use(ListingRouter);
router.use(InvestorRouter);
router.use(SignUpRouter);
router.use(AuthenticationTokensRouter);
router.use(HoldingRouter);
router.use(WatchlistRouter);
router.use(OrderRouter);
router.use(ArticleRouter);
router.use(AchievementsRouter);
router.use(ObtainedAchievementsRouter);
router.use(FriendsRouter);
router.use(ThreadsRouter);
router.use(CommentsRouter);

module.exports = router;
