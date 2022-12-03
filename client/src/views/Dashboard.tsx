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

import { Link } from "react-router-dom";

import { getCurrentUser, logoutUser, getAllBudgets } from "../services/internalApiService"


interface State {
    budgets: Array<any>
    firstName: string;
    lastName: string;
    reload: boolean,
};

const initialState = {
    budgets: [],
    firstName: "",
    lastName: "",
    reload: false
}

export const Dashboard = () => {

    const [values, setValues] = useState<State>(initialState)

    useEffect(() => {
        getCurrentUser()
            .then((user: any) => {
                // setValues({...values, firstName: user.firstName})  
                console.log(values);

                getAllBudgets()
                    .then((budgets: any) => {                        
                        setValues({...values, firstName: user.firstName, budgets: budgets})
                        console.log(values);
                    })
                    .catch((err: any) => {
                        console.log(err);
                        
                    })
            })
            
            .catch((error: any) => {
                console.log(error);  
            })
    }, [values.reload])

    const handleReloadOnCreate = () => {
        setValues({...values, reload: !values.reload}) // do oopposite
        
    }

    return (
        <>
            <div>
                Welcome {values.firstName}
                <br />
                <CreateBudgetPopUp reload={() => handleReloadOnCreate()}></CreateBudgetPopUp>
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
                                            <span>
                                                <EditIcon></EditIcon>
                                                <DeleteIcon></DeleteIcon>
                                            </span>
                                        </Typography>
                                        <Typography variant="body2">
                                            Current Balance: ${budget.totalBalance}
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