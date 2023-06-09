require('dotenv');
const listenForSQS = require('./consumeSQS/consumeSQS');

listenForSQS();