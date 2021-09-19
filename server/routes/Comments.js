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

// Init shared
const router = Router();

router.get("/comments", async (req, res) => {
  const comments = await getAllComments(req.query.ThreadID);

  return res.status(StatusCodes.OK).json(comments);
});

router.post("/newComment", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const comment = await createComment(
    data.InvestorID,
    data.ThreadID,
    "2016-01-01 00:00:00+00:00", //Waiting for merge from Order with moment package to use
    data.Comment,
    data.ListingPrice
  );
  return res.status(StatusCodes.CREATED).json(comment);
});

router.get("/commentCount", async (req, res) => {
  const commentCount = await getUserCommentCount(req.query.userID);
  if (commentCount === null) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ errors: "Thread could not be found." });
  }
  return res.status(StatusCodes.OK).json(threads);
});

router.put("/editComment", async (req, res) => {
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
    const comments = await getAllComments(data.ThreadID);
    return res.status(StatusCodes.OK).json(comments);
  }
  return res.status(StatusCodes.CONFLICT).send();
});

router.put("/likeComment", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const commentCheck = await increaseLike(data.CommentID);
  if (commentCheck) {
    return res.status(StatusCodes.OK).send();
  }
  return res.status(StatusCodes.CONFLICT).json({ errors: "Bad CommentID" });
});

router.put("/unlikeComment", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  const commentCheck = await decreaseLike(data.CommentID);
  if (commentCheck) {
    return res.status(StatusCodes.OK).send();
  }
  return res.status(StatusCodes.CONFLICT).json({ errors: "Bad CommentID" });
});

module.exports = router;
