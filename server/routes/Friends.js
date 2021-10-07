import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllCurrentFriendsForUser,
  addInvestorAsFriend,
  getAllPendingFriendsForUser,
  getInvestorModelsForFriends,
  confirmPendingFriend,
  denyPendingFriend,
} from "../functions/Friends.js";
import { getAuthenticatedUser } from "../functions/Authenticate.js";

// Init shared
const router = Router();

router.get("/friends", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const friends = await getAllCurrentFriendsForUser(req.query.id);
    return res.status(StatusCodes.OK).json(friends);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/friends/pending", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const friends = await getAllPendingFriendsForUser(req.query.id);
    const data = await getInvestorModelsForFriends(req.query.id, friends);
    return res.status(StatusCodes.OK).json(data);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.post("/friends/add", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const newPendingFriend = await addInvestorAsFriend(
      req.body.rId,
      req.body.aId
    );
    return res.status(StatusCodes.CREATED).json(newPendingFriend);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.patch("/friends/accept", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    await confirmPendingFriend(req.body.rId, req.body.aId);
    return res.status(StatusCodes.OK).end();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.delete("/friends/deny", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    await denyPendingFriend(req.body.rId, req.body.aId);
    return res.status(StatusCodes.OK).end();
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});
//Hi :)
export default router;
