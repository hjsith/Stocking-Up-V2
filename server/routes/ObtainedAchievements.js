const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllObtainedAchievements } = require("../functions/ObtainedAchievements");

// Init shared
const router = Router();

router.get("/obtainedachievements", async (req, res) => {
  const obtainedachievements = await getAllObtainedAchievements();

  return res.status(StatusCodes.OK).json(obtainedachievements);
});

module.exports = router;