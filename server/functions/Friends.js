import { Investor, Friends } from "../db/Models.js";
import pkg from "sequelize";
const { Op } = pkg;
import moment from "moment";

//Gets all CURRENT friends based on the corresponding user id
export async function getAllCurrentFriendsForUser(id) {
  return await Friends.findAll({
    where: {
      [Op.or]: [{ RequestingUsername: id }, { AcceptingUsername: id }],
      Status: 1,
    },
  });
}

//Gets all PENDING friends based on the corresponding user id
export async function getAllPendingFriendsForUser(id) {
  return await Friends.findAll({
    where: {
      [Op.or]: {
        AcceptingUsername: id,
      },
      Status: 0,
    },
  });
}

//Gets all the Investor details for each of the friends
export async function getInvestorModelsForFriends(userId, friends) {
  let investors = [];

  //Gets the Investor model of each friend
  var results = new Promise((resolve, reject) => {
    friends.forEach(async (friend, index, friends) => {
      let id =
        friend.RequestingUsername == userId
          ? friend.AcceptingUsername
          : friend.RequestingUsername;
      await Investor.findByPk(id).then((investor) => {
        if (investor != null) investors.push(investor);
      });
      if (index == friends.length - 1) resolve();
    });
  });

  //Returns custom JSON model for each Investor/Friend model
  const customModel = await results.then(() => {
    var values = [];
    if (investors.length == friends.length) {
      for (let i = 0; i < friends.length; ++i) {
        let data = {
          InvestorID: investors[i].InvestorID,
          Username: investors[i].Username,
          InvestorRanking: investors[i].InvestorRanking,
          InvestorDifficulty: investors[i].InvestorDifficulty,
          DateJoined: investors[i].DateJoined,
          Title: investors[i].Title,
          Funds: investors[i].Funds,
          NetWorth: investors[i].NetWorth,
          DateAdded: friends[i].DateAdded,
        };
        values.push(data);
      }
    }
    return values;
  });

  return customModel;
}

//Creates pending friend request between two users
export async function addInvestorAsFriend(rId, aId) {
  return await Friends.create({
    RequestingUsername: rId,
    AcceptingUsername: aId,
    Status: 0,
    DateAdded: moment.utc().startOf("date"),
  });
}

//Updates pending friend request between two users to be current
export async function confirmPendingFriend(rId, aId) {
  await Friends.findOne({
    where: {
      RequestingUsername: rId,
      AcceptingUsername: aId,
    },
  }).then(async (friend) => {
    friend.Status = 1;
    await friend.save();
  });
}

//Deletes pending friend request between two users
export async function denyPendingFriend(rId, aId) {
  await Friends.findOne({
    where: {
      RequestingUsername: rId,
      AcceptingUsername: aId,
    },
  }).then(async (friend) => {
    friend.Status = 1;
    await friend.destroy();
  });
}

//Checks if two friends are currently friends
export async function checkIfFriends(user1, user2) {
  let value = await Friends.findOne({
    where: {
      [Op.or]: [
        {
          RequestingUsername: user1,
          AcceptingUsername: user2,
        },
        {
          RequestingUsername: user2,
          AcceptingUsername: user1,
        },
      ],
    },
  }).then((friend) => {
    return friend != null;
  });

  return value;
}
