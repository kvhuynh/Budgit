import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import { CardActionArea } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { useEffect, useState } from "react";
import { CreateBudgetPopUp } from "../components/CreateBudgetPopUp"

import { Link, useNavigate } from "react-router-dom";

import { getCurrentUser, logoutUser, getAllBudgets, deleteBudget } from "../services/internalApiService"


interface State {
    budgets: Array<any>
    firstName: string;
    lastName: string;
    totalAccountBalance: number,
    reload: boolean,
};

const initialState = {
    budgets: [],
    firstName: "",
    lastName: "",
    totalAccountBalance: 0,
    reload: false
}

export const Dashboard = () => {

    const [values, setValues] = useState<State>(initialState)
    const navigate = useNavigate();


    useEffect(() => {
        getCurrentUser()
            .then((user: any) => {
                getAllBudgets()
                    .then((budgets: any) => {                        
                        setValues({...values, firstName: user.firstName, budgets: budgets.budgets, totalAccountBalance: budgets.totalBalance})

                    })
                    .catch((err: any) => {
                        console.log(err);
                        
                    })
            })
            .catch((error: any) => {
                navigate("/")
                console.log(error);  
            })
    }, [values.reload])

    const handleReloadOnCreate = () => {
        setValues({...values, reload: !values.reload}) 
    }


    return (
        <>
            <div>
                Welcome {values.firstName}
                <br />
                <CreateBudgetPopUp reload={() => handleReloadOnCreate()} createBudgetItem={false} text={"create budget"}></CreateBudgetPopUp>
                {values.totalAccountBalance}
                
            </div>
            <div>
                <Box 
                    sx={{display: "flex",
                         justifyContent: "space-around",
                         flexWrap: "wrap"
                        }}
                >

                    {values.budgets.map((budget) => {
                        const { name } = budget      
                        return (
                            <div key={ name }>
                                <Card variant="outlined" sx={{width: 200}}>
                                <CardActionArea component={Link} to ={`/budgets/${name}`}>
                                    <CardContent>
                                        <Typography sx={{ fontSize: 25 }} color="text.secondary" gutterBottom>
                                            {budget.name}
                                        </Typography>
                                        <Typography variant="body2">
                                            Limit: ${budget.totalBalance}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                </Card>
                            </div>
                        )
                    })}
                </Box>
            </div>
            {/* <button onClick={() => handleSubmit()}>click me</button> */}
        </>
    )
}

export default Dashboard;