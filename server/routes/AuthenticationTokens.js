const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllAuthenticationTokens } = require("../daos/AuthenticationTokens");

// Init shared
const router = Router();

router.get("/AuthenticationTokens", async (req, res) => {
  const AuthenticationTokens = await getAllAuthenticationTokens();

  return res.status(StatusCodes.OK).json(AuthenticationTokens);
});

module.exports = router;
