const sensor = require("node-dht-sensor");
const fs = require('fs');

async function getWeatherData() {
  sensor.read(22, 16, function(err, temperature, humidity) {

    let weatherData = {
      temperature: '',
      humidity: '',
      // timeStamp: (new Date(Date.now())).toLocaleString(),
    };
    if (!err) {
      console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
      weatherData['temperature'] = temperature;
      weatherData['humidity'] = humidity;

      fs.writeFile('/home/pi/pi-node/weather.json', JSON.stringify(weatherData), (err)=>{
        if (err){throw err};
        console.log('file made with data ', weatherData)
      });
    
      // console.log('READING WEATHER DATA: ', weatherData)
      // return weatherData
    }
  });
  
}
// getWeatherData()

module.exports = {
  getWeatherData
}