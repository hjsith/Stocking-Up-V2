import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import {
  getAllInvestors,
  getInvestor,
  updateInvestorPassword,
  setInvestorDifficulty,
  getInvestorsWithSimilarUsernames,
  updateUserDetails,
  getInvestorsLeaderboard,
  updateInvestorRankings,
} from "../functions/Investor.js";
import bcrypt from "bcrypt";
import { getAuthenticatedUser } from "../functions/Authenticate.js";

// Init shared
const router = Router();

//Return a list of all saved investors
router.get("/allInvestors", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    const investors = await getAllInvestors();
    return res.status(StatusCodes.OK).json(investors);
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
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
    return res.status(StatusCodes.UNAUTHORIZED).end();
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
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.patch("/investor/difficulty", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    await setInvestorDifficulty(req.body.id, req.body.difficulty);
    return res.status(StatusCodes.OK).end();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.put("/investor/updateUser", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res);
  if (checkAuth) {
    //Check if the request body is empty
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send("The request doesn't have the correct body format.");
    }

    var data = req.body;

    await updateUserDetails(
      data.investorID,
      data.firstname,
      data.lastname,
      data.email
    );
    return res.status(StatusCodes.OK).end();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/allInvestors/Leaderboard", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    const investors = await getInvestorsLeaderboard(req.query.difficulty);
    return res.status(StatusCodes.OK).json(investors);
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

router.get("/determineInvestorRankings", async (req, res) => {
  const checkAuth = await getAuthenticatedUser(req, res); //Check if the user is authenticated via their cookies
  if (checkAuth) {
    await updateInvestorRankings();
    return res.status(StatusCodes.OK).end();
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
});

export default router;
