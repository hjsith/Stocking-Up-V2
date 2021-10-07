const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllArticles } = require("../functions/Articles");

// Init shared
const router = Router();
// this section retrieves all articles to view on the front end in the Newsfeed
router.get("/articles", async (req, res) => {
  const articles = await getAllArticles();

  return res.status(StatusCodes.OK).json(articles);
});

module.exports = router;
