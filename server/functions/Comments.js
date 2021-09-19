const { Comments } = require("../db/Models");

async function getAllComments() {
  return await Comments.findAll();
}

async function createComment(
  inputInvestorID,
  inputThreadID,
  inputDateAdded,
  inputComment,
  inputListingPrice
) {
  return Comments.create({
    InvestorID: inputInvestorID,
    ThreadID: inputThreadID,
    DateAdded: inputDateAdded,
    Comment: inputComment,
    ListingPrice: inputListingPrice,
    Likes: 0,
  });
}

async function increaseLike(commentID) {
  var commentLikes = Comments.findOne({
    attributes: ["Likes"],
    where: {
      CommentID: commentID,
    },
  });

  var updatedComment = await Comments.update(
    { Likes: commentLikes + 1 },
    {
      where: {
        CommentID: commentID,
      },
    }
  );
  if (updatedComment[0] >= 1) {
    return true;
  } else {
    return false;
  }
}

async function decreaseLike(commentID) {
  var commentLikes = Comments.findOne({
    attributes: ["Likes"],
    where: {
      CommentID: commentID,
    },
  });

  var updatedComment = await Comments.update(
    { Likes: commentLikes - 1 },
    {
      where: {
        CommentID: commentID,
      },
    }
  );
  if (updatedComment[0] >= 1) {
    return true;
  } else {
    return false;
  }
}

async function updateCommentMessage(commentID, newMessage) {
  var updatedComment = await Comments.update(
    { Comment: newMessage },
    {
      where: {
        CommentID: commentID,
      },
    }
  );
  if (updatedComment[0] >= 1) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getAllComments,
  createComment,
  increaseLike,
  decreaseLike,
  updateCommentMessage,
};
