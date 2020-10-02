/*
Connect to an MQTT message broker & specific channel
- publish format is specific for Smart Irrigation System
*/
const mqtt = require("mqtt");

class mqttHandler {
  constructor() {}

  // initialize connection and subscribe immediately
  // must specify the default topic for pub & sub
  // currently can send to multiple topic
  // but can only subscribe & specify handler to single topic
  init(server, topic, handler) {
    this.server = server;
    this.topic = topic;
    this.handler = handler;

    this.mqttClient = mqtt.connect("mqtt://" + this.server);

    // mqtt error calback
    this.mqttClient.on("error", (err) => {
      console.log(err);
      this.mqttClient.end();
    });

    // connection callback
    this.mqttClient.on("connect", () => {
      this.mqttClient.subscribe(topic);
      console.log("mqtt client connected ");
    });

    this.mqttClient.on("close", () => {
      console.log("mqtt client disconnected");
    });

    // message callback - hardcoded for logging
    this.mqttClient.on("message", (topic, message) => {
      this.handler(topic, message);
    });
  }

  connected() {
    return this.mqttClient.connected;
  }

  send(message, topic = this.topic) {
    if (this.mqttClient.connected) {
      this.mqttClient.publish(topic, message);
      console.log("publishing on topic:" + topic + "-> " + message);
    }
  }

  // mqttPublish(command, data) {
  //   // actual publishing act
  //   mqttClient.publish(
  //     this.topic,
  //     JSON.stringify({ command: command, content: data }),
  //     { qos: 2 }
  //   );
  // }
}

module.exports = mqttHandler;
