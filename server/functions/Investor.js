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

export async function checkEmailExist(email) {
  var searchedInvestor = await Investor.findOne({
    where: {
      InvestorEmail: email,
    },
  });
  if (searchedInvestor === null) {
    return false;
  } else {
    return true;
  }
}

export async function updateUserDetails(
  userID,
  inputFirstName,
  inputLastName,
  inputEmail
) {
  const investor = await Investor.findByPk(userID);
  await investor.update({
    InvestorFName: inputFirstName,
    InvestorLName: inputLastName,
    InvestorEmail: inputEmail,
  });
}

export async function getInvestorsLeaderboard(inputDifficulty) {
  return await Investor.findAll({
    order: [["NetWorth", "DESC"]],
    where: {
      InvestorDifficulty: inputDifficulty,
    },
  });
}

export async function updateInvestorRankings() {
  const easyInvestors = await Investor.findAll({
    order: [["NetWorth", "DESC"]],
    where: {
      InvestorDifficulty: "Easy",
    },
  });

  if (easyInvestors.length != 0) {
    easyInvestors[0].InvestorRanking = 1;
    easyInvestors[0].save();
    for (let i = 1; i < easyInvestors.length; ++i) {
      if (easyInvestors[i].NetWorth == easyInvestors[i - 1].NetWorth) {
        easyInvestors[i].InvestorRanking = easyInvestors[i - 1].InvestorRanking;
        easyInvestors[i].save();
      } else {
        easyInvestors[i].InvestorRanking = i + 1;
        easyInvestors[i].save();
      }
    }
  }

  const intermediateInvestors = await Investor.findAll({
    order: [["NetWorth", "DESC"]],
    where: {
      InvestorDifficulty: "Intermediate",
    },
  });

  if (intermediateInvestors.length != 0) {
    intermediateInvestors[0].InvestorRanking = 1;
    intermediateInvestors[0].save();
    for (let i = 1; i < intermediateInvestors.length; ++i) {
      if (
        intermediateInvestors[i].NetWorth ==
        intermediateInvestors[i - 1].NetWorth
      ) {
        intermediateInvestors[i].InvestorRanking =
          intermediateInvestors[i - 1].InvestorRanking;
        intermediateInvestors[i].save();
      } else {
        intermediateInvestors[i].InvestorRanking = i + 1;
        intermediateInvestors[i].save();
      }
    }
  }

  const difficultInvestors = await Investor.findAll({
    order: [["NetWorth", "DESC"]],
    where: {
      InvestorDifficulty: "Difficult",
    },
  });

  if (difficultInvestors.length != 0) {
    difficultInvestors[0].InvestorRanking = 1;
    difficultInvestors[0].save();
    for (let i = 1; i < difficultInvestors.length; ++i) {
      if (
        difficultInvestors[i].NetWorth == difficultInvestors[i - 1].NetWorth
      ) {
        difficultInvestors[i].InvestorRanking =
          difficultInvestors[i - 1].InvestorRanking;
        difficultInvestors[i].save();
      } else {
        difficultInvestors[i].InvestorRanking = i + 1;
        difficultInvestors[i].save();
      }
    }
  }
}
