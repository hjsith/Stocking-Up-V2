const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { createInvestor, checkUsernameExist } = require("../functions/Investor");
const bcrypt = require("bcrypt");
const generateNewAuthenticationTokens = require("../functions/Authenticate");
// Init shared
const router = Router();

router.post("/SignUp", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  var data = req.body;
  var checkUser = await checkUsernameExist(data.username);
  if (checkUser === true) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send();
  }
  const passHash = await bcrypt.hash(data.password, 10);

  const user = await createInvestor(
    data.firstName,
    data.lastName,
    data.email,
    passHash,
    data.username
  );
  const device = req.headers.host ?? "Unknown";
  await generateNewAuthenticationTokens(user.InvestorID, device, res);

  return res.status(StatusCodes.CREATED).end();
});

module.exports = router;
