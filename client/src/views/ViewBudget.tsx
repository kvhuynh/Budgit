import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import { CardActionArea } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Popover from "@mui/material/Popover";

import ReactECharts from "echarts-for-react";

import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import {
	getOneBudget,
	updateBudget,
	deleteBudget,
	getAllBudgetItemsByBudget,
} from "../services/internalApiService";

import { TransactionTable } from "../components/TransactionTable";

import { CreateBudgetPopUp } from "../components/CreateBudgetPopUp";

import { UpdateTable } from "../components/UpdateTable";

interface State {
	id: number;
	name: string;
	description: string;
	totalBudgetValue: number;
	sumOfBudgetItems: number;
	sumOfIncomeItems: number;
	reload: boolean;
	budgetItems: Array<any>;
	incomeItems: Array<any>;
}

export const ViewBudget = (props: any) => {
	const initialState = {
		id: -1,
		name: "",
		description: "",
		totalBudgetValue: 0,
		sumOfBudgetItems: 0,
		sumOfIncomeItems: 0,
		reload: false,
		budgetItems: [],
		incomeItems: []

	};

	const [budgetDetails, setBudgetDetails] = useState<State>(initialState);

	const [budgetItemIndex, setBudgetItemIndex] = useState(0);

	const [open, setOpen] = useState(null);
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const { name } = useParams<string>();
	const navigate = useNavigate();

	useEffect(() => {
		getOneBudget(name!)
			.then((currentBudget: any) => {
				getAllBudgetItemsByBudget(currentBudget).then((budgetItems: any) => {
					setBudgetDetails({
						...budgetDetails,
						id: currentBudget.id,
						name: currentBudget.name,
						description: currentBudget.description,
						totalBudgetValue: currentBudget.totalBalance,
						sumOfBudgetItems: budgetItems.expenseSum,
						sumOfIncomeItems: budgetItems.incomeSum,
						budgetItems: budgetItems.budgetItems,
						incomeItems: budgetItems.incomeItems
					});
				})
				.catch((error: any) => {
					setBudgetDetails({
						...budgetDetails,
						id: currentBudget.id,
						name: currentBudget.name,
						description: currentBudget.description,
						totalBudgetValue: currentBudget.totalBalance,
					})
					
				});
				
			})
			.catch((error: any) => {
				
				console.log(error);
			});
	}, [budgetDetails.reload]);

	const handleNavigate = (location: string) => {
		navigate(`/${location}`);
	};

	const handleClick = (index: number) => {
		setBudgetItemIndex(index);
		setBudgetDetails({ ...budgetDetails, reload: !budgetDetails.reload });
		console.log(budgetItemIndex);
	};

	const handleDelete = (budgetId: number) => {
		deleteBudget(budgetId)
			.then(() => {
				handleNavigate("dashboard");
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	const handleReloadOnCreate = () => {
		getAllBudgetItemsByBudget(budgetDetails.id).then((budget: any) => {
			setBudgetDetails({ ...budgetDetails, reload: !budgetDetails.reload });
		});
	};

	const handlePopoverOpen = (event: any, id: any) => {
		setAnchorEl(event.currentTarget);
		setOpen(id);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
		setOpen(null);
	};

	const incomeOptions = {
		title: {
			text: 
			`Income: \n$${budgetDetails.sumOfIncomeItems}`,
			left: "center",
			top: "center",
		},
		tooltip: {
			trigger: "item",
			formatter: "{b} : ${c} ({d}%)",
		},

		series: [
			{
				type: "pie",
				data: budgetDetails.incomeItems,
				radius: ["40%", "70%"],
			},
		],
	};

	const expenseOptions = {
		title: {
			text: `Expenses: \n$${budgetDetails.sumOfBudgetItems}`,
			left: "center",
			top: "center",
		},
		tooltip: {
			trigger: "item",
			formatter: "{b} : ${c} ({d}%)",
		},

		series: [
			{
				type: "pie",
				data: budgetDetails.budgetItems,
				radius: ["40%", "70%"],
			},
		],
	};

	return (
		<>
			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
				<Button onClick={() => handleNavigate("dashboard")}>
					Back to Budgets
				</Button>
			</Box>

			<Typography variant="h2">
				{budgetDetails.name}
				<br />
				{budgetDetails.description}
				<DeleteIcon onClick={() => handleDelete(budgetDetails.id)}></DeleteIcon>
			</Typography>
			<Typography variant="h4">
				Ready to Assign: $
				{budgetDetails.totalBudgetValue - budgetDetails.sumOfBudgetItems} /
				Amount allocated: ${budgetDetails.sumOfBudgetItems}
			</Typography>
			<Typography variant="h5">Select an item to edit</Typography>


			<Grid container>
				<Grid xs={6}>
					<ReactECharts option={incomeOptions} />
				</Grid>
				<Grid xs={6}>
					<ReactECharts option={expenseOptions} />
				</Grid>
			</Grid>



			<Grid container>
				<Grid xs={6}>
					<CreateBudgetPopUp
						reload={() => handleReloadOnCreate()}
						createBudgetItem={true}
						budgetId={budgetDetails.id}
						text={"income source"}
					></CreateBudgetPopUp>
										<div>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-around",
								flexWrap: "wrap",
							}}
						>
							{budgetDetails.incomeItems.map((budgetItem, index) => {
								const { id } = budgetItem;
								const { type } = budgetItem;
								let history;
								
								try {
									history = JSON.parse(budgetItem.history);
								} catch (error: any) {
									history = null;
								}
								if (type === "income source") {
									return (
										<div key={id}>
											<Card
												variant="outlined"
												sx={{ width: 200 }}
												aria-owns={open ? "mouse-over-popover" : undefined}
												aria-haspopup="true"
												onMouseEnter={(event: any) =>
													handlePopoverOpen(event, id)
												}
												onMouseLeave={handlePopoverClose}
												onClick={() => handleClick(budgetItem.id)}
											>
												<CardActionArea>
													<Link to={`/budgets/${budgetDetails.name}/${budgetItem.id}`} state={{budgetItem: budgetItem}} style={{ textDecoration: "none" }} >
														<CardContent>
															<Typography
																sx={{ fontSize: 25 }}
																color="text.secondary"
																gutterBottom
															>
																{budgetItem.name}
															</Typography>
															<Typography variant="body2">
																Current Balance: ${budgetItem.value}
															</Typography>
														</CardContent>
													</Link>
												</CardActionArea>
											</Card>
											<Popover
												id={id}
												sx={{
													pointerEvents: "none",
												}}
												open={open === id}
												anchorEl={anchorEl}
												anchorOrigin={{
													vertical: "bottom",
													horizontal: "left",
												}}
												transformOrigin={{
													vertical: "top",
													horizontal: "left",
												}}
												onClose={handlePopoverClose}
												disableRestoreFocus
											>
												{history !== null
													? history.map((dataEntry: any, index: number) => {
															return (
																<Typography sx={{ p: 1 }}>{dataEntry}</Typography>
															);
													  })
													: "no entry data available"}
												{/* <Typography sx={{ p: 1 }}></Typography> */}
											</Popover>
										</div>
									);
								}
							})}
						</Box>
					</div>
				</Grid>
				<Grid item xs={6}>
					<CreateBudgetPopUp
						reload={() => handleReloadOnCreate()}
						createBudgetItem={true}
						budgetId={budgetDetails.id}
						text={"expense"}
					></CreateBudgetPopUp>
					<div>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-around",
								flexWrap: "wrap",
							}}
						>
							{budgetDetails.budgetItems.map((budgetItem, index) => {
								const { id } = budgetItem;
								const { type } = budgetItem;
								let history;

								try {
									history = JSON.parse(budgetItem.history);
								} catch (error: any) {
									history = null;
								}
								if (type === "budget item") {
									return (
										<div key={id}>
											<Card
												variant="outlined"
												sx={{ width: 200 }}
												aria-owns={open ? "mouse-over-popover" : undefined}
												aria-haspopup="true"
												onMouseEnter={(event: any) =>
													handlePopoverOpen(event, id)
												}
												onMouseLeave={handlePopoverClose}
												onClick={() => handleClick(budgetItem.id)}
											>
												{/* <CardActionArea component={Link} to ={`/budgets/${name}`}> */}
												{/* <CardActionArea
													component={Link}
													to={`/budgets/${budgetDetails.name}/${budgetItem.name}`}
												> */}
												<CardActionArea>
													<Link to={`/budgets/${budgetDetails.name}/${budgetItem.id}`} state={{budgetItem: budgetItem}} style={{ textDecoration: "none" }} >
														<CardContent>
															<Typography
																sx={{ fontSize: 25 }}
																color="text.secondary"
																gutterBottom
															>
																{budgetItem.name}
															</Typography>
															<Typography variant="body2">
																Current Balance: ${budgetItem.value}
															</Typography>
														</CardContent>
													</Link>
												</CardActionArea>
											</Card>
											<Popover
												id={id}
												sx={{
													pointerEvents: "none",
												}}
												open={open === id}
												anchorEl={anchorEl}
												anchorOrigin={{
													vertical: "bottom",
													horizontal: "left",
												}}
												transformOrigin={{
													vertical: "top",
													horizontal: "left",
												}}
												onClose={handlePopoverClose}
												disableRestoreFocus
											>
												{history !== null
													? history.map((dataEntry: any, index: number) => {
															return (
																<Typography sx={{ p: 1 }}>{dataEntry}</Typography>
															);
													  })
													: "no entry data available"}
												{/* <Typography sx={{ p: 1 }}></Typography> */}
											</Popover>
										</div>
									);
								}
							})}
						</Box>
					</div>
				</Grid>
				{/* <TransactionTable></TransactionTable> */}
			</Grid>
			<UpdateTable
				defaultValue={budgetItemIndex}
				budgetItems={budgetDetails.budgetItems.concat(budgetDetails.incomeItems)}
				reload={() => handleReloadOnCreate()}
			></UpdateTable>
		</>
	);
};

export default ViewBudget;
