import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { usePlaidLink } from "react-plaid-link";
import Cookies from "js-cookie";

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
	getAllTransactions,
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

export const Summary = (props: any) => {
	const [values, setValues] = useState<State>(initialState);
	const navigate = useNavigate();
	const [linkToken, setLinkToken] = useState(null);
	const [incomeSources, setIncomeSources] = useState<any>([]);
	const [totalWorth, setTotalWorth] = useState<number>(0);
	const [transactions, setTransactions] = useState<any>([]);
	const [isRetrieved, setIsRetrieved] = useState(false);

	const [loggedIn, setLoggedIn] = useState(false);


	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (publicToken, metadata) => {
			exchangeTokens(publicToken)
				.then((item: any) => {
					setIncomeSources([...incomeSources, item]);
					handleReloadOnCreate();
				})
				.catch((error: any) => {
					console.log(error);
				});
		},
	});

	// useEffect(() => {
	// 		retrieveTransactions()
	// 		fetchData()
	// }, [values.reload, isRetrieved]);


	const retrieveTransactions = () => {
		getAllTransactions()
		.then((transactions: any) => {
			setTransactions(transactions[0])
		})
		.catch((error: any) => {
			console.log(error);
		});
	}

	// const fetchData = () => {
	// 	getCurrentUser()
	// 	.then((user: any) => {
	// 		getAllBudgets()
	// 			.then((budgets: any) => {
	// 				setValues({
	// 					...values,
	// 					firstName: user.firstName,
	// 					budgets: budgets.budgets,
	// 					totalAccountBalance: budgets.totalBalance,
	// 				})
	// 			})
	// 			.catch((err: any) => {
	// 				console.log(err);
	// 			});
	// 		createLinkToken()
	// 			.then((token: any) => {
	// 				console.log("do we get here")
	// 				setLinkToken(token.link_token);
	// 			})
	// 			.catch((error: any) => {
	// 				console.log(error);
	// 			});

	// 		getAllIncomeSources()
	// 			.then((incomeSources: any) => {
	// 				setIncomeSources(incomeSources.incomeSources);
	// 				setTotalWorth(incomeSources.total);
					
	// 			})
	// 			.then(() => {
	// 				setIsRetrieved(true);
	// 			})
	// 			.catch((error: any) => {
	// 				console.log(error);
	// 			});
	// 		getAllTransactions()
	// 			.then((transactions: any) => {
	// 				setTransactions(transactions[0])
					
	// 			})
	// 			.catch((error: any) => {
	// 				console.log(error);
	// 			});
	// 	})
	// 	.catch((error: any) => {
	// 		navigate("/");
	// 		console.log(error);
	// 	});
	// }

	const handleReloadOnCreate = () => {
		setValues({ ...values, reload: !values.reload });
		Cookies.remove("summary")
		setIsRetrieved(false)

	};

	const handleOnClick = () => {
		logoutUser().then((user: any) => {
			setLoggedIn(false);
			navigate("/");
		});
	};

	return (
		<>
		<Button onClick={handleOnClick}>sdfsdf</Button>
			{/* <Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<h1>Welcome, {values.firstName}</h1>
				<Button onClick={handleReloadOnCreate}>Refresh Data</Button>
			</Box>
			{/* Flex container */}
			{/* <Box
				sx={{
					display: "flex",
				}}
			> */}
				{/* Left side bar */}
				{/* <Box
					sx={{
						display: "flex",
						flexDirection: "column",
						border: 1,
						borderRadius: 1,
						flex: 1,
					}}
				>
					<Box>
					<h1>Accounts:</h1>
					<Button onClick={() => open()}>link bank account</Button>
					</Box>
					{incomeSources.length !== 0 ? (
						<PieChart totalWorth={totalWorth} data={incomeSources}></PieChart>
					) : (
						<Box sx={{ display: "flex", justifyContent: "center" }}> */}
							{/* <CircularProgress /> */}
							{/* <div>No data found</div>
						</Box>
					)}

					{incomeSources.map((incomeSource: any) => {
						return (
							<div>
								<div>
									<br />
									{incomeSource.map((source: any) => {
										return (
											<div>

												{source.name}:
												{source.balances ? source.balances.current : null}

											</div>
										);
									})}
									**********************
								</div>
							</div>
						);
					})}
				</Box> */}
				{/* Right side */}
				{/* <Box
					sx={{
						display: "flex",
						flexDirection: "column",
						flexWrap: "wrap",
						borderRadius: 1,
						flex: 3,
						ml: 16,
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "space-between",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								border: 1,
								mb: 10,
							}}
						>
							<h1>Budgets</h1>
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
												<CardActionArea
													component={Link}
													to={`/budgets/${name}`}
												>
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
						</Box>
						<Box
							sx={{
								border: 1,
								borderRadius: 1,
								mb: 10,
							}}
						>
							<h1>Transactions</h1>
							<TransactionTable data={transactions}></TransactionTable>
							
						</Box>
						<Box
							sx={{
								border: 1,
								borderRadius: 1,
								mb: 10,
							}}
						>
							<h1>Goals</h1>
						</Box>
					</Box>
				</Box>
			</Box>
			<CreateBudgetPopUp
				reload={() => handleReloadOnCreate()}
				createBudgetItem={false}
				text={"create budget"}
			></CreateBudgetPopUp>
			{values.totalAccountBalance}  */}
		</>
	);
};

export default Summary;
