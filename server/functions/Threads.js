const { Threads } = require("../db/Models");

//Return all threads
async function getAllThreads() {
  return await Threads.findAll();
}
// //Return threads given a search string, potentially redundant due to better search functionality implementation
// async function findThreadsWithName(searchString) {
//   return Threads.findAll({
//     where: {
//       Username: {
//         [Op.substring]: searchString,
//       },
//     },
//   });
// }

//Create a new thread
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

//Delete a thread, should be used when a listing no longer exist
async function deleteThread(threadID) {
  const thread = await Threads.findByPk(threadID);
  thread.destroy();
  return;
}

//Update the name of a thread to Archive it incase a listing no longer exists
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

//Create threads for listings that haven't already been created
async function createMissingThreads(listings) {
  //Loop through all listings
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
