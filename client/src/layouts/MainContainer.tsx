
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";


import { Route, Routes, useParams } from "react-router-dom";

import About from "../views/About";
import Budgets from "../views/Budgets";
import Summary from "../views/Summary";
import Drawer from "../components/Drawer"
// import Transactions from "../views/Transactions";
// import ViewBudget from "../views/ViewBudget";
// import ViewBudgetItem from "../views/ViewBudgetItem";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from '../services/auth/userApiService';

import { ThemeProvider } from "@emotion/react";
import Login from "../views/auth/Login";
import Register from "../views/auth/Register";

export const MainContainer = (props: any) => {

    const navigate = useNavigate();

	// useEffect(() => {
	// 	const token = sessionStorage.getItem("token");

	// 	getCurrentUser(token)
	// 		.then(() => {
				
	// 		})
	// 		.catch(() => {
	// 			navigate("/login")
	// 		})
		
	// }, [])

	return (
		<Box sx={{ display: "flex" }}>
			<Box component="main" sx={{ flexGrow: 1 }}>
				<Routes>
					{/* <Route path="/"></Route> */}
					{/* <Route path="/" element={<LoginRegister/>}></Route> */}
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
					<Route path="/summary" element={<Summary />} />
					<Route path="/budgets" element={<Budgets test="test" />}></Route>

				</Routes>
				{/* <Routes>
					<Route path="/" element={<LoginRegister />} />
					<Route path="/summary" element={<Summary />} />
					<Route path="/budgets/:name" element={<ViewBudget />}></Route>
					<Route
						path="/budgets/:name/:budgetItemId"
						element={<ViewBudgetItem />}
					></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/transactions" element={<Transactions />}></Route>
				</Routes> */}
			</Box>
		</Box>
	);
}


export default MainContainer;
