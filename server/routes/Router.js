import express from "express";
import ListingRouter from "./Listing.js";
import PriceRouter from "./Price.js";
import OneDayRouter from "./OneDay.js";
import FiveDaysRouter from "./FiveDays.js";
import TwoWeeksRouter from "./TwoWeeks.js";
import OneMonthRouter from "./OneMonth.js";
import InvestorRouter from "./Investor.js";
import SignUpRouter from "./SignUp.js";
import AuthenticationTokensRouter from "./AuthenticationTokens.js";
import HoldingRouter from "./Holding.js";
import WatchlistRouter from "./Watchlist.js";
import OrderRouter from "./Order.js";
import ArticleRouter from "./Articles.js";
import AchievementsRouter from "./Achievements.js";
import ObtainedAchievementsRouter from "./ObtainedAchievements.js";
import FriendsRouter from "./Friends.js";
import ThreadsRouter from "./Threads.js";
import CommentsRouter from "./Comments.js";
import SignInRouter from "./SignIn.js";

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
router.use(OneDayRouter);
router.use(FiveDaysRouter);
router.use(TwoWeeksRouter);
router.use(OneMonthRouter);
router.use(SignInRouter);

export default router;
