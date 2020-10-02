const sqlite3 = require("sqlite3").verbose();

module.exports.logToSqlite = function (loggerID, ts, temp, hum) {
  // open temporary SQLite database
  let db = new sqlite3.Database("./.sqlitedb/missedlogs.db", (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("SQlite: backup to missedlogs.db");
  });

  // save to SQLite database
  db.serialize(() => {
    db.run(
      "CREATE TABLE IF NOT EXISTS MissedLogs(loggerID TEXT NOT NULL, ts INTEGER NOT NULL, temp REAL NOT NULL, hum REAL NOT NULL, PRIMARY KEY (loggerID, ts))"
    );
    db.run("INSERT INTO MissedLogs VALUES ($id, $ts, $temp, $hum)", {
      $id: loggerID,
      $ts: ts,
      $temp: temp,
      $hum: hum,
    });

    db.all(
      "SELECT ROWID as rowid, loggerId, ts, temp, hum FROM MissedLogs",
      [],
      (err, rows) => {
        if (err) {
          console.log(err.message);
        }
        rows.forEach((row) => {
          console.log(row.rowid, row.loggerID, row.ts, row.temp, row.hum);
        });
      }
    );
  });

  // close the SQLite database
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("SQlite: backup done");
  });
};
