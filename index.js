const mqtt = require('mqtt');
const Raspistill = require('node-raspistill').Raspistill;

const camera = new Raspistill({
  noFileSave: true,
  width: 400,
  height: 300,
});

const client = mqtt.connect('mqtt://192.168.0.135', {
  port: 1883,
  clientId: 'office-camera',
});

client.on('connect', () => {
  client.subscribe('jidoka/office/take-picture');
});

client.on('message', (topic, message) => {
  console.log('topic:', topic, 'message:', message.toString());
  camera.takePhoto()
    .then((photoBuffer) => {
      console.log('Picture taken. Publish photoBuffer to \'jidoka/office/camera\'', photoBuffer);
      client.publish('jidoka/office/camera', photoBuffer, { retain: false });
    }, error => error);
});
