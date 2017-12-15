"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
const morgan        = require('morgan');

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Use MongoDB instead of in-memory
const db = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

db.connect(MONGODB_URI, (err, db) => {
  if (err) {
    console.error(`Failed to connect: ${MONGODB_URI}`);
    throw err;
  }
  console.error(`Connected Successfully: ${MONGODB_URI}`);

  const DataHelpers = require("./lib/data-helpers.js")(db);
  const tweetsRoutes = require("./routes/tweets")(DataHelpers);

  // Mount the tweets routes at the "/tweets" path prefix:
  app.use("/tweets", tweetsRoutes);
  app.listen(PORT, () => {
    console.log("Tweeter listening on port " + PORT);
  });
});