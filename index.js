const mqtt = require('mqtt');
const Raspistill = require('node-raspistill').Raspistill;

const camera = new Raspistill({
  noFileSave: true,
  width: 400,
  height: 300,
});

const client = mqtt.connect('mqtt://192.168.0.135', {
  port: 1883,
  clientId: 'camera',
});

client.on('connect', () => {
  client.subscribe('mqtt/camera');
});

client.on('message', (topic, message) => {
  console.log('topic:', topic, 'message:', message.toString());
  camera.takePhoto()
    .then((photoBuffer) => {
      console.log('Picture taken. Publish photoBuffer to \'mqtt/picture-taken\'', photoBuffer);
      client.publish('mqtt/picture-taken', photoBuffer);
    }, error => error);
});
