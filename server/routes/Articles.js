import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { getAllArticles } from "../functions/Articles.js";
import { getAuthenticatedUser } from "../functions/Authenticate.js";

// Init shared
const router = Router();

router.get("/articles", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    const articles = await getAllArticles();
    return res.status(StatusCodes.OK).json(articles);
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

export default router;
