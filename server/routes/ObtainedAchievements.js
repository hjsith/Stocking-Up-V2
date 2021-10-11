import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllObtainedAchievements } from "../functions/ObtainedAchievements.js";

// Init shared
const router = Router();

router.get("/obtainedachievements", async (req, res) => {
  const obtainedachievements = await getAllObtainedAchievements();

  return res.status(StatusCodes.OK).json(obtainedachievements);
});

export default router;
