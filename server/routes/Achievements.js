import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllCurrentAchievements,
  getAchievementbyID,
  createAchievement,
} from "../functions/Achievements.js";
import { getAuthenticatedUser } from "../functions/Authenticate.js";

// Init shared
const router = Router();

router.get("achievements/All", async (req, res) => {
  const achievements = await getAllCurrentAchievements();

  return res.status(StatusCodes.OK).json(achievements);
});

router.get("/achievement", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const achievement = await getAchievementbyID(req.query.id);
    return res.status(StatusCodes.OK).json(achievement);
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.post("/achievement/New", async (req, res) => {
  //Check if the request body is empty
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const newObtainedAchievement = await createAchievement(
    data.achievementTitle,
    data.achievementDescription,
    data.image
  );

  return res.status(StatusCodes.OK).json(newObtainedAchievement);
});

export default router;
