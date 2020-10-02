/*
mqttClient.js

Initialize mqttHandler as a single object
for the whole program
*/

var mqttHandler = include("util/mqtt/mqttHandler");

var mqttClient = new mqttHandler();

module.exports = mqttClient;
