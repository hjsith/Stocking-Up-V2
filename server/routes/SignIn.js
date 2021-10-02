const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt"); //hashed password
const {
  generateNewAuthenticationTokens
} = require("../functions/Authenticate");
const {
  getInvestorPassword,
  checkUsernameExist,
  updateInvestorPassword,
  getOneInvestorWithUsername
} = require("../functions/Investor");

// Init shared
const router = Router();

router.post("/SignIn", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  var data = req.body;
  var userPassword = await getInvestorPassword(data.username);

  const match = await bcrypt.compare(
    data.password,
    userPassword != null ? userPassword.InvestorPassword : ""
  ); //comparing passwords
  if (match == true) {
    const user = await getOneInvestorWithUsername(data.username);

    const device = req.headers.host ?? "Unknown";
    await generateNewAuthenticationTokens(user, device, res);

    return res
      .status(StatusCodes.OK)
      .json({ id: user.InvestorID, username: user.Username });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});
router.get("/logout", async (req, res) => {
  return res
    .status(StatusCodes.OK)
    .clearCookie("access_tokens")
    .end();
});

router.post("/ForgotPassword", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  var data = req.body;

  var userCheck = await checkUsernameExist(data.username);
  if (userCheck == true) {
    //checking if user exists
    const passHash = await bcrypt.hash(data.password, 10);
    const check = await updateInvestorPassword("", data.username, passHash);
    if (check == true) {
      return res.status(StatusCodes.OK).end();
    } else {
      return res.status(StatusCodes.CONFLICT).end();
    }
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

module.exports = router;
