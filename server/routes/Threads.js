const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getAllThreads,
  createThread,
  findThreadsWithName,
} = require("../functions/Threads");

// Init shared
const router = Router();

router.get("/threads", async (req, res) => {
  const threads = await getAllThreads();
  return res.status(StatusCodes.OK).json(threads);
});

router.post("/newThread", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const newThread = await createThread(
    data.ListingID,
    data.Title,
    data.Description
  );

  return res.status(StatusCodes.CREATED).json(newThread);
});

router.get("/thread", async (req, res) => {
  const threads = await findThreadsWithName(req.query.search);
  if (threads === null) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: "Thread could not be found." });
  }
  return res.status(StatusCodes.OK).json(threads);
});

module.exports = router;
