const AWS = require('aws-sdk/global');
var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const fs = require('fs')
require('dotenv').config()

async function authenticateUser() {
	let user;
	var authenticationData = {
		Username: process.env.USERNAME,
		Password: process.env.PASSWORD
	};
	var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
		authenticationData
	);
	var poolData = {
		UserPoolId: process.env.USER_POOL, // Your user pool id here
		ClientId: process.env.CLIENT_ID // Your client id here
	};
	var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
	var userData = {
		Username: process.env.USERNAME,
		Pool: userPool,
	};
	var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

	cognitoUser.authenticateUser(authenticationDetails, {
		onSuccess: 
		async function (result) {
			var accessToken = result.getAccessToken().getJwtToken();
			// console.log(accessToken)
			user = accessToken
			fs.writeFileSync('./token', accessToken, err=>{if(err){console.error(err)}})

			
			//POTENTIAL: Region needs to be set if not already set previously elsewhere.
			AWS.config.region = process.env.REGION;

			//refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
			await AWS.config.credentials.refresh(error => {
				if (error) {
					console.error(error);
				} else {
					console.log('Successfully logged!');
					// console.log(user)
					return user
				}
			});

		},
		onFailure: 
		function (err) {
			alert(err.message || JSON.stringify(err));
		},
	});
	console.log(user)
	return user
}
authenticateUser()
module.exports = authenticateUser;