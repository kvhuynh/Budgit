export {}
// import {
// 	Button,
// 	Typography,
// 	TextField,
// 	InputLabel,
// 	Select,
// 	MenuItem,
// 	Paper,
// 	Box,
// 	FormControl,
// } from "@mui/material";
// import { useState, useEffect } from "react";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// import {
// 	updateBudgetItem,
// 	deleteBudgetItem,
// } from "../services/internalApiService";

// interface State {
// 	budgetItemId: number;
// 	amount: number;
// }

// export const UpdateTable = (props: any) => {
// 	const initialState = {
// 		budgetItemId: -1,
// 		amount: 0,
// 	};

// 	const [updatedItem, setUpdatedItem] = useState<State>(initialState);
// 	const [focusedItem, setFocusedItem] = useState<string>("");



// 	useEffect(() => {
// 		try {
			
// 			setFocusedItem(props.budgetItems[props.defaultValue].name)

// 		} catch (error: any) {
// 			console.log(error);
			
// 		}
// 	}, [props])


// 	const handleChange = (keyName: string, event: any) => {

// 		setUpdatedItem({ ...updatedItem, [keyName]: parseInt(event.target.value) });		
// 	};

// 	const handleUpdateItem = () => {
// 		setUpdatedItem({
// 			...updatedItem,
// 			budgetItemId: updatedItem.budgetItemId,
// 			amount: updatedItem.amount,
// 		});
// 		updateBudgetItem(updatedItem)
// 			.then(() => {
// 				props.reload();
// 			})
// 			.catch((error: any) => {
// 				// console.log(error.response.data);
// 				console.log(error);
				
// 			});
// 	};

// 	const handleDeleteItem = () => {
// 		console.log(updatedItem.budgetItemId);

// 		deleteBudgetItem(updatedItem.budgetItemId)
// 			.then(() => {
// 				props.reload();
// 			})
// 			.catch((error: any) => {
// 				console.log(error.response.data);
// 			});
// 	};

// 	// const handleChange
// 	// TODO: add date edit? and date entry
// 	return (
// 		<>
// 			<Paper sx={{ padding: 1, paddingLeft: 3, paddingRight: 3 }}>
// 				<Typography variant="h5" align="right">
// 					Quick Update
// 				</Typography>
// 				<form>
// 					<div>
// 						<FormControl
// 							variant="outlined"
// 							sx={{ minWidth: 120 }}
// 						>
// 							<InputLabel id="item-label">Item</InputLabel>
// 							<Select
// 								variant="outlined"
// 								onChange={(e) => handleChange("budgetItemId", e)}
// 								labelId="item-label"
// 								label={"Item"}
// 								displayEmpty
// 							>
// 								{/* <MenuItem autoFocus={true} >sadfasd</MenuItem> */}
// 								{props.budgetItems.map((item: any, i: number) => {
// 									// let menuItem;
// 									// console.log("defautl value is " + props.defaultValue)
									
// 									// if (props.defaultValue === item.id) {
// 									// 	console.log("i should be clicked")
// 									// 	menuItem = <MenuItem value={item.id} key={i} autoFocus>{item.name}</MenuItem>
// 									// } else {
// 									// 	console.log("not clicked")
// 									// 	menuItem = <MenuItem value={item.id} key={i}>{item.name}</MenuItem>
// 									// }

// 									// console.log(menuItem)
// 									return (
// 										// <div>{menuItem}</div>
// 										<MenuItem value={item.id} key={i}>
// 											{item.name}
// 										</MenuItem>
// 									);
// 								})}
								
// 							</Select>
// 						</FormControl>
// 					</div>
// 					<br />
// 					<div>
// 						<FormControl sx={{ m: 1, minWidth: 120 }}>
// 							<TextField
// 								id="outlined-basic"
// 								label="Amount change"
// 								type="number"
// 								size="small"
// 								variant="outlined"
// 								// onChange={handleChange("amount")
// 								onChange={(e) => handleChange("amount", e)}
// 							/>
// 						</FormControl>
// 					</div>
// 					<br />
// 					<Box
// 						sx={{
// 							display: "flex",
// 							justifyContent: "space-between",
// 							alignItems: "center",
// 						}}
// 					>
// 						<Button variant="outlined" onClick={handleUpdateItem}>
// 							Update Quantity
// 						</Button>
// 						<Button
// 							variant="outlined"
// 							sx={{ color: "#F24F5B", borderColor: "#F24F5B" }}
// 							onClick={handleDeleteItem}
// 						>
// 							<DeleteOutlineIcon /> Delete Item{" "}
// 						</Button>
// 					</Box>
// 				</form>
// 			</Paper>
// 		</>
// 	);
// };

// export default UpdateTable;
