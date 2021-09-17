const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllObtainedAchievements } = require("../daos/ObtainedAchievements");

// Init shared
const obtainedachievements = Router();

router.get("/obtainedachievements", async (req, res) => {
  const price = await getAllObtainedAchievements();

  return res.status(StatusCodes.OK).json(obtainedachievements);
});

module.exports = router;