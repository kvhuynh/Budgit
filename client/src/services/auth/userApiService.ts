import axios from "axios";

const http = axios.create({
	baseURL: "http://localhost:8000/api/users",
	withCredentials: true,
});

// User operations
export const createUser = async (potentialUser: Object) => {

	const res = await http.post("/register", potentialUser);
	
	return res.data;
};

export const loginUser = async (potentialUser: Object) => {
	const res = await http.post("/login", potentialUser);
	
	return res.data;
};

// export const getCurrentUser = async () => {
// 	console.log("getcurrentuser");
	
// 	const res = await http.get("/users/");
// 	return res.data;
// };

// export const getCurrentUser = async (token: any) => {
	
	
// 	const res = await http.post("/", {
// 		headers: {Authorization: localStorage.getItem("token")}

// 	});
// 	console.log(res.data);
	
// 	return res.data;
// };

export const getCurrentUser = async () => {
	
	const res = await http.get("/");
	return res.data;
};



export const logoutUser = async () => {
	// const res = await http.get("/users/logout");
	localStorage.clear();

	// return res.data;
};
