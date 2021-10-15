const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllCurrentFriends } = require("../functions/Friends");

// Init shared
const router = Router();

router.get("/friends", async (req, res) => {
  const friends = await getAllCurrentFriends();

  return res.status(StatusCodes.OK).json(friends);
});

module.exports = router;