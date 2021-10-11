import { Achievements } from "../db/Models.js";

export async function getAllCurrentAchievements() {
  return await Achievements.findAll();
}
