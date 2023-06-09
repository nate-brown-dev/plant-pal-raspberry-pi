const readState = require('./../readState/readState')
const { exec } = require("child_process");
const authenticateUser = require('./../authenticateUser/authenticateUser');
const axios = require('axios')
require('dotenv').config()
const fs = require('fs')

function runPythonCode(time){
  return new Promise(resolve => {
    exec(`python3 /home/pi/pi-node/gpio-code.py ${time}`, null, function (err,result) {
      if (err) throw err;
      console.log(result);
      resolve();
    })
  })
}

async function axiosPost(user) {
  let request = axios.create({
    headers: {
      Authorization : `Bearer ${user}`
      }
    })
    try{
      let result = await request.post(`http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001/state?state=off`);
      console.log(result.status);
      return result.status
    }catch(e){
      console.error(e)
    }
}
// postStatus()

async function turnPiOnOff(time=5) {
  const currentState = await readState();
  await authenticateUser();
  // console.log('ON OFF USER', user)

  try{
    if (currentState['state'] === 'on') {
      await runPythonCode(time);
      console.log('YOUR SYSTEM IS DONE WATERING')
      const user = fs.readFileSync('/home/pi/pi-node/token', 'utf8',err => {
  if (err) {
    console.error(err);
  }})
      console.log(user)
      await axiosPost(user)
      fs.unlinkSync('/home/pi/pi-node/token');
      
    } else {
      let message = 'Your system is off';
      console.log(message)
      return message
    }
  }catch(e) {
    console.error('TURN PI ON OFF ERROR', e)
  }
}

module.exports = turnPiOnOff;
// turnPiOnOff(3);