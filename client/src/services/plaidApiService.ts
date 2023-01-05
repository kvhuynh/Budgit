import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8000/api/plaid",
	withCredentials: true,
});

export const createLinkToken = async () => {
    const res = await http.post("/createLinkToken")
	console.log(res);
	return res.data
}

export const exchangeTokens = async (publicToken: string) => {
	console.log(publicToken);
	
	const res = await http.post("/setAccessToken", { publicToken: publicToken })
	// const res = await http.post("/setAccessToken", [publicToken])
	return res.data
}

