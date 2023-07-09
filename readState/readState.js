
const axios = require('axios')

// update all AWS URLs for nate's account
// url=http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001/state
async function readState() {
  const config = {
    url:'http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001/state',
    method: 'get'
  }
  const response = await axios(config)
  console.log(response.data);
  return response.data;
}

// readState()
module.exports = readState;