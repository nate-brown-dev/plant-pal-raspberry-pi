# SPDX-FileCopyrightText: 2019 Mikey Sklar for Adafruit Industries
#
# SPDX-License-Identifier: MIT
import os
import time
import busio
import digitalio
import board
import adafruit_mcp3xxx.mcp3008 as MCP
from adafruit_mcp3xxx.analog_in import AnalogIn
import sys

last_read = 0       # this keeps track of the last potentiometer value
tolerance = 250     # to keep from being jittery we'll only change
                    # volume when the pot has moved a significant amount
                    # on a 16-bit ADC

def remap_range(value, left_min, left_max, right_min, right_max):
    # this remaps a value from original (left) range to new (right) range
    # Figure out how 'wide' each range is
    left_span = left_max - left_min
    right_span = right_max - right_min

    # Convert the left range into a 0-1 range (int)
    valueScaled = int(value - left_min) / int(left_span)

    # Convert the 0-1 range into a value in the right range.
    return int(right_min + (valueScaled * right_span))

if __name__=="__main__":
  if len(sys.argv)!=2:
     print(f"Usage: {sys.argv[0]} [n_readings]")
     print(f"Reads n_readigs from sensor and returns the average")
     sys.exit(1)
  file_out = "/tmp/current_moisture.txt"
  # create the spi bus
  spi = busio.SPI(clock=board.SCK, MISO=board.MISO, MOSI=board.MOSI)

  # create the cs (chip select)
  cs = digitalio.DigitalInOut(board.D22)

  # create the mcp object
  mcp = MCP.MCP3008(spi, cs)

  # create an analog input channel on pin 0
  chan0 = AnalogIn(mcp, MCP.P0)

  #print('Raw ADC Value: ', chan0.value)
  #print('ADC Voltage: ' + str(chan0.voltage) + 'V')
  readings = []
  for _ in range(int(sys.argv[1])):
      reading = remap_range(chan0.value, 0, 65535, 0, 100)
      #print(f"Current reading: {reading}")
      readings.append(reading)
      time.sleep(1)

  
  average = sum(readings)/len(readings)
  #print(f"Average: {average}")
  #print(f"Saving readings to {file_out}")
  print(average)
