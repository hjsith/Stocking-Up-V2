import { ObtainedAchievements, Achievements } from "../db/Models.js";
import moment from "moment";

export async function getAllObtainedAchievements() {
  return await ObtainedAchievements.findAll();
}

export async function getAllObtainedAchievementsForUser(userID) {
  let obtainedAchievements = await ObtainedAchievements.findAll({
    where: {
      InvestorID: userID,
    },
  });

  let allAchievements = await Achievements.findAll();

  var newData = [];

  for (let i = 0; i < allAchievements.length; ++i) {
    let found = false;
    for (let y = 0; y < obtainedAchievements.length; ++y) {
      if (found) {
        break;
      }
      if (
        allAchievements[i].AchievementID ==
        obtainedAchievements[y].AchievementID
      ) {
        found = true;
        newData.push({
          AchievementTitle: allAchievements[i].Title,
          AchievementDescription: allAchievements[i].Description,
          AchievementStatus: true,
          DateAchieved: obtainedAchievements[y].DateAchieved,
        });
      }
    }
    if (!found) {
      newData.push({
        AchievementTitle: allAchievements[i].Title,
        AchievementDescription: allAchievements[i].Description,
        AchievementStatus: false,
        DateAchieved: null,
      });
    }
  }

  return newData;
}

export async function createObtainedAchievement(userID, achievementID) {
  let date = moment.utc().startOf("date");
  return ObtainedAchievements.create({
    AchievementID: achievementID,
    InvestorID: userID,
    DateAchieved: date,
  });
}
