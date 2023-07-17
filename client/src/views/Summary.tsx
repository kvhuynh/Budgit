import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Container, IconButton, Stack } from "@mui/material";
import { Icon } from "@iconify/react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { TypeAnimation } from "react-type-animation";

import Cookies from "js-cookie";
import { usePlaidLink } from "react-plaid-link";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getCurrentUser, logoutUser } from "../services/auth/userApiService";

import { createLinkToken, exchangeTokens } from "../services/plaidApiService";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Logo from "../components/Logo";
import SocialAuth from "../components/auth/SocialAuth";
import PieChart from "../components/graphs/PieChart";
import TransactionTable from "../components/TransactionTable";
import { getAllIncomeSources, getAllTransactions } from "../services/incomeSourcesApiService";

interface UserState {
	budgets: Array<any>;
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	totalAccountBalance: number;
	reload: boolean;
}

const initialState = {
	budgets: [],
	id: 0,
	firstName: "",
	lastName: "",
	email: "",
	totalAccountBalance: 0,
	reload: false,
};

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
	initial: {
		y: 60,
		opacity: 0,
		transition: { duration: 1, ease: easing },
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 1,
			ease: easing,
		},
	},
};

const RootStyle = styled("div")({
	background: "linear-gradient(180deg, #c4beee 0%, #0a5cff 100%)",
	// height: "100rem",
	minHeight: "100vh",
	minWidth: "100vw",
	display: "grid",
	// flexDirection: "row",
	// placeItems: "center",
	// justifyContent: "flex-start",
});

const HeadingStyle = styled(Box)({
	textAlign: "center",
});

const commonBoxStyles: any = {
	maxWidth: 480,
	padding: 25,
	margin: "auto",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	background: "#fff",
	borderRadius: 50,
};

const ContentStyle = styled(Box)(commonBoxStyles);

const ContentStyle1 = styled(Box)({
	width: "90%",
	// height: "40%",
	padding: 25,
	margin: "auto",
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	background: "#fff",
	borderRadius: 50,
	// marginTop: "5%",
});

const ContentStyle2 = styled(Box)();
// {...ContentStyle1}

export const Summary = (props: any) => {
	const [values, setValues] = useState<UserState>(initialState);
	const navigate = useNavigate();
	const [linkToken, setLinkToken] = useState(null);
	const [incomeSources, setIncomeSources] = useState<any>([]);
	const [totalWorth, setTotalWorth] = useState<number>(0);
	const [transactions, setTransactions] = useState<any>([]);
	const [isRetrieved, setIsRetrieved] = useState(false);
	const [reload, setReload] = useState(false);

	const [loggedIn, setLoggedIn] = useState(false);

	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (publicToken, metadata) => {
			exchangeTokens(publicToken, localStorage.getItem("token")!)
				.then((item: any) => {
					setIncomeSources([...incomeSources, item]);
					// handleReloadOnCreate();
					setReload(!reload);
				})
				.catch((error: any) => {
					console.log(error);
				});
		},
	});

	useEffect(() => {
		// const token = localStorage.getItem("token");
		// Cookies.set("token", token!);
		// getCurrentUser(token).then((user: UserState) => {
		// 	if (Object.keys(user).length === 0) {
		// 		localStorage.clear();
		// 	} else {
		// 		setValues(user);
		// 	}
		// });
		console.log("wtf");
		
		getCurrentUser().then((user: UserState) => {
			if (Object.keys(user).length === 0) {
				// localStorage.clear();
				Cookies.remove("token")
			} else {
				console.log(user);
				
				setValues(user);
			}
		})
		.catch ((error) => {
			Cookies.remove("token")
			navigate("/login")
		})
		// createLinkToken()
		// 	.then((token: any) => {
		// 		// console.log("do we get here")

		// 		setLinkToken(token.link_token);
		// 	})
		// 	.catch((error: any) => {
		// 		console.log(error);
		// 	});


		// getAllIncomeSources()
		// 	.then((incomeSources: any) => {
		// 		setIncomeSources(incomeSources.incomeSources);
		// 		setTotalWorth(incomeSources.total);
		// 	})
		// 	.then(() => {
		// 		setIsRetrieved(true);
		// 	})
		// 	.catch((error: any) => {
		// 		console.log(error);
		// 	});

		// retrieveTransactions();

		// getCurrentUser(token)
		// 	.then((data) => {})
		// 	.catch(() => {
		// 		navigate("/login");
		// 	});
	}, []);

	// useEffect(() => {
	// 		retrieveTransactions()
	// 		fetchData()
	// }, [values.reload, isRetrieved]);

	const retrieveTransactions = () => {
		getAllTransactions()
			.then((transactions: any) => {
				setTransactions(transactions[0]);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

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
		// Cookies.remove("summary");
		// setIsRetrieved(false);
	};

	const handleOnClick = () => {
		// localStorage.clear();
		Cookies.remove("token")
		navigate("/login");
	};

	return (
		<>
			<RootStyle>
				<Box sx={{ flexGrow: 1, display: "flex" }}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<ContentStyle1
								boxShadow={3}
								onClick={handleOnClick}
								component={motion.div}
								{...fadeInUp}
							>
								Welcome back {values.firstName}
							</ContentStyle1>
						</Grid>
						<Grid item xs={3}>
							<Container maxWidth="sm">
								<ContentStyle component={motion.div} {...fadeInUp}>
									<HeadingStyle component={motion.div} {...fadeInUp}>
										Total worth
										<PieChart
											totalWorth={totalWorth}
											data={incomeSources}
										></PieChart>
									</HeadingStyle>
									<Box component={motion.div} {...fadeInUp}>
										<Stack direction="row" spacing={2}>
											<IconButton
												onClick={() => open()}
												sx={{
													border: "2px solid #ccc",
													borderRadius: "5px",
													padding: "0.5675rem",
													flex: 1,
												}}
											>
												<Icon icon="mdi:bank" width={22} height={22} /> Connect
												a bank account
											</IconButton>
										</Stack>
									</Box>
								</ContentStyle>
							</Container>
						</Grid>
						<Grid item xs={9}>
							<Container maxWidth="lg">
								<ContentStyle1 component={motion.div} {...fadeInUp}>
									{/* <Button onClick={handleOnClick}>sdfsdf</Button>
									<HeadingStyle component={motion.div} {...fadeInUp}>
										<Logo />
										<Typography sx={{ color: "text.secondary", mb: 5 }}>
											Login to your account
										</Typography>
									</HeadingStyle>
									<Box component={motion.div} {...fadeInUp}>
										<SocialAuth />
									</Box> */}
									{/* <TransactionTable data={transactions}></TransactionTable> */}
									<TransactionTable></TransactionTable>
								</ContentStyle1>
							</Container>
						</Grid>
					</Grid>
				</Box>
			</RootStyle>

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
