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
	reload: boolean;
	budgetItems: Array<any>;
}

export const ViewBudget = (props: any) => {
	const initialState = {
		id: -1,
		name: "",
		description: "",
		totalBudgetValue: 0,
		sumOfBudgetItems: 0,
		reload: false,
		budgetItems: [],
	};

	const [budgetDetails, setBudgetDetails] = useState<State>(initialState);
	const { name } = useParams<string>();
	const navigate = useNavigate();

	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

	const handlePopoverOpen = (event: any) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

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
						sumOfBudgetItems: budgetItems.sum,
						budgetItems: budgetItems.budgetItems,
					});
				});
			})
			.catch((error: any) => {
				console.log(error);
			});
	}, [budgetDetails.reload]);

	const handleNavigate = (location: string) => {
		navigate(`/${location}`);
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
		console.log("did this get run");

		getAllBudgetItemsByBudget(budgetDetails.id).then((budget: any) => {
			setBudgetDetails({ ...budgetDetails, reload: !budgetDetails.reload });
		});
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
				{budgetDetails.description}
				<DeleteIcon onClick={() => handleDelete(budgetDetails.id)}></DeleteIcon>
			</Typography>
			<Typography variant="h4">
				Remaining Balance: $
				{budgetDetails.totalBudgetValue - budgetDetails.sumOfBudgetItems} /
				Amount allocated: ${budgetDetails.sumOfBudgetItems}
			</Typography>
			<Typography variant="h5">Select an item to edit</Typography>

			<Grid container>
				<Grid xs={6}>
					<CreateBudgetPopUp
						reload={() => handleReloadOnCreate()}
						createBudgetItem={true}
						budgetId={budgetDetails.id}
						text={"income source"}
					></CreateBudgetPopUp>
				</Grid>
				<Grid item xs={6}>
					<CreateBudgetPopUp
						reload={() => handleReloadOnCreate()}
						createBudgetItem={true}
						budgetId={budgetDetails.id}
						text={"budget item"}
					></CreateBudgetPopUp>
					<div>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-around",
								flexWrap: "wrap",
							}}
						>
							{budgetDetails.budgetItems.map((budgetItem) => {
								const { name } = budgetItem;
								console.log(budgetDetails.totalBudgetValue);
								return (
									<div key={name}>
										<Card
											variant="outlined"
											sx={{ width: 200 }}
											aria-owns={open ? "mouse-over-popover" : undefined}
											aria-haspopup="true"
											onMouseEnter={handlePopoverOpen}
											onMouseLeave={handlePopoverClose}
										>
											{/* <CardActionArea component={Link} to ={`/budgets/${name}`}> */}
											<CardActionArea>
												<CardContent>
													<Typography
														sx={{ fontSize: 25 }}
														color="text.secondary"
														gutterBottom
													>
														{budgetItem.name}
													</Typography>
													<Typography variant="body2">
														Current Balance: ${budgetItem.balance}
													</Typography>
												</CardContent>
											</CardActionArea>
										</Card>
										<Popover
											id="mouse-over-popover"
											sx={{
												pointerEvents: "none",
											}}
											open={open}
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
											<Typography sx={{ p: 1 }}>{budgetItem.balance}</Typography>
										</Popover>
									</div>
								);
							})}
						</Box>
					</div>
				</Grid>
				{/* <TransactionTable></TransactionTable> */}
			</Grid>
			<UpdateTable
				budgetItems={budgetDetails.budgetItems}
				reload={() => handleReloadOnCreate()}
			></UpdateTable>
		</>
	);
};

export default ViewBudget;
