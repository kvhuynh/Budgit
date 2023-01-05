const {
	createLinkToken,
	setAccessToken,
} = require("../services/plaid.service");

const handleGetInfo = async (req: any, res: any) => {
	try {
	} catch (error: any) {
		return res.status(400).json(error);
	}
};

const handleCreateLinkToken = async (req: any, res: any) => {
	try {
		const linkToken = await createLinkToken();

		// console.log(linkToken);

		return linkToken
	} catch (error: any) {
		console.log(error);

		return res.status(400).json(error);
	}
};

const handleSetAccessToken = async (req: any, res: any) => {
    try {

        const accessToken = setAccessToken(req.body, req.cookies.usertoken)
        
    } catch (error: any) {
        console.log(error);
        
    }
};

module.exports = {
	handleCreateLinkToken,
    handleSetAccessToken
};
