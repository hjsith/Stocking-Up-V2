import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllArticles } from "../functions/Articles.js";

// Init shared
const router = Router();

router.get("/articles", async (req, res) => {
  const articles = await getAllArticles();
  return res.status(StatusCodes.OK).json(articles);
});

export default router;
