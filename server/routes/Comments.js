const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getAllComments,
  createComment,
  getUserCommentCount,
  updateCommentMessage,
  increaseLike,
  decreaseLike,
} = require("../functions/Comments");
const { getAuthenticatedUser } = require("../functions/Authenticate");

// Init shared
const router = Router();

//Return all comments for a specific thread
router.get("/comments", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    const comments = await getAllComments("TH-" + req.query.ThreadID);
    return res.status(StatusCodes.OK).json(comments);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

//Create a new comment for a specific thread in the database
router.post("/newComment", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    //Check if the request body is empty
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("The request doesn't have the correct body format.");
    }

    var data = req.body;

    const comment = await createComment(
      data.InvestorID,
      data.ThreadID,
      data.DateAdded,
      data.Comment,
      data.ListingPrice
    );
    return res.status(StatusCodes.CREATED).json(comment);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

//Return the number of comments a user has made
router.get("/commentCount", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    const commentCount = await getUserCommentCount(req.query.userID);
    return res.status(StatusCodes.OK).json(commentCount);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

//Update the comment message of a comment
router.put("/editComment", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    //Check if the request body is empty
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("The request doesn't have the correct body format.");
    }

    var data = req.body;

    const commentCheck = await updateCommentMessage(
      data.CommentID,
      data.newMessage
    );

    if (commentCheck) {
      //Check if the comment was successfully updated
      const comments = await getAllComments(data.ThreadID);
      return res.status(StatusCodes.OK).json(comments);
    }
    return res.status(StatusCodes.CONFLICT).send();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

//Increase the like count of a comment by one
router.put("/likeComment", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    //Check if the request body is empty
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("The request doesn't have the correct body format.");
    }

    var data = req.body;

    const commentCheck = await increaseLike(data.CommentID);
    //Check if update was successful
    if (commentCheck) {
      return res.status(StatusCodes.OK).send();
    }
    return res.status(StatusCodes.CONFLICT).json({ errors: "Bad CommentID" });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

//Decrease the like count of a comment by one
router.put("/unlikeComment", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    //Check if the request body is empty
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("The request doesn't have the correct body format.");
    }

    var data = req.body;

    const commentCheck = await decreaseLike(data.CommentID);
    //Check if update was successful
    if (commentCheck) {
      return res.status(StatusCodes.OK).send();
    }
    return res.status(StatusCodes.CONFLICT).json({ errors: "Bad CommentID" });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

module.exports = router;
