const { Investor, Friends } = require("../db/Models");
const { Op } = require("sequelize");
const moment = require("moment");
const { checkIfFriends } = require("../functions/Friends");

//Returns all investors
async function getAllInvestors() {
  return await Investor.findAll();
}

//Find investor given a ID
async function getInvestor(userID) {
  return await Investor.findByPk(userID);
}

async function getInvestorUsername(userID) {
  const investor = await Investor.findByPk(userID);
  return investor.Username;
}

//Create new investor
async function createInvestor(fName, lName, email, password, username) {
  let date = moment.utc().startOf("date");
  return Investor.create({
    InvestorFName: fName,
    InvestorLName: lName,
    InvestorEmail: email,
    InvestorPassword: password,
    Username: username,
    NetWorth: 0,
    InvestorRanking: 0,
    InvestorDifficulty: "NEEDED",
    DateJoined: date,
    Title: "NEEDED",
    Funds: 0,
  });
}

async function setInvestorDifficulty(id, difficulty) {
  const investor = await Investor.findByPk(id);
  let funds =
    difficulty == "Easy" ? 50000 : difficulty == "Intermediate" ? 20000 : 5000;
  let netWorth = funds;
  let title = "Beginner";

  await investor.update({
    InvestorDifficulty: difficulty,
    Funds: funds,
    NetWorth: netWorth,
    Title: title,
  });
}

async function investorBuy(investorID, total) {
  let investor = await Investor.findByPk(investorID);
  let balance = investor.Funds;
  if (total < balance) {
    investor.Funds -= total;
    await investor.save();
    return true;
  } else {
    return false;
  }
}

async function investorSell(investorID, total) {
  let investor = await Investor.findByPk(investorID);
  investor.Funds += total;
  await investor.save();
}

async function getInvestorPassword(username) {
  return Investor.findOne({
    attributes: ["InvestorPassword"],
    where: {
      Username: username,
    },
  });
}

//Check if a username already exist, used to prevent duplicate usernames from being used by investors
async function checkUsernameExist(username) {
  var searchedInvestor = await Investor.findOne({
    where: {
      Username: username,
    },
  });
  if (searchedInvestor === null) {
    return false;
  } else {
    return true;
  }
}

//Return investors given a search string
async function getInvestorsWithUsername(username) {
  return Investor.findAll({
    where: {
      Username: {
        [Op.substring]: username,
      },
    },
  });
}

//Update an investor's password
async function updateInvestorPassword(userID, username, password) {
  var updatedInvestorCount = await Investor.update(
    { InvestorPassword: password },
    {
      where: {
        [Op.or]: [{ Username: username }, { InvestorID: userID }],
      },
    }
  );
  if (updatedInvestorCount[0] >= 1) {
    return true;
  } else {
    return false;
  }
}

//Return an investor given a username
async function getOneInvestorWithUsername(username) {
  return Investor.findOne({
    where: {
      Username: username,
    },
  });
}

async function getInvestorsWithSimilarUsernames(
  userid,
  searchingUsername,
  username
) {
  const similarInvestors = await Investor.findAll({
    where: {
      [Op.and]: [
        {
          Username: {
            [Op.ne]: searchingUsername,
          },
        },
        {
          Username: {
            [Op.substring]: username,
          },
        },
      ],
    },
  });

  let nonFriends = [];

  for (let i = 0; i < similarInvestors.length; ++i) {
    await checkIfFriends(userid, similarInvestors[i].InvestorID).then(
      (result) => {
        if (!result) nonFriends.push(similarInvestors[i]);
      }
    );
  }

  return nonFriends;
}

module.exports = {
  getAllInvestors,
  getInvestor,
  getInvestorUsername,
  createInvestor,
  getInvestorPassword,
  checkUsernameExist,
  getInvestorsWithUsername,
  setInvestorDifficulty,
  updateInvestorPassword,
  getOneInvestorWithUsername,
  getInvestorsWithSimilarUsernames,
  investorBuy,
  investorSell,
};
