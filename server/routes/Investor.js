const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const {
  getAllInvestors,
  getInvestor,
  updateInvestorPassword,
  getAllInvestors,
} = require("../functions/Investor");
const bcrypt = require("bcrypt");
const { getAuthenticatedUser } = require("../functions/Authenticate");
const { Investor } = require("../db/Models");

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

module.exports = router;
