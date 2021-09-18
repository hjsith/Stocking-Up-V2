const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllThreads } = require("../functions/Threads");

// Init shared
const router = Router();

router.get("/threads", async (req, res) => {
  const threads = await getAllThreads();

  return res.status(StatusCodes.OK).json(threads);
});

module.exports = router;
