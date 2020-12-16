var mongoose = require("mongoose");
const { find } = require("../../config/nosql/models/logger");
var Logger = mongoose.model("Logger");

// get all reports
module.exports.getReports = (req, res) => {
  console.log("get logs accessed");

  // get query
  // const { loggerID, startDate, endDate } = req.body;
  const { lid: loggerID, date } = req.query;
  console.log(req.query);

  // construct filter
  let findFilter = loggerID === "ALL" ? {} : { loggerID };
  findFilter.ts = { $gte: new Date(date.after), $lte: new Date(date.before) };
  // console.log(findFilter);

  Logger.find(findFilter)
    .sort({ ts: 1 })
    .exec()
    .then((loggers) => {
      // found/not, send back query result
      // it will be just an empty arry if nothing found
      res.status(200).send(loggers);
    })
    .catch((err) => console.log(err));
};

module.exports.getReport = (req, res) => {
  console.log("get individual log");
  res.status(200).send("individual log accessed");
};
