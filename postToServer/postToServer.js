const outputDataToFile = require('./../outputDataToFile/outputDataToFile');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios')

async function postToServer(name='plant') {
  let plantData = await outputDataToFile();
  console.log(plantData);
  plantData['id'] = uuidv4();
  plantData['plantId']=name+plantData['id'].slice(0,5)
  console.log('DATA TO BE POSTED', plantData);

  let config = {
    method: 'post',
    url:'http://ec2-18-236-102-112.us-west-2.compute.amazonaws.com:3001/status',
    data: plantData
  }

  try{
    let result = await axios(config);
    console.log(result.data);
    return result.data;
  }
  catch(e) {
    console.error(e)
  }

}

postToServer()
// module.exports = postToServer;