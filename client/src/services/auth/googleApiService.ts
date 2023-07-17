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

export const loginUser = async (test: any) => {
	const res = await http.post("/loginThirdPartyAuth")
}

// export const createUser = async (refreshToken: string): Promise<{isSuccess: boolean, accessToken: object}> => {
	export const createUser = async (refreshToken: string) => {
	
	
    const res = await http.post("/createUser", refreshToken);
    console.log(res);
    return res.data
    
}

