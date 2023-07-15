import axios from "axios";
import { CodeResponse } from "@react-oauth/google";


const http = axios.create({
	baseURL: "http://localhost:8000/api/googleAuth",
	withCredentials: true,
});


export const exchangeToken = async (tokenResponse: CodeResponse): Promise<string> => {	
	const res = await http.post("/exchangeToken", tokenResponse)
	
	return res.data
}

export const createUser = async (refreshToken: string): Promise<{isSuccess: boolean}> => {
    const res = await http.post("/createUser", refreshToken);
    console.log(res.data);
    return res.data
    
}

