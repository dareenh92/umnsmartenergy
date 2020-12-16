/*
Router for APIs, match req and resp
*/

// init objects
var express = require("express");
var router = express.Router();

// import functions
const getReports = require("../reports").getReports;
const getReport = require("../reports").getReport;

router.get("/logs", (req, res) => {
  getReports(req, res);
});

router.get("/log", (req, res) => {
  getReport(req, res);
});

module.exports = router;
