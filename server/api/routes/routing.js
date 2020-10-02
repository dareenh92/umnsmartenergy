/*
Router for APIs, match req and resp
*/

// init objects
var express = require("express");
var router = express.Router();

router.get("/logs", (req, res) => {
  console.log("logs accessed");
  res.status(200).send("logs accessed");
});

module.exports = router;
