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

// Init shared
const router = Router();

router.get("/friends", async (req, res) => {
  const friends = await getAllCurrentFriendsForUser(req.query.id);

  return res.status(StatusCodes.OK).json(friends);
});

router.get("/friends/pending", async (req, res) => {
  const friends = await getAllPendingFriendsForUser(req.query.id);
  const data = await getInvestorModelsForFriends(req.query.id, friends);
  return res.status(StatusCodes.OK).json(data);
});

router.post("/friends/add", async (req, res) => {
  const newPendingFriend = await addInvestorAsFriend(
    req.body.rId,
    req.body.aId
  );

  return res.status(StatusCodes.OK).json(newPendingFriend);
});

router.patch("/friends/accept", async (req, res) => {
  await confirmPendingFriend(req.body.rId, req.body.aId);

  return res.status(StatusCodes.OK).end();
});

router.delete("/friends/deny", async (req, res) => {
  await denyPendingFriend(req.body.rId, req.body.aId);

  return res.status(StatusCodes.OK).end();
});

export default router;
