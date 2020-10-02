// global settings - absolute path
global.base_dir = __dirname;
global.abs_path = function (path) {
  return base_dir + path;
};
global.include = function (file) {
  return require(abs_path("/" + file));
};

// retrieve environment variables
require("dotenv").config();
let {
  MQTT_BROKER_ADDR,
  SERVER_PORT,
  CONTROL_TOPIC,
  LOG_TOPIC,
  ENV,
} = process.env;

// main app objects
const express = require("express");
var bodyParser = require("body-parser");
var CronJob = require("cron").CronJob;

const app = express();

/*
middlewares
*/
// response parsers
app.use(bodyParser.json()); // app/json
app.use(bodyParser.urlencoded({ extended: true })); // app/xwww-form-urlencoded

// mongoose database settings
if (ENV === "LOCAL") include("config/nosql/dbconfig.js");
else if (ENV === "REMOTE") include("config/nosql/dbconfig_remote.js");

// router variable holds the exported module from routing.js
// attach the '/' route to the router in routing.js
var router = require("./api/routes/routing.js");
app.use("/api", router);

// app.listen(port, [host], [backlog], [callback]])
app.listen(SERVER_PORT, () =>
  console.log("App listening on port", SERVER_PORT)
);

// MQTT receive handler
var logHandler;
if (ENV === "LOCAL")
  logHandler = include("api/controllers/devices/logDevice.js").log;
else if (ENV === "REMOTE")
  logHandler = include("api/controllers/devices/logHomeD.js").logToMongo;

const mqttRecvHandler = (topic, message) => {
  console.log(message.toString()); // message is Buffer

  // decode the message
  var [loggerId, temperature, humidity] = message.toString().split(":");
  console.log({ loggerId });
  console.log({ temperature });
  console.log({ humidity });

  logHandler(loggerId, new Date(), temperature, humidity);
};

// Init MQTT connection
var mqttClient = include("util/mqtt/mqttClient");
mqttClient.init(MQTT_BROKER_ADDR, LOG_TOPIC, mqttRecvHandler); // default subscription

// Cron job - publish MQTT message "LOG"
// - asks IoT nodes to log their reading + timestamp hourly
// - send the current timestamp, which will be sent back by MCU
const mqttLogJob = new CronJob("*/15 * * * * *", function () {
  // mqttClient.send("LOG" + "/" + new Date().toISOString());
  mqttClient.send("LOG", CONTROL_TOPIC);
});

const {
  sqliteRelogToMongo,
} = require("./api/controllers/devices/relogHomeD_sqlite.js");
const mqttBackupLogJob = new CronJob("7 * * * * *", function () {
  // mqttClient.send("LOG" + "/" + new Date().toISOString());
  sqliteRelogToMongo();
});
// Start Cron jobs
mqttLogJob.start();
mqttBackupLogJob.start();

// exports the app
module.exports = app;
