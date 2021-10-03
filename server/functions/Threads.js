const { Threads } = require("../db/Models");

async function getAllThreads() {
  return await Threads.findAll();
}

// async function findThreadsWithName(searchString) {
//   return Threads.findAll({
//     where: {
//       Username: {
//         [Op.substring]: searchString,
//       },
//     },
//   });
// }

async function createThread(
  inputThreadID,
  inputListingID,
  inputTitle,
  inputDescription
) {
  return Threads.create({
    ThreadID: inputThreadID,
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

async function createMissingThreads(listings) {
  for (const element of listings) {
    await Threads.findOrCreate({
      where: { ListingID: element.ListingID },
      defaults: {
        ThreadID: "TH-" + element.ListingID,
        ListingID: element.ListingID,
        Title: element.ListingName,
        Description: "A discussion board for " + element.ListingName,
      },
    });
  }
}

module.exports = {
  getAllThreads,
  // findThreadsWithName,
  createThread,
  deleteThread,
  archiveThread,
  createMissingThreads,
};
