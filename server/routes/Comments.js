const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllComments } = require("../functions/Comments");

// Init shared
const router = Router();

router.get("/comments", async (req, res) => {
  const comments = await getAllComments();

  return res.status(StatusCodes.OK).json(comments);
});

module.exports = router;
