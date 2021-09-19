const { Threads } = require("../db/Models");

async function getAllThreads() {
  return await Threads.findAll();
}

async function findThreadsWithName(searchString) {
  return Threads.findAll({
    where: {
      Username: {
        [Op.substring]: searchString,
      },
    },
  });
}

async function createThread(inputListingID, inputTitle, inputDescription) {
  return Threads.create({
    ListingID: inputListingID,
    Title: inputTitle,
    Description: inputDescription,
  });
}

async function deleteThread(threadID) {
  const thread = await Threads.findByPk(threadID);
  thread.destroy();
  return;
}

async function archiveThread(threadID, inputTitle) {
  var updatedThread = await Threads.update(
    { Title: inputTitle + " - Archived" },
    {
      where: {
        ThreadID: threadID,
      },
    }
  );
  if (updatedThread[0] >= 1) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getAllThreads,
  findThreadsWithName,
  createThread,
  deleteThread,
  archiveThread,
};
