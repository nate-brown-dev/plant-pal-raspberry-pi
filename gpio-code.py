#!/bin/bash

from gpiozero import LED
from time import sleep
import sys
import requests

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(f"Usage: {sys.argv[0]} [time]")
        print("Turns on relay circuit 1 for [time] seconds")
        sys.exit(1)
    led = LED(26)
    try:
        delay = int(sys.argv[1])
        if delay > 5:
            delay=5

        led.on()
        sleep(delay)
        r = requests.post('http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001/state?state=off')

    except Exception as e:
        print(e)
    finally:
        led.off()
