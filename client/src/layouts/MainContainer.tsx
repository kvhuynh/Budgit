
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import { Route, Routes } from "react-router-dom";
import { LoginRegister } from "../views/LoginRegister";

import About from "../views/About";
import Budgets from "../views/Budgets";
import Summary from "../views/Summary";
import Transactions from "../views/Transactions";
import ViewBudget from "../views/ViewBudget";
import ViewBudgetItem from "../views/ViewBudgetItem";


import { ThemeProvider } from "@emotion/react";
import Login from "../components/Login";
import Register from "../components/Register";

export const MainContainer = (props: any) => {

	return (
		<Box sx={{ display: "flex" }}>
			<Box component="main" sx={{ flexGrow: 1 }}>
				<Routes>
					{/* <Route path="/"></Route> */}
					{/* <Route path="/" element={<LoginRegister/>}></Route> */}
					<Route path="/login" element={<Login />}></Route>
					<Route path="/register" element={<Register />}></Route>
				</Routes>
				{/* <Routes>
					<Route path="/" element={<LoginRegister />} />
					<Route path="/summary" element={<Summary />} />
					<Route path="/budgets" element={<Budgets test="test" />}></Route>
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
