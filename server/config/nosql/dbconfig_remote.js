/*
Defining MongoDB connection
*/

var mongoose = require("mongoose");

var gracefulShutdown;
const { MONGO_UNAME, MONGO_PWD, MONGO_DBNAME } = process.env;
// var dbURI = "mongodb://localhost/db_umnsmartenergy";
var dbURI =
  "mongodb+srv://" +
  MONGO_UNAME +
  ":" +
  MONGO_PWD +
  "@energy.gs1cq.mongodb.net/" +
  MONGO_DBNAME +
  "?retryWrites=true&w=majority";

global.actualLogCount = 0;
global.savedLogCount = 0;

mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  serverSelectionTimeoutMS: 1000, // <-- configure `useUnifiedTopology`
});

// mongoose connection style: on DB disconnection, do not buffer operations
// mongoose.connect(dbURI, {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
//   serverSelectionTimeoutMS: 1000, // <-- configure `useUnifiedTopology`
//   bufferMaxEntries: 0,
//   bufferCommands: false,
// });

// CONNECTION EVENTS - check connection
mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to " + dbURI);
});
mongoose.connection.on("error", function (err) {
  console.log("Mongoose connection error: " + err);
});
mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected through " + msg);
    callback();
  });
};
// For nodemon restarts
process.once("SIGUSR2", function () {
  gracefulShutdown("nodemon restart", function () {
    process.kill(process.pid, "SIGUSR2");
  });
});
// For app termination
process.on("SIGINT", function () {
  gracefulShutdown("app termination", function () {
    process.exit(0);
  });
});
// For Heroku app termination
process.on("SIGTERM", function () {
  gracefulShutdown("Heroku app termination", function () {
    process.exit(0);
  });
});

// BRING IN YOUR SCHEMAS & MODELS (not sure why)
require("./models/logger.js");
