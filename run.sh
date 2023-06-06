#!/bin/bash
# scp gpio-code.py pi@10.0.0.165:/tmp/gpio-code.py
# ssh pi@10.0.0.165 python3 /tmp/gpio-code.py

# scp gpio-code.js pi@10.0.0.165:~/pi-node/gpio-code.js
# ssh pi@10.0.0.165 node /home/pi/pi-node/gpio-code.js

#scp  pi@10.0.0.165:~/pi-node/onOff
# ssh pi@10.0.0.165 node /home/pi/pi-node/onOff/onOff.js

for dir in onOff readState
do
  scp -r $dir  pi@10.0.0.165:~/pi-node
done

for file in gpio-code.js gpio-code.py 
do
  scp -r $file  pi@10.0.0.165:~/pi-node
done

# ssh pi@10.0.0.165 node /home/pi/pi-node/onOff/onOff.js