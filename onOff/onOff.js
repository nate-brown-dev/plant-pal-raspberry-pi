const readState = require('./../readState/readState')
const { exec } = require("child_process");
// const onOff = require('./../gpio-code.js')

async function turnPiOnOff(time=5) {
  const currentState = await readState();
  // console.log(currentState)

  try{
    if (currentState['state'] === 'on') {
      console.log('YOUR SYSTEM IS ON');
      exec(`python3 /home/pi/pi-node/gpio-code.py ${time}`, (err) => {
        if (err) {
          console.log('ERR', err)
        }
      })
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