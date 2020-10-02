/*
Template file for wifiMqttConst.h
wifiMqttConst.h contains sensitive information such as wifi password
Please include 'wifiMqttConst.h' into the .gitignore file
Please copy the section 'Wifi details' and 'MQTT details'
*/
// Wifi details
const char* ssid = "";      // your AP name
const char* password = "";  // the AP password

// MQTT details
const char* mqttServer = "";  // fixed
const int mqttPort = 1883;    // non-secure
char* mqttClientID = "";      // the logger ID
char* controlChnl = "";       // mqtt topic for control msg
char* logChnl = "";           // mqtt topic for logging msg