import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllObtainedAchievementsForUser,
  createObtainedAchievement,
} from "../functions/ObtainedAchievements.js";
import { getAuthenticatedUser } from "../functions/Authenticate.js";

// Init shared
const router = Router();

router.get("/ObtainedAchievements", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const obtainedachievements = await getAllObtainedAchievementsForUser(
      req.query.id
    );
    return res.status(StatusCodes.OK).json(obtainedachievements);
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.post("/ObtainedAchievements/new", async (req, res) => {
  // const checkAuth = await getAuthenticatedUser(req, res);
  // if (checkAuth) {
  //Check if the request body is empty
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const newObtainedAchievement = await createObtainedAchievement(
    data.InvestorID,
    data.AchievementID
  );

  return res.status(StatusCodes.OK).json(newObtainedAchievement);
  // } else {
  //   return res.status(StatusCodes.UNAUTHORIZED).end();
  // }
});

export default router;
