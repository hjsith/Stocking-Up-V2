const { Threads } = require("../db/Models");

async function getAllThreads() {
  return await Threads.findAll();
}

module.exports = { getAllThreads };
