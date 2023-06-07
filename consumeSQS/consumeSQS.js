'use strict';
const { Consumer } = require('sqs-consumer');
// const { Producer } = require('sqs-producer');
const AWS_REGION = 'us-west-2';
const onOff = require('./../onOff/onOff');
const getSoilMoisture = require('./../getSoilMoisture/getSoilMoisture')
const postToServer = require('./../postToServer/postToServer')

async function onOffSQS(time) {
  const AWS_TOGGLEPISTATE_SQS = 'https://sqs.us-west-2.amazonaws.com/919132472542/TogglePiState.fifo';
  
  const app = Consumer.create({
    region: AWS_REGION,
    queueUrl: AWS_TOGGLEPISTATE_SQS,
  
    handleMessage: async (message) => {
      // console.log(message);
      try {
        let delivered = JSON.parse(message.Body);
        console.log('MESSAGE', delivered.Message);
        let stateMessage = JSON.parse(delivered.Message)
        console.log(`STATE, ${stateMessage['state']}`);
  
        if (stateMessage['state'] === 'on'){
          onOff(time)
        }
        else if (stateMessage['state']==='off') {
          try{
            console.log('UPDATING YOUR PLANT WATERING')
            getSoilMoisture()
            .then(()=>postToServer())
            .then((data) => console.log(data))
          }catch(e){
            console.error('AFTER WATERING...', e)
          }
        }
        else {
          console.log('YOUR SYSTEM IS', stateMessage['state'])
          return stateMessage;
        }
      }
      catch (e) {
        console.log('MESSAGE RECEIPT ERROR, ', e);
      }
    }
  })
  
  try{
    app.start();
  }
  catch(e) {
    console.error('SQS ERROR', e)
  }
}

module.exports = onOffSQS
// onOffSQS()
