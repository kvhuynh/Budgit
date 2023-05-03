import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8000/api/plaid",
	withCredentials: true,
});

export const createLinkToken = async () => {

    const res = await http.post("/createLinkToken")
	return res.data
}

export const exchangeTokens = async (publicToken: string) => {	
	const res = await http.post("/setAccessToken", { publicToken: publicToken })
	console.log(res);
	
	return res.data
}

