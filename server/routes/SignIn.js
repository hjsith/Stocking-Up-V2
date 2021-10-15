import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"; //hashed password
import { generateNewAuthenticationTokens } from "../functions/Authenticate.js";
import {
  getInvestorPassword,
  checkUsernameExist,
  updateInvestorPassword,
  getOneInvestorWithUsername,
} from "../functions/Investor.js";

// Init shared
const router = Router();
// route for when user signs in
router.post("/SignIn", async (req, res) => {
  // route for when user signs in
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
    await generateNewAuthenticationTokens(user, device, res); //create new access and refresh tokens

    return res
      .status(StatusCodes.OK)
      .json({ id: user.InvestorID, username: user.Username });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});
router.get("/logout", async (req, res) => {
  return res.status(StatusCodes.OK).clearCookie("access_tokens").end();
});
//Forgot Password Route
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
    const passHash = await bcrypt.hash(data.password, 10); // hashses password for encryption for 10 times
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

export default router;
