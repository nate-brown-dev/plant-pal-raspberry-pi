const { exec } = require("child_process");

async function getSoilMoisture(numberOfReadings=5) {

  console.log('getting soil moisture')
  exec(`python3 /home/pi/pi-node/soilMoisture/simpleSoilMoisture.py ${numberOfReadings}`, (err) => {
    if (err) {
      console.log('ERR', err)
    }
  })
}

// getSoilMoisture()
module.exports = getSoilMoisture;