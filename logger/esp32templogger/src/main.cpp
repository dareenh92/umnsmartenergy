#include <Arduino.h>
#include <SPI.h>
#include <WiFi.h>
#include <Wire.h>

#include "PubSubClient.h"
#include "dht.h"
#include "wifiMqttConst.h"

#define DHTTYPE DHT22

//**************************************
// DHT sensor
#define DHTPin 4
dht dht;

WiFiClient espClient;
PubSubClient mqttClient(espClient);

//**************************************
// Functions
void logTemperature();
void wifiConnect();
void mqttSetup();
void mqttPublish(char* chnlName, char* message);
bool mqttReconnect();
void mqttKeepAlive();
void mqttHandler(char* topic, byte* payload, unsigned int length);

//**************************************
// Constants
long mqttLastReconnectAttempt = 0;

//**************************************
// Main program
void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(100);

  // WiFi & MQTT
  wifiConnect();
  mqttSetup();
  delay(100);

  Serial.println("Data logger started");
}

void loop() { mqttKeepAlive(); }

// ********************************
// Logging function
void logTemperature() {
  // read temperature and humidity from DHT22
  dht.read22(DHTPin);
  float temperature = dht.temperature;
  float humidity = dht.humidity;

  // print log to serial
  String logMessage =
      String(mqttClientID) + ":" + String(temperature) + ":" + String(humidity);
  Serial.println(logMessage);

  // publish log to mqtt
  char mqttMessage[20];
  logMessage.toCharArray(mqttMessage, 20);
  mqttPublish(logChnl, mqttMessage);
}

// ********************************
// WiFi Setup
void wifiConnect() {
  // Wi-Fi preparation
  WiFi.disconnect(true);
  WiFi.mode(WIFI_STA);

  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  // Attempt WiFi connection & wait
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.print("Connected as ");
  Serial.println(WiFi.localIP());
}

// Setup MQTT connection
void mqttSetup() {
  mqttClient.setServer(mqttServer, mqttPort);
  mqttClient.setCallback(mqttHandler);
}

// Publish message to selected topic
void mqttPublish(char* chnlName, char* message) {
  if (mqttClient.connected()) {  // Connected.
    Serial.print("MQTT publish");
    mqttClient.publish(chnlName, message);
  }
}

// Connect (and re-) to MQTT, subscribe immediately
bool mqttReconnect() {
  if (mqttClient.connect(mqttClientID)) {
    mqttClient.subscribe(controlChnl);
  }
  return mqttClient.connected();
}

// Keeping connection to MQTT server alive
void mqttKeepAlive() {
  // Attempt to reconnect after 5s of disconnection
  if (!mqttClient.connected()) {
    long now = millis();
    if (now - mqttLastReconnectAttempt > 5000) {
      mqttLastReconnectAttempt = now;
      if (mqttReconnect()) {
        mqttLastReconnectAttempt = 0;
      }
    }
  }
  // Use loop() periodically to keep mqtt conn. alive
  else {
    mqttClient.loop();
  }
}

// Handle MQTT subscribe message
void mqttHandler(char* topic, byte* payload, unsigned int length) {
  // converts received bytes into string data type
  String payloadBuff;
  for (int i = 0; i < length; i++) {
    payloadBuff = payloadBuff + String((char)payload[i]);
  }

  // Do something based on messages
  Serial.println(payloadBuff);

  if (payloadBuff == "LOG") {
    logTemperature();
  }
}