import { Friends } from "../db/Models.js";

export async function getAllCurrentFriends() {
  return await Friends.findAll();
}
