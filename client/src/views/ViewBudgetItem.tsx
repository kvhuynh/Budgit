export {}

// import Button from "@mui/material/Button";
// import DeleteIcon from "@mui/icons-material/Delete";
// import Box from "@mui/material/Box";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
// import { CardActionArea } from "@mui/material";
// import CardContent from "@mui/material/CardContent";
// import Typography from "@mui/material/Typography";
// import Grid from "@mui/material/Grid";
// import Popover from "@mui/material/Popover";

// import ReactECharts from "echarts-for-react";

// import { useState, useEffect } from "react";
// import { useNavigate, useParams, useLocation, Link } from "react-router-dom";

// import {
// 	getOneBudget,
// 	updateBudget,
// 	deleteBudget,
// 	getAllBudgetItemsByBudget,
//     getOneBudgetItem
// } from "../services/internalApiService";

// import { TransactionTable } from "../components/TransactionTable";

// import { CreateBudgetPopUp } from "../components/CreateBudgetPopUp";

// import { UpdateTable } from "../components/UpdateTable";
// import { textSpanIntersectsWith } from "typescript";


// export const ViewBudgetItem = (props: any) => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { name } = useParams<string>();
//     let { budgetItem } = location.state || {}
//     const [budgetItemNew, setBudgetItemNew] = useState(budgetItem)

//     useEffect(() => {
//         console.log(budgetItemNew);
        
//     })

//     return (
//         <>
//             {budgetItem === undefined ? navigate(`/budgets/${name}`) : 
//             <>
//             			<Box sx={{ display: "flex", justifyContent: "space-between" }}>
// 				<Button onClick={() => navigate(`/budgets/${name}`)}>
// 					Back to {name}
// 				</Button>
// 			</Box>
//             <Typography variant="h2">
// 				{budgetItemNew.name}
// 				<DeleteIcon></DeleteIcon>
// 			</Typography>
// 			<Typography variant="h4">
// 				Amount allocated: ${budgetItemNew.value}
// 			</Typography>
//             <Typography variant="h4">
// 				History: {budgetItemNew.history}
// 			</Typography>
//             </>
//             }

//         </>
//     )
// }

// export default ViewBudgetItem;