const path = require('path');
const Trellis = require(path.resolve(__dirname, 'Trellis'));
const trellisAddress = 0x70;
const trellisBus = 1;
const trellis = new Trellis(trellisAddress,trellisBus); //Default address:0x70 , default bus:1
trellis.on("pressed", (buttonID) => {
  console.log("Key "+buttonID+" is pressed");
  if (trellis.getLED(buttonID)){
    trellis.setLED(buttonID, 0);
  } else {
    trellis.setLED(buttonID, 1);
  }
});
trellis.on("released", (buttonID) => {
  console.log("Key "+buttonID+" is released");
});
