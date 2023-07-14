import axios from "axios";
import { CodeResponse } from "@react-oauth/google";


const http = axios.create({
	baseURL: "http://localhost:8000/api/googleAuth",
	withCredentials: true,
});

export const exchangeToken = async (tokenResponse: CodeResponse) => {	
    console.log("HERE!!")
	const res = await http.post("/exchangeToken", tokenResponse)
	console.log(res);
	
	return res.data
}

