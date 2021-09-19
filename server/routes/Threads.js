const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getAllThreads,
  createThread,
  findThreadsWithName,
  createMissingThreads,
} = require("../functions/Threads");
const { getAllListings } = require("../functions/Listing");

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

// router.get("/CreateAllThreads", async (req, res) => {
//   const listings = await getAllListings();
//   await createMissingThreads(listings);
//   return res.status(StatusCodes.OK).send();
// });

module.exports = router;
