var mongoose = require("mongoose");
var Logger = mongoose.model("Logger");
const sqlite3 = require("sqlite3").verbose();
const logToMongo = require("./logHomeD").logToMongo;

module.exports.sqliteRelogToMongo = function () {
  // open temporary SQLite database
  let db = new sqlite3.Database("./.sqlitedb/missedlogs.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("SQlite: recovering from missedlogs.db");
  });

  // save to SQLite database
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS MissedLogs(loggerID TEXT NOT NULL, ts INTEGER NOT NULL, temp REAL NOT NULL, hum REAL NOT NULL, PRIMARY KEY (loggerID, ts))"
    );

    db.all(
      "SELECT ROWID as rowid, loggerId, ts, temp, hum FROM MissedLogs",
      [],
      (err, rows) => {
        if (err) {
          console.log(err.message);
        }
        // for each row, try to push to mongodb
        rows.forEach((row, idx, array) => {
          const { rowid, loggerID, ts, temp, hum } = row;
          console.log(rowid, loggerID, ts, temp, hum);

          var newLog = new Logger({
            loggerID,
            ts,
            temp,
            hum,
          });

          newLog.save((err) => {
            // If mongoose is not connected, keep in SQLite
            if (err) {
              console.log("-----------ERROR HERE-----------");
              console.log(err.message, "    ", err.name);
            }

            // If mongoose is connected, push to MongoDB, remove from SQLite
            else {
              global.savedLogCount++;
              console.log("Saved log count: ", global.savedLogCount);
              console.log(loggerID + "'s log added");
              db.run("DELETE FROM MissedLogs WHERE rowid=?", rowid, (err) => {
                if (err) {
                  console.log(err.message);
                }
                console.log(loggerID + "'s backup removed");

                if (idx === array.length - 1) {
                  // close the SQLite database
                  db.close((err) => {
                    if (err) {
                      console.error(err.message);
                    }
                    console.log("SQlite: done recovering");
                  });
                }
              });
            }
          });
        });
      }
    );
  });

  // close the SQLite database
  // db.close((err) => {
  //   if (err) {
  //     console.error(err.message);
  //   }
  //   console.log("SQlite: done recovering");
  // });
};
