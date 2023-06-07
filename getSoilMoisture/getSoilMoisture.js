const { exec } = require("child_process");

async function getSoilMoisture() {

  exec(`python3 /home/pi/pi-node/soilMoisture/simpleSoilMoisture.py`, (err) => {
    if (err) {
      console.log('ERR', err)
    }
  })
}

module.exports = getSoilMoisture;