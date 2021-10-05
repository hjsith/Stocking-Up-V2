const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getAllThreads,
  createThread,
  // findThreadsWithName,
  // createMissingThreads,
} = require("../functions/Threads");
const { getAuthenticatedUser } = require("../functions/Authenticate");

// Init shared
const router = Router();

//Returns all threads saved in the database
router.get("/threads", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    const threads = await getAllThreads();
    return res.status(StatusCodes.OK).json(threads);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

//Create a new thread in the database
router.post("/newThread", async (req, res) => {
  //Check if the request body is empty
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

// //Return threads with a specific search string, potentially redundant now due to better implemenatation
// router.get("/thread", async (req, res) => {
//   const threads = await findThreadsWithName(req.query.search);
//   if (threads === null) {
//     return res
//       .status(StatusCodes.BAD_REQUEST)
//       .json({ errors: "Thread could not be found." });
//   }
//   return res.status(StatusCodes.OK).json(threads);
// });

// //Create threads for new listings in the database, not to be called by the front-end
// //Only used periodically manually
// router.get("/CreateAllThreads", async (req, res) => {
//   const listings = await getAllListings();
//   await createMissingThreads(listings);
//   return res.status(StatusCodes.OK).send();
// });

module.exports = router;
