import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllCurrentFriends } from "../functions/Friends.js";

// Init shared
const router = Router();

router.get("/friends", async (req, res) => {
  const friends = await getAllCurrentFriends();

  return res.status(StatusCodes.OK).json(friends);
});

export default router;
