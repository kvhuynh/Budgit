export{}
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";

// import { useState, useEffect } from "react";

// import { createBudget, createBudgetItem } from "../services/internalApiService";

// interface State {
// 	type: string;
// 	name: string;
// 	description: string;
// 	totalBalance: number;
// 	history: string
// 	validationError: string;
// }


// export const CreateBudgetPopUp = (props: any) => {

// 	const initialState = {
// 		type: props.text,
// 		name: "",
// 		description: "",
// 		totalBalance: 0,
// 		history: "",
// 		validationError: "",
// 	};
	
// 	const [open, setOpen] = useState(false);
// 	// const [reload, setReload] = useState(props)

// 	const [budgetValues, setBudgetValues] = useState<State>(initialState);

// 	const handleClickOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleClose = () => {
// 		setOpen(false);
// 		setBudgetValues(initialState);
// 	};

// 	const handleChange =
// 		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
// 			setBudgetValues({ ...budgetValues, [prop]: event.target.value });
// 		};

// 	const handleSubmit = () => {
// 		setOpen(false);
// 		if (!props.createBudgetItem) {
// 			createBudget(budgetValues)
// 				.then((budget: any) => {
// 					props.reload();
// 				})
// 				.catch((error: any) => {
// 					console.log(error);
// 					setBudgetValues({
// 						...budgetValues,
// 						validationError: "Please enter a name for your budget",
// 					});
// 					setOpen(true);
// 				});
// 			setBudgetValues(initialState);
// 		} else {
// 			createBudgetItem(budgetValues, props.budgetId)
// 				.then(() => {
// 					props.reload();
// 					setBudgetValues(initialState)
// 				})
// 				.catch((error: any) => {
// 					setBudgetValues({
// 						...budgetValues,
// 						validationError: "Please enter a name for your budget item",
// 					});
// 					setOpen(true);
// 					console.log(error);
// 				});
// 		}
// 	};

// 	return (
// 		<div>
// 			<Button variant="outlined" onClick={handleClickOpen}>
// 				+ {props.text}
// 			</Button>

// 			<Dialog open={open} onClose={handleClose}>
// 				<DialogTitle>
// 					Create an {props.text}
// 				</DialogTitle>
// 				<DialogContent>
// 					<DialogContentText>
// 						Enter a name and description for your budget
// 						{props.createBudgetItem ? "item" : ""}
// 					</DialogContentText>
// 					<TextField
// 						autoFocus
// 						margin="dense"
// 						id="name"
// 						label="Name"
// 						fullWidth
// 						variant="standard"
// 						onChange={handleChange("name")}
// 					/>
// 					{budgetValues.validationError}

// 					<TextField
// 						autoFocus
// 						margin="dense"
// 						id="totalBalance"
// 						label="Initial amount"
// 						fullWidth
// 						variant="standard"
// 						onChange={handleChange("totalBalance")}
// 					/>

// 					<TextField
// 						autoFocus
// 						margin="dense"
// 						id="name"
// 						label="Description"
// 						fullWidth
// 						variant="standard"
// 						onChange={handleChange("description")}
// 					/>
// 				</DialogContent>
// 				<DialogActions>
// 					<Button onClick={handleClose}>Cancel</Button>
// 					<Button onClick={handleSubmit}>Submit</Button>
// 				</DialogActions>
// 			</Dialog>
// 		</div>
// 	);
// };

// export default CreateBudgetPopUp;
