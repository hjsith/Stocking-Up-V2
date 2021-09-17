const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllArticles } = require("../daos/Article");

// Init shared
const router = Router();

router.get("/article", async (req, res) => {
  const article = await getAllArticles();

  return res.status(StatusCodes.OK).json(article);
});

module.exports = router;
