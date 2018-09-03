const Raspistill = require('node-raspistill').Raspistill;

const camera = new Raspistill({
  noFileSave: true,
  width: 400,
  height: 300,
});

camera.takePhoto()
  .then((photo) => {
    console.log('Photo taken!', photo);
  }, (error) => {
    console.log('Error', error);
  });
