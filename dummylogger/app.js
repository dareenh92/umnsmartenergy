// retrieve environment variables
require("dotenv").config();
let { MQTT_BROKER_ADDR, SERVER_PORT, CONTROL_TOPIC, LOG_TOPIC } = process.env;

var mqtt = require("mqtt");
var client = mqtt.connect("mqtt://" + MQTT_BROKER_ADDR);

var logCount = 0;

// connect to CONTROL_TOPIC
client.on("connect", function () {
  // client.subscribe(CONTROL_TOPIC, { qos: 2 }, function (err) {
  client.subscribe(CONTROL_TOPIC, function (err) {
    console.log("subscribed to topic", CONTROL_TOPIC);
  });
});

client.on("message", function (topic, payload) {
  // message is Buffer
  console.log("from topic:", topic);

  var controlMsg = payload.toString();
  console.log(controlMsg);

  if (controlMsg === "LOG") {
    // the dummy data
    var clientId = "loggerDummy";
    var temperature = round(25 + Math.random(), 1);
    var humidity = round(56 + Math.random(), 1);

    var logMsg = clientId + ":" + temperature + ":" + humidity;
    if (client.connected) {
      logCount++;
      client.publish(LOG_TOPIC, logMsg);
      console.log(logCount, " - logging-> " + logMsg);
    }
  }
});

// generates random float for temperature
const round = (value, precision) => {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
};
// generates random integer between min and max, inclusive
const getRandInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
