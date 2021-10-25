# Introduction

Stocking Up is a stock market application simulator system from ASD-Fri-Group-05. The scope of our project entails building a stock simulator application which will be named Stocking Up. The functionality will allow users to register and be investors in a simulated share market utilising data obtained from the ASX and users having access to a base $10,000 (easy mode) which can be used to purchase holdings and participate in a leaderboard to see how much capital can be earnt.

---

# Feature Allocation

| Name                   | Student Number | Feature 1                                     | Feature 2                                                 |
| ---------------------- | -------------- | --------------------------------------------- | --------------------------------------------------------- |
| Hasith Jayasekera      | 13562133       | Data Logic For Simulation                     | Friends                                                   |
| James Lee              | 13583950       | User Management                               | Discussion Boards                                         |
| Aiswaryalakshmi Rajeev | 13539756       | Portfolio Order Management (Holdings + Order) | Portfolio General Management (Watchlist + Today’s Change) |
| Vishaal Kumar          | 13584127       | Company View Page and Ordering                | Realtime News Page                                        |
| Sanya Dua              | 13538069       | User Access/Authentication                    | Markets Overview                                          |
| Jasmin Narisetty       | 13548565       | Quote Request - Search Company Page           | Presentation Logic for Share Market Simulator             |

---

# Repo Structure

Our repo is structured with the front-end **[client](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/client)** folder and back-end **[server](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server)** folder.

These two folders are contained within the root of the repo alongside the **[README.md](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/README.md)** file you are currently reading, the **[azure-pipelines.yml](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/azure-pipelines.yml)** (which defines our pipeline build, test and deploy stages) and an assortment of other files.

## Client folder

Within the **[client](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/client)** folder, we have our **[src](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/client/src)** folder which stores all our **[assets](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/client/src/assets)**, **[components](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/client/src/components)** and **[pages](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/client/src/pages)**.

Within the each of the **[components](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/client/src/components)** and **[pages](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/client/src/pages)** alongside the React functionality, we have our API connection functionality (also known as our Backend-For-Frontend or BFFs).

## Server folder

Finally, within the **[server](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server)** folder, we have our **[db](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server/db)**, **[functions](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server/functions)** and **[routes](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server/routes)** folders.

The **[db](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server/db)** contains our DBInstance file and our Models file. The DBInstance file creates our database connection instance, and the Models file creates models that allow us to interface with the tables on the Database.

The **[functions](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server/functions)** folder contains a file for each of the Database Models. These files contain specific operations that allow us to retrieve certain structures of data.

The **[routes](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server/routes)** folder links these functions to accessible routes, thus providing various API endpoints for the front-end to connect to. Our tests for our functionality are included within this folder with an easy-to-follow naming convention.

Finally, at the root of the server folder, we have two files: **[Environment.js](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server/Environment.js)** and **[server.js](https://dev.azure.com/ASD-Fri-Group-05/_git/Stocking%20Up?path=/server/server.js)** which configures and launches the Express app that is binded to the routes and models.

---

# Pipelines

Our repo is hosted on Azure DevOps, and as a result, we have our pipeline hosted on Azure Pipelines.

Our pipeline runs are configured to run on each merge/commit to the main branch. We have three stages to our Pipeline Runs:

1. Build
   - This runs an npm install on the server side of the repo and archives/zips the repo for deployment
2. Test
   - This runs the jest unit tests we have created for our functionality. If any of these tests fail, the pipeline run fails.
3. Deploy
   - This unzips the repo and deploys it on the Azure App Service and, as a result, is hosted on **[Stocking Up](https://stocking-up.azurewebsites.net/)**
