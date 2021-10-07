import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllCurrentAchievements } from "../functions/Achievements.js";

// Init shared
const router = Router();

router.get("/achievements", async (req, res) => {
  const achievements = await getAllCurrentAchievements();

  return res.status(StatusCodes.OK).json(achievements);
});

export default router;
