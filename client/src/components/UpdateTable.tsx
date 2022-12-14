import {
	Button,
	Typography,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	Paper,
	Box,
	FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import {
	updateBudgetItem,
	deleteBudgetItem,
} from "../services/internalApiService";

interface State {
	budgetItemId: number;
	amount: number;
}

export const UpdateTable = (props: any) => {
	const initialState = {
		budgetItemId: -1,
		amount: 0,
	};

	const [updatedItem, setUpdatedItem] = useState<State>(initialState);

	// useEffect(() => {

	// })

	// const handleChange =
	// 	(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
	// 		console.log();

	// 		setUpdatedItem({ ...updatedItem, [prop]: event.target.value });
	// 	};

	const handleChange = (keyName: string, event: any) => {
		setUpdatedItem({ ...updatedItem, [keyName]: event.target.value });
	};

	const handleUpdateItem = () => {
		setUpdatedItem({
			...updatedItem,
			budgetItemId: updatedItem.budgetItemId,
			amount: updatedItem.amount,
		});
		updateBudgetItem(updatedItem)
			.then(() => {
				props.reload();
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	const handleDeleteItem = () => {
		console.log(updatedItem.budgetItemId);

		deleteBudgetItem(updatedItem.budgetItemId)
			.then(() => {
				props.reload();
			})
			.catch((error: any) => {
				console.log(error);
			});
	};

	// const handleChange

	return (
		<>
			<Paper sx={{ padding: 1, paddingLeft: 3, paddingRight: 3 }}>
				<Typography variant="h5" align="right">
					Quick Update
				</Typography>
				<form>
					<div>
						<FormControl
							variant="outlined"
							sx={{ minWidth: 120 }}
						>
							<InputLabel id="item-label">Item</InputLabel>
							<Select
								variant="outlined"
								onChange={(e) => handleChange("budgetItemId", e)}
								labelId="item-label"
								label={"Item"}
							>
								{props.budgetItems.map((item: any, i: number) => {
									return (
										<MenuItem value={item.id} key={i}>
											{item.name}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
					</div>
					<br />
					<div>
						<FormControl sx={{ m: 1, minWidth: 120 }}>
							<TextField
								id="outlined-basic"
								label="Amount change"
								type="number"
								size="small"
								variant="outlined"
								// onChange={handleChange("amount")
								onChange={(e) => handleChange("amount", e)}
							/>
						</FormControl>
					</div>
					<br />
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Button variant="outlined" onClick={handleUpdateItem}>
							Update Quantity
						</Button>
						<Button
							variant="outlined"
							sx={{ color: "#F24F5B", borderColor: "#F24F5B" }}
							onClick={handleDeleteItem}
						>
							<DeleteOutlineIcon /> Delete Item{" "}
						</Button>
					</Box>
				</form>
			</Paper>
		</>
	);
};

export default UpdateTable;
