import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { usePlaidLink } from "react-plaid-link";

import { useEffect, useState } from "react";
import { CreateBudgetPopUp } from "../components/CreateBudgetPopUp";
import { TransactionTable } from "../components/TransactionTable";

import { Link, useNavigate } from "react-router-dom";

import { PieChart } from "../components/graphs/PieChart";

import {
	getCurrentUser,
	logoutUser,
	getAllBudgets,
	deleteBudget,
	getAllIncomeSources,
	getAllTransactions
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
	const [totalWorth, setTotalWorth] = useState<number>(0);

	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (publicToken, metadata) => {
			exchangeTokens(publicToken)
				.then((item: any) => {
					console.log(item);
					// setIncomeSources({incomeSources: [...incomeSources, item]})
					setIncomeSources([...incomeSources, item]);
					handleReloadOnCreate();
				})
				.catch((error: any) => {
					console.log(error);
				});
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

						setIncomeSources(incomeSources.incomeSources);
						setTotalWorth(incomeSources.total);
					})
					.catch((error: any) => {
						console.log(error);
					});
				getAllTransactions()
					.then((transactions: any) => {
						console.log("retrieving transactions...")
						console.log(transactions);
						
					})
					.catch((error: any) => {
						console.log(error);
						
					})
			})
			.catch((error: any) => {
				navigate("/");
				console.log(error);
			});
	}, [values.reload]);

	const handleReloadOnCreate = () => {
		setValues({ ...values, reload: !values.reload });
	};

	return (
		<>
			<div>
				Welcome {values.firstName}
				<br />
				<Button onClick={() => open()}>link bank account</Button>
				<br />
				<h1>Total Money from connected Bank Accounts:</h1>
				{incomeSources.length !== 0 ? (
					<PieChart totalWorth={totalWorth} data={incomeSources}></PieChart>
				) : (
					<Box sx={{ display: "flex", justifyContent: "center" }}>
						<CircularProgress />
					</Box>
				)}
				{/* <TransactionTable data={incomeSources}></TransactionTable> */}
				<Box>
					{incomeSources.map((incomeSource: any) => {
						return (
							<div>
								<div>
									{JSON.stringify(incomeSource)}
									<br />
									{incomeSource.map((source: any) => {
										return (
											<div>
												{/* {source.balances.current ? source.balances.current : "no"} */}
												{source.name}:
												{source.balances ? source.balances.current : null}
												{/* {JSON.stringify(source)} */}
											</div>
										);
									})}
									**********************
								</div>
								{/* {totalWorth} */}
							</div>
						);
					})}
				</Box>
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
			</div>
			{/* <button onClick={() => handleSubmit()}>click me</button> */}
		</>
	);
};

export default Dashboard;
