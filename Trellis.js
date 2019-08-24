const path = require('path');

class Trellis extends require('events') {
  constructor(i2cAddress = 0x70, i2cBus = 1) {
    super();
    this._firstSendDebug=false;
    this._leds = [
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0,
      0, 0, 0, 0
    ];
    this._lastLedString = this._leds.join("");
    this._py = require('child_process').spawn('python', [path.resolve(__dirname ,'Trellis.py'), i2cAddress.toString(16), i2cBus.toString()]);
    this._py.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    this._py.stdout.on('data', (dataBuffer) => {
      var datar = dataBuffer.toString().split(",");
      for (var i = 0; i < datar.length; i++) {
        var data=datar[i];
        if(data=="")break;
        var button = parseInt(data[0], 16);
        var value = parseInt(data[1]);
        if (value == 0) {
          this.emit("released",
            button);
        } else if (value == 1){
          this.emit("pressed",
            button);
        }
      }
    });
    this._timer=setInterval(() => {
      var ledstring=this._leds.join("");
      if(ledstring!=this._lastLedString){
        this._py.stdin.write(ledstring);
        this._lastLedString = ledstring;
      }
    },16);
  }
  setLED(led, value) {
    if (value != 0 && value != 1) throw new Error("value must be 0 or 1")
    if (led < 0 || led > 15) throw new Error("led value is minimum 0 and maximum 15")
    this._leds[led] = value;
  }
  getLED(led) {
    if (led < 0 || led > 15) throw new Error("led value is minimum 0 and maximum 15")
      return (this._leds[led]);
  }
  setBrightness(value) {
    if (value<0) {
      value=0;
    } else if (value>15) {
      value=15;
    }
    this._py.stdin.write('BRIGHTNESSLEVEL'+value.toString(16));
  }
  destructor() {
    clearInterval(this._timer);
    this._py.kill('SIGINT');
  }
}
module.exports=Trellis;
