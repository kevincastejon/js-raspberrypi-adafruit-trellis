# js-raspberrypi-adafruit-trellis

## Control and monitor leds and switches of Adafruit Trellis from a raspberry pi with nodeJS

This module allows you to control and monitor the leds and switches of Adafruit Trellis from a raspberry pi with nodeJS.
It's use shell to communicate with the [Adafruit python Trellis library](https://github.com/tdicola/Adafruit_Trellis_Python).

You need the following libraries installed on your raspberry pi.
[Adafruit_I2C](https://github.com/adafruit/Adafruit_Python_GPIO)
```
    sudo apt-get update
    sudo apt-get install build-essential python-pip python-dev python-smbus git
    git clone https://github.com/adafruit/Adafruit_Python_GPIO.git
    cd Adafruit_Python_GPIO
    sudo python setup.py install
```

(an updated version of the discontinued Adafruit_Trellis_Python library)
[python-raspberrypi-adafruit-trellis](https://github.com/kevincastejon/python-raspberrypi-adafruit-trellis.git)
```
    sudo apt-get update
    git clone https://github.com/kevincastejon/python-raspberrypi-adafruit-trellis.git
    cd python-raspberrypi-adafruit-trellis
    sudo python setup.py install
```

Then install this module that way:
```
    npm install raspberrypi-adafruit-trellis
```

Usage:
```
    const NodeTrellis = require("./NodeTrellis.js");
    var trellis = new NodeTrellis(trellisAddress,trellisBus); //Default address:0x70 , default bus:1
    trellis.on("pressed", (button) => {
      console.log("Key "+button+" is pressed");
    });
    trellis.on("released", (button) => {
      console.log("Key "+button+" is released");
    });
    trellis.setLED(0, 1);   //turn on first led
    trellis.setLED(15, 0);  //turn off last led

    console.log(trellis.getLED(0)); //return the first led state (1)
    console.log(trellis.getLED(15)); //return the last led state (0)
```

[Github sources](https://github.com/lePioo/NodeTrellis_Raspberry)
