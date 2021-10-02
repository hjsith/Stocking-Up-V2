const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getAllThreads,
  createThread,
  // findThreadsWithName,
  createMissingThreads,
} = require("../functions/Threads");
const { getAllListings } = require("../functions/Listing");
const { getAuthenticatedUser } = require("../functions/Authenticate");

// Init shared
const router = Router();

router.get("/threads", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const threads = await getAllThreads();
    return res.status(StatusCodes.OK).json(threads);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.post("/newThread", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const newThread = await createThread(
    data.ThreadID,
    data.ListingID,
    data.Title,
    data.Description
  );

  return res.status(StatusCodes.CREATED).json(newThread);
});

// router.get("/thread", async (req, res) => {
//   const threads = await findThreadsWithName(req.query.search);
//   if (threads === null) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ errors: "Thread could not be found." });
//   }
//   return res.status(StatusCodes.OK).json(threads);
// });

// router.get("/CreateAllThreads", async (req, res) => {
//   const listings = await getAllListings();
//   await createMissingThreads(listings);
//   return res.status(StatusCodes.OK).send();
// });

module.exports = router;
