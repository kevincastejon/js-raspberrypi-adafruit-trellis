import Adafruit_Trellis
import time
import sys
import select
from sys import argv
matrix0 = Adafruit_Trellis.Adafruit_Trellis()
trellis = Adafruit_Trellis.Adafruit_TrellisSet(matrix0)
NUMTRELLIS = 1
_buffer=''
numKeys = NUMTRELLIS * 16
trellis.begin((int(argv[1],16), int(argv[2])))   # only one
while True:
    time.sleep(0.03)
    if select.select([sys.stdin,],[],[],0.0)[0]:
        c =  sys.stdin.read(16)
        for x in range(0, 16):
            if c[x]=="0":
                trellis.clrLED(x)
            elif c[x]=="1":
                trellis.setLED(x)
            # tell the trellis to set the LEDs we requested
            trellis.writeDisplay()
    else:
        if trellis.readSwitches():
            # go through every button
            for i in range(numKeys):
                # if it was pressed...
                if trellis.justPressed(i):
                    sys.stdout.write(format(i,"x")+"1,")
                    sys.stdout.flush()
                if trellis.justReleased(i):
                    sys.stdout.write(format(i,"x")+"0,")
                    sys.stdout.flush()
            # tell the trellis to set the LEDs we requested
            trellis.writeDisplay()
