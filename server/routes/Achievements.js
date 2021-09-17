const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllCurrentAchievements } = require("../daos/Achievements");

// Init shared
const achievements = Router();

router.get("/achievements", async (req, res) => {
  const price = await getAllCurrentAchievements();

  return res.status(StatusCodes.OK).json(achievements);
});

module.exports = router;