import {
	Button,
	Typography,
	TextField,
	InputLabel,
	Select,
	MenuItem,
	Paper,
	Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { deleteBudgetItem } from "../services/internalApiService";

interface State {
    budgetId: number,
    budgetItem: Object
}

export const UpdateTable = (props: any) => {

    const initalState = {
        budgetId: -1,
        budgetItem: null
    }

	const [id, setId] = useState(-1);
	const [quantity, setQuantity] = useState("");

    // useEffect(() => {

    // })



	const handleUpdateItem = () => {
		console.log("yo");
        console.log(id);
        
	};

	const handleDeleteItem = () => {
        console.log("wtf");
        
        deleteBudgetItem(id)
            .then(() => {
                props.reload()
                console.log("item deleted successfuly");
                
            })
            .catch((error: any) => {
                console.log("yo");
                
            })
    };

	return (
		<>
			<Paper sx={{ padding: 1, paddingLeft: 3, paddingRight: 3 }}>
				<Typography variant="h5" align="right">
					Quick Update
				</Typography>
				<form>
					<div>
						<TextField
							value={id}
							onChange={(e) => setId(parseInt(e.target.value))}
							select
							label="Label"
						>
							{props.budgetItems.map((item: any, i: number) => {
								return (
									<MenuItem value={item.id} key={i}>
										{item.name}
									</MenuItem>
								);
							})}
						</TextField>
					</div>
					<br />
					<div>
						<TextField
							id="outlined-basic"
							label="Amount change"
							type="number"
							size="small"
							variant="outlined"
						/>
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
