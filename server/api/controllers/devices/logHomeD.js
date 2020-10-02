/*
API calls for data logging - uses MQTT
*/
var mongoose = require("mongoose");
var Logger = mongoose.model("Logger");
const { logToSqlite } = require("./logHomeD_sqlite");

module.exports.logToMongo = function (loggerID, ts, temp, hum) {
  // new Logger - Mongoose model object
  var newLog = new Logger({
    loggerID,
    ts,
    temp,
    hum,
  });

  global.actualLogCount++;
  console.log("Actual log count: ", global.actualLogCount);

  newLog.save((err) => {
    // If mongoose is not connected, save in SQLite
    if (err) {
      console.log("-----------ERROR HERE-----------");
      console.log(err.message, "    ", err.name);
      // err.message = getaddrinfo EAI_AGAIN energy-shard-00-01.gs1cq.mongodb.net
      // err.name = MongooseServerSelectionError

      // handle server disconnection error, save to SQLite
      if (err.name === "MongooseServerSelectionError") {
        logToSqlite(loggerID, ts, temp, hum);
        return;
      }
      return;
    }

    // If mongoose is connected, save directly to MongoDB
    else {
      global.savedLogCount++;
      console.log("Saved log count: ", global.savedLogCount);
      console.log(loggerID + "'s log added");
    }
  });
};
