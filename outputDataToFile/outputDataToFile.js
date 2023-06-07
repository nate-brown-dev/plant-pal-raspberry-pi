const readPlantStatus = require('../readPlantStatus/readPlantStatus')
const {getWeatherData} = require('../weatherData/weatherdata')
const fs = require('fs').promises;

async function plantData() {

  let plantData = {
      soilMoisture: null,
      weather: {},
      timeStamp: Date.now(),
  }


  await readPlantStatus(4)
  let moisture = await fs.readFile('./moistureReading', 'utf-8')
  console.log('MOISTURE', moisture)
  plantData['soilMoisture']=JSON.parse(moisture);
  // await fs.readFile('./moistureReading', 'utf-8', (err, data) => {
  //       if (err) {
  //         console.error(err);
  //         return;
  //       }
  //       console.log('SOIL DATA', data);
  //       plantData['soilMoisture']=data;
  //       console.log('PLANT DATA', plantData)
  //     })

    await getWeatherData() 
    let weather = await fs.readFile('/home/pi/pi-node/weather.json', 'utf-8')
    console.log('WEATHER, ', weather)
    plantData['weather'] = JSON.parse(weather)

  console.log('FINAL PLANT DATA', plantData)
  return plantData;

}

/*
The function above must be called like below:

// const result = async () => {
//   let data = await plantData()
//   console.log(data)
// }
// result()
*/

module.exports = plantData;