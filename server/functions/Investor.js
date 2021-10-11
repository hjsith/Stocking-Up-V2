import { Investor } from "../db/Models.js";
import pkg from "sequelize";
const { Op } = pkg;
import moment from "moment";
import { checkIfFriends } from "../functions/Friends.js";

//Returns all investors
export async function getAllInvestors() {
  return await Investor.findAll();
}

//Find investor given a ID
export async function getInvestor(userID) {
  return await Investor.findByPk(userID);
}

//Create new investor
export async function createInvestor(fName, lName, email, password, username) {
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

export async function setInvestorDifficulty(id, difficulty) {
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

export async function investorBuy(investorID, total) {
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

export async function investorSell(investorID, total) {
  let investor = await Investor.findByPk(investorID);
  investor.Funds += total;
  await investor.save();
}

export async function getInvestorPassword(username) {
  return Investor.findOne({
    attributes: ["InvestorPassword"],
    where: {
      Username: username,
    },
  });
}

//Check if a username already exist, used to prevent duplicate usernames from being used by investors
export async function checkUsernameExist(username) {
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
export async function getInvestorsWithUsername(username) {
  return Investor.findAll({
    where: {
      Username: {
        [Op.substring]: username,
      },
    },
  });
}

//Update an investor's password
export async function updateInvestorPassword(userID, username, password) {
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
export async function getOneInvestorWithUsername(username) {
  return Investor.findOne({
    where: {
      Username: username,
    },
  });
}

export async function getInvestorsWithSimilarUsernames(
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
