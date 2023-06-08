for dir in onOff readState soilMoisture readPlantStatus weatherData outputDataToFile getSoilMoisture postToServer consumeSQS
do
  scp -r $dir  pi@172.20.10.4:~/pi-node
done

for file in gpio-code.js gpio-code.py package.json index.js
do
  scp -r $file  pi@172.20.10.4:~/pi-node
done