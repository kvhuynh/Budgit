import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8000/api/incomeSources",
	withCredentials: true,
});

export const getAllIncomeSources = async () => {
	const res = await http.get("/");

	return res.data;
};

export const getAllTransactions = async () => {
	console.log("getting all transactions from internalapiservice");

	const res = await http.get("/transactions");

	return res.data;
};