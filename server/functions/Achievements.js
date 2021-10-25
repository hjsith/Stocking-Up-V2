import { Achievements } from "../db/Models.js";

export async function getAllCurrentAchievements() {
  return await Achievements.findAll();
}

export async function getAchievementbyID(achievementID) {
  return await Achievements.findAll({
    where: {
      AchievementID: achievementID,
    },
  });
}

export async function createAchievement(
  achievementTitle,
  achievementDescription,
  image
) {
  return Achievements.create({
    Title: achievementTitle,
    Description: achievementDescription,
    MedalImage: image,
  });
}
