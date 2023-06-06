

// url=http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001/state
async function readState() {
  const config = {
    method: 'GET'
  }
  const response = await fetch('http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001/state', config);

  const result = await response.json()
  console.log(result);
  return result;
}

// readState()
module.exports = readState;