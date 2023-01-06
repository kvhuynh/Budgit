import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { usePlaidLink } from "react-plaid-link";

import { useEffect, useState } from "react";
import { CreateBudgetPopUp } from "../components/CreateBudgetPopUp";

import { Link, useNavigate } from "react-router-dom";

import {
	getCurrentUser,
	logoutUser,
	getAllBudgets,
	deleteBudget,
	getAllIncomeSources,
} from "../services/internalApiService";

import { createLinkToken, exchangeTokens } from "../services/plaidApiService";

interface State {
	budgets: Array<any>;
	firstName: string;
	lastName: string;
	totalAccountBalance: number;
	reload: boolean;
}

const initialState = {
	budgets: [],
	firstName: "",
	lastName: "",
	totalAccountBalance: 0,
	reload: false,
};

export const Dashboard = () => {
	const [values, setValues] = useState<State>(initialState);
	const navigate = useNavigate();
	const [linkToken, setLinkToken] = useState(null);
	// const [incomeSources, setIncomeSources] = useState([]);
	const [incomeSources, setIncomeSources] = useState<any>([]);


	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (publicToken, metadata) => {
			exchangeTokens(publicToken)
				.then((item: any) => {		
					console.log(item);
					// setIncomeSources({incomeSources: [...incomeSources, item]})
					setIncomeSources([...incomeSources, item])
					// handleReloadOnCreate()
				})
				.catch((error: any) => {
					console.log(error);
					
				})
		},
	});

	useEffect(() => {
		getCurrentUser()
			.then((user: any) => {
				getAllBudgets()
					.then((budgets: any) => {
						setValues({
							...values,
							firstName: user.firstName,
							budgets: budgets.budgets,
							totalAccountBalance: budgets.totalBalance,
						});
					})
					.catch((err: any) => {
						console.log(err);
					});
				createLinkToken()
					.then((token: any) => {
						
						setLinkToken(token.link_token);
					})
					.catch((error: any) => {
						console.log(error);
					});

				getAllIncomeSources()
					.then((incomeSources: any) => {
						console.log(incomeSources);
						console.log(values);
						
						setIncomeSources(incomeSources)
						// setIncomeSources({...incomeSources, incomeSources})


					})
					.catch((error: any) => {
						console.log(error);
					});
			})
			.catch((error: any) => {
				navigate("/");
				console.log(error);
			});
	}, [values.reload]);

	const handleReloadOnCreate = () => {
		setValues({ ...values, reload: !values.reload });
		console.log("i got called");
		
	};

	// const { open, ready } = usePlaidLink({
	// 	token: linkToken,
	// 	onSuccess: (publicToken, metadata) => {
	// 		exchangeTokens(publicToken)
	// 			.then(() => {					
	// 				handleReloadOnCreate()
	// 			})
	// 			.catch((error: any) => {
	// 				console.log(error);
					
	// 			})
	// 	},
	// });

	return (
		<>
			<div>
				Welcome {values.firstName}
				<br />
				<CreateBudgetPopUp
					reload={() => handleReloadOnCreate()}
					createBudgetItem={false}
					text={"create budget"}
				></CreateBudgetPopUp>
				{values.totalAccountBalance}
			</div>
			<div>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-around",
						flexWrap: "wrap",
					}}
				>
					{values.budgets.map((budget) => {
						const { name } = budget;
						return (
							<div key={name}>
								<Card variant="outlined" sx={{ width: 200 }}>
									<CardActionArea component={Link} to={`/budgets/${name}`}>
										<CardContent>
											<Typography
												sx={{ fontSize: 25 }}
												color="text.secondary"
												gutterBottom
											>
												{budget.name}
											</Typography>
											<Typography variant="body2">
												Limit: ${budget.totalBalance}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
							</div>
						);
					})}
				</Box>
				{/* <Button onClick={handleLinkBank}>link bank account</Button>
				 */}
				<Button onClick={() => open()}>link bank account</Button>

				<Box>
					{
						incomeSources.map((incomeSource: any) => {
							return (
								<div>

									{JSON.stringify(incomeSource)}
									<br />
									**********************
								</div>
								
								
							)
						})
					}
				</Box>
			</div>
			{/* <button onClick={() => handleSubmit()}>click me</button> */}
		</>
	);
};

export default Dashboard;
