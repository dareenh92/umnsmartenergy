/*
Create new schema for the
document(entries) in collection (table) 

n.b.
A Mongoose model is a wrapper on the Mongoose schema.
A Mongoose schema defines the structure of the document, default values, validators, etc.,
whereas a Mongoose model provides an interface to the database
for creating, querying, updating, deleting records, etc.
*/

// init objects
var mongoose = require("mongoose");

/*
Smart farming devices listed here
-sensors & actuators
*/
var loggerSchema = new mongoose.Schema({
  loggerID: String,
  ts: Date,
  temp: Number,
  hum: Number,
});

// Export the schema 'homeDSchema' as model 'HomeD'
module.exports = mongoose.model("Logger", loggerSchema, "home_7");
