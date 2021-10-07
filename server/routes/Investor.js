import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllInvestors,
  getInvestor,
  getInvestorUsername,
  updateInvestorPassword,
  setInvestorDifficulty,
  getInvestorsWithSimilarUsernames,
} from "../functions/Investor";
import bcrypt from "bcrypt";
import { getAuthenticatedUser } from "../functions/Authenticate";

// Init shared
const router = Router();

//Return a list of all saved investors
router.get("/allInvestors", async (req, res) => {
  const investors = await getAllInvestors();
  return res.status(StatusCodes.OK).json(investors);
});

//Update the password of an investor
router.put("/updatePassword", async (req, res) => {
  //Check if the request body is empty
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .send("The request doesn't have the correct body format.");
  }

  var data = req.body;

  //Hash the password using the bcrypt package, will go through 10 rounds of hashing(salting)
  const passHash = await bcrypt.hash(data.password, 10);

  const updateCheck = await updateInvestorPassword(
    data.userID ?? "", //Null check on UserID & username as both can be provided to check
    data.username ?? "",
    passHash
  );

  if (updateCheck) {
    return res.status(StatusCodes.OK).send();
  }
  return res.status(StatusCodes.CONFLICT).send();
});

//Return the details of a specified investor
router.get("/investor", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    const user = await getInvestor(req.query.id);
    if (user === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: "User could not be found." });
    }
    return res.status(StatusCodes.OK).json(user);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/investor/username/similar", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    if (req.query.username == "") return res.status(StatusCodes.OK).json([]);
    const users = await getInvestorsWithSimilarUsernames(
      req.query.id,
      req.query.currentuser,
      req.query.username
    );
    if (users === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: "User could not be found." });
    }
    return res.status(StatusCodes.OK).json(users);
  } else {
    res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.patch("/investor/difficulty", async (req, res) => {
  await setInvestorDifficulty(req.body.id, req.body.difficulty);
  return res.status(StatusCodes.OK).end();
});

module.exports = router;
