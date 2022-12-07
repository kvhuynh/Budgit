import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from 'react-router-dom';

import { getOneBudget, deleteBudget, getAllBudgetItemsByBudget } from "../services/internalApiService"

import { TransactionTable } from "../components/TransactionTable"

import { CreateBudgetPopUp } from "../components/CreateBudgetPopUp"


interface State {
    id: number
    name: string
    description: string
    totalValue: number;
    reload: boolean
    budgetItems: Array<any>
}

export const ViewBudget = (props: any) => {

    const initialState = {
        id: -1,
        name: "",
        description: "",
        totalValue: 0,
        reload: false,
        budgetItems: []
    }

    const [budgetDetails, setBudgetDetails] = useState<State>(initialState);
    const { name } = useParams<string>();
    const navigate = useNavigate();


    useEffect(() => {
        getOneBudget(name!)
            .then((currentBudget: any) => {
                console.log("current balance for this budget is: " + currentBudget.totalBalance);
                
                getAllBudgetItemsByBudget(currentBudget.id)
                    .then((budgetItems: any) => {    
                        setBudgetDetails({...budgetDetails, id: currentBudget.id, name: currentBudget.name, description: currentBudget.description, totalValue: currentBudget.totalBalance, budgetItems: budgetItems})
                        })
            })
            .catch((error: any) => {
                console.log(error); 
            })
    }, [budgetDetails.reload])


    const handleNavigate = (location: string) => {
        navigate(`/${location}`)
    }

    const handleDelete = (budgetId: number) => {
        deleteBudget(budgetId)
            .then(() => {
                handleNavigate("dashboard");
            })
            .catch((error: any) => {
                console.log(error);
                
            })
    }

    const handleReloadOnCreate = () => {
        getAllBudgetItemsByBudget(budgetDetails.id)
            .then((budget: any) => {
                setBudgetDetails({ ...budgetDetails, reload: !budgetDetails.reload })
            })
    }

    return (
        <div>

            <CreateBudgetPopUp reload={() => handleReloadOnCreate()} createBudgetItem={true} budgetId={budgetDetails.id}></CreateBudgetPopUp>

            <Button onClick={() => handleNavigate("dashboard")}>Back to Budgets</Button>
            
            <div>
                {budgetDetails.name}
                <DeleteIcon onClick={() => handleDelete(budgetDetails.id)}></DeleteIcon>

                <br />
                {budgetDetails.description}
            </div>

            <div>
                {budgetDetails.totalValue}
            </div>

            <div>
                <Box 
                    sx={{display: "flex",
                         justifyContent: "space-around",
                         flexWrap: "wrap"
                        }}
                >

                    {budgetDetails.budgetItems.map((budgetItem) => {
                        const { name } = budgetItem
                        console.log(budgetDetails.totalValue);
                        return (
                            <div key={ name }>
                                <Card variant="outlined" sx={{width: 200}}>
                                {/* <CardActionArea component={Link} to ={`/budgets/${name}`}> */}
                                <CardActionArea>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                                            {budgetItem.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            Current Balance: ${budgetItem.balance}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                            </div>
                            
                        )
                    })
                    }
                </Box>
            </div>

        {/* <TransactionTable></TransactionTable> */}
        

        </div>
    )
}

export default ViewBudget;