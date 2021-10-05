const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { getAllAuthenticationTokens } = require("../functions/AuthenticationTokens");

// Init shared
const router = Router();
//Authentication token route 
router.get("/AuthenticationTokens", async (req, res) => {
  const AuthenticationTokens = await getAllAuthenticationTokens();

  return res.status(StatusCodes.OK).json(AuthenticationTokens);         // Status Code 
});

module.exports = router;
