const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllCurrentAchievements } = require("../daos/Achievements");

// Init shared
const router = Router();

router.get("/achievements", async (req, res) => {
  const achievements = await getAllCurrentAchievements();

  return res.status(StatusCodes.OK).json(achievements);
});

module.exports = router;