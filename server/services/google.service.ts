export {};

const { google } = require("googleapis");
const { GoogleAuth } = require("google-auth-library");

const fetch = require("node-fetch");

const oAuth2Client = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	process.env.GOOGLE_REDIRECT_URL
);

const { getSessionId } = require("../utilities/getSessionId.utilities");

const auth = new GoogleAuth();

// const main = async() => {
//     const auth = new GoogleAuth({
//       scopes: 'https://www.googleapis.com/auth/cloud-platform'
//     });
//     const client = await auth.getClient();
//     const projectId = await auth.getProjectId();
//     const url = `https://dns.googleapis.com/dns/v1/projects/${projectId}`;
//     const res = await client.request({ url });
//     console.log(res.data);
//   }

const exchangeToken = async (code: string, res: any) => {
	// try {

	//     const client = await oAuth2Client.getClient();

	//         client.on('tokens', (tokens: any) => {
	//         if (tokens.refresh_token) {
	//             // store the refresh_token in my database!
	//             console.log(tokens.refresh_token);
	//         }
	//         console.log(tokens.access_token);
	//         });
	// } catch (error) {
	//     console.log(error);

	// }
	try {
		const { tokens } = await oAuth2Client.getToken(code);
		oAuth2Client.setCredentials(tokens);
		console.log(tokens);
		const data = await retrieveUserInformation(tokens.access_token);
		console.log(data);
		// const tokenInfo = await oAuth2Client.getTokenInfo(tokens)
		// console.log(tokenInfo);
	} catch (error) {
		console.log(error);
	}
};

const retrieveUserInformation = async (authToken: string): Promise<object> => {
	const url =
		"https://www.googleapis.com/oauth2/v1/userinfo?access_token=" + authToken
	return await(await fetch(url)).json();
};

module.exports = {
	exchangeToken,
};
