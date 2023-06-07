const { execSync } = require("child_process")
const fs = require('fs');

async function readPlantStatus(numberOfReadings=10) {
    execSync(`python3 /home/pi/pi-node/soilMoisture/simple_soil_moisture.py ${numberOfReadings} > /home/pi/pi-node/moistureReading`, (err) => {
      if (err) {
        console.log('ERR', err)
      }
    })
}

module.exports = readPlantStatus