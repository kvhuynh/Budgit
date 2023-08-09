import React from "react"
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

import { getCurrentUser, logoutUser } from "../../services/auth/userApiService";

import { createLinkToken, exchangeTokens } from "../../services/plaidApiService";

import styled from "@emotion/styled";
import { motion } from "framer-motion";
import Logo from "../Logo";
import SocialAuth from "../auth/SocialAuth";
import PieChart from "../graphs/PieChart";
import TransactionTable from "../TransactionTable";
import {
	getAllIncomeSources,
	getAllTransactions,
} from "../../services/incomeSourcesApiService";

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
		transition: { duration: 6.5, ease: easing },
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 6.5,
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
export {}

export const SummaryWidget: React.FC = () => {
    const [values, setValues] = useState<UserState>(initialState);
	const navigate = useNavigate();
	const [linkToken, setLinkToken] = useState<string>("");
	const [incomeSources, setIncomeSources] = useState<any>([]);
	const [totalWorth, setTotalWorth] = useState<number>(0);
	const [transactions, setTransactions] = useState<any>([]);
	const [isRetrieved, setIsRetrieved] = useState(false);
	const [reload, setReload] = useState(false);


	const { open } = usePlaidLink({
		token: linkToken,
		onSuccess: (publicToken, metadata) => {
			exchangeTokens(publicToken, Cookies.get("token")!)
				.then((item: any) => {
					setIncomeSources([...incomeSources, item]);
					setReload(!reload);
				})
				.catch((error: any) => {
					console.log(error);
				});
		},
	});

	useEffect(() => {
		getCurrentUser()
			.then((user: UserState) => {
				if (Object.keys(user).length === 0) {
					Cookies.remove("token");
					navigate("/login");
				} else {
					setValues(user);
					createLinkToken()
						.then((token: any) => {
							console.log(token);
							setLinkToken(token.link_token);
						})
						.catch((error: any) => {
							console.log(error);
						});
				}
			})
			.then(() => {
				getAllIncomeSources().then((incomeSources: any) => {
					setIncomeSources(incomeSources.incomeSources);
					setTotalWorth(incomeSources.total);
				});
			})
			.then(() => {
				retrieveTransactions();
			})
			.catch((error) => {
				Cookies.remove("token");
				navigate("/login");
			});
	}, [reload]);

	const retrieveTransactions = () => {
		getAllTransactions()
			.then((transactions: any) => {
				console.log(transactions[0]);
				
				setTransactions(transactions[0]);
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	const handleReloadOnCreate = () => {
		setValues({ ...values, reload: !values.reload });
	};

	const handleOnClick = () => {
		// localStorage.clear();
		Cookies.remove("token");
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
										Total worth : {totalWorth}
										<PieChart
											totalWorth={totalWorth}
											data={incomeSources}
										></PieChart>
									</HeadingStyle>
									<Box component={motion.div} {...fadeInUp}>
										<Stack direction="row" spacing={2}>
											<IconButton
												onClick={() => {
													console.log(linkToken);
													
													open();
												}}
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
									<TransactionTable data={transactions}></TransactionTable>
								</ContentStyle1>
							</Container>
						</Grid>
					</Grid>
				</Box>
			</RootStyle>

		</>
    )
}

export default SummaryWidget;