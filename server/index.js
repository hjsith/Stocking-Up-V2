const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const staticDir = path.join(__dirname, "../client/build/");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(staticDir));

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: staticDir });
});

// app.get("/", (req, res) => {
//   res.sendFile("index.html", { root: staticDir });
// });

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
