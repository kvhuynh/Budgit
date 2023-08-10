import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import "react-credit-cards-2/dist/es/styles-compiled.css";

import { RootStyle } from "../themes/styles";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import { useNavigate } from "react-router-dom";
import SummaryWidget from "../components/widgets/SummaryWidget";
import TransactionWidget from "../components/widgets/TransactionsWidget";
import { getCurrentUser } from "../services/auth/userApiService";
import { createLinkToken, exchangeTokens } from "../services/plaidApiService";

import {
	getAllIncomeSources,
	getAllTransactions,
} from "../services/incomeSourcesApiService";
import { Grid } from "@mui/material";

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

export const Dashboard = (props: any) => {
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
						<Grid item xs={3}>
					        <SummaryWidget></SummaryWidget>
                            
                        </Grid>
                        <Grid item xs={9}>
                            <TransactionWidget transactions={transactions}></TransactionWidget>
                        </Grid>
					</Grid>
				</Box>
			</RootStyle>
		</>
	);
};

export default Dashboard;
