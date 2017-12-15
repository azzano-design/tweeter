"use strict";

// Basic express setup:

const PORT            = 8080;
const express         = require("express");
const sassMiddleware  = require('node-sass-middleware');
const bodyParser      = require("body-parser");
const path            = require('path');

var srcPath = __dirname;
var destPath = __dirname + '/../public/styles/';

const app             = express();
const morgan          = require('morgan');

// Use SassMiddleware for Sass requests
app.use('/styles', sassMiddleware({
  src: srcPath,
  dest: destPath,
  debug: true,
  outputStyle: 'expanded'
}));

// Otherwise, fetch from public
app.use(express.static('./public'));
app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: true }));

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