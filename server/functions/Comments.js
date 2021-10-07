import { Comments } from "../db/Models.js";

//Return all comments for a specific thread
export async function getAllComments(threadID) {
  return await Comments.findAll({
    where: {
      ThreadID: threadID,
    },
    order: [["DateAdded"]],
  });
}

//Return the number of comments a user has
export async function getUserCommentCount(investorID) {
  var comments = await Comments.findAll({
    where: {
      InvestorID: investorID,
    },
  });
  return comments.length;
}

//Create a new comment
export async function createComment(
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

//Increase the like count of a comment by one
export async function increaseLike(commentID) {
  var commentLikes = await Comments.findOne({
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

  //Check if the comment was successfully updated
  if (updatedComment[0] >= 1) {
    return true;
  } else {
    return false;
  }
}

//Decrease the like count of a comment by one
export async function decreaseLike(commentID) {
  var commentLikes = await Comments.findOne({
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

  //Check if the comment was successfully updated
  if (updatedComment[0] >= 1) {
    return true;
  } else {
    return false;
  }
}

export async function updateCommentMessage(commentID, newMessage) {
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
