/*
API calls for data logging - uses MQTT
*/
var mongoose = require("mongoose");
var Device = mongoose.model("Device");

module.exports.log = function (mqttPayload) {
  var [deviceId, temperature, humidity] = mqttPayload.split(":");
  console.log({ deviceId });
  console.log({ temperature });
  console.log({ humidity });

  Device.findOne({ id: deviceId })
    .exec()
    .then((device) => {
      // device does not exist, register - not secure
      if (!device) {
        var device = new Device();

        device.id = deviceId;

        console.log(deviceId + " registered");
      }

      // and push the new log
      var newLog = {
        timestamp: new Date(),
        temperature: temperature,
        humidity: humidity,
        occupancy: false,
      };
      device.log.push(newLog);
      device.save((err) => {
        console.log(deviceId + "'s log added");
      });
    })
    .catch((err) => console.log(err));
};
