import { ObtainedAchievements } from "../db/Models.js";

export async function getAllObtainedAchievements() {
  return await ObtainedAchievements.findAll();
}
