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
var deviceSchema = new mongoose.Schema({
  // unique identifier
  id: {
    type: String,
    unique: true,
    required: true,
  },
  // logger values
  log: [
    {
      timestamp: Date,
      temperature: Number,
      humidity: Number,
      occupancy: Boolean,
    },
  ],
});

// Export the schema 'deviceSchema' as model 'Device'
module.exports = mongoose.model("Device", deviceSchema);
