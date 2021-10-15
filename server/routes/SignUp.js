import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import { createInvestor, checkUsernameExist } from "../functions/Investor.js";
import bcrypt from "bcrypt";
import { generateNewAuthenticationTokens } from "../functions/Authenticate.js";
// Init shared
const router = Router();
//route for Sign Up and adds their details to database
router.post("/SignUp", async (req, res) => {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    //checks if request body is empty
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }
  var data = req.body;
  var checkUser = await checkUsernameExist(data.username);
  if (checkUser === true) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).send();
  }
  const passHash = await bcrypt.hash(data.password, 10); //hashses password for encryption for 10 times

  const user = await createInvestor(
    data.firstName,
    data.lastName,
    data.email,
    passHash,
    data.username
  );
  const device = req.headers.host ?? "Unknown";
  await generateNewAuthenticationTokens(user, device, res);

  return res
    .status(StatusCodes.CREATED)
    .json({ id: user.InvestorID, username: user.Username });
});

export default router;
