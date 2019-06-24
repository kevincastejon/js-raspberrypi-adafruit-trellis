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
    const Trellis = require('raspberrypi-adafruit-trellis');
    const trellisAddress = 0x70;
    const trellisBus = 1;
    var trellis = new Trellis(trellisAddress,trellisBus); //Default address:0x70 , default bus:1
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
```

[Github sources](https://github.com/kevincastejon/js-raspberrypi-adafruit-trellis)
