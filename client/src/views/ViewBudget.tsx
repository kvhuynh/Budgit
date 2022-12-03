import Button from '@mui/material/Button';

import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';

import { getOneBudget } from "../services/internalApiService"

interface State {
    name: string
    description: string
    totalValue: number;
}

export const ViewBudget = () => {

    const initialState = {
        name: "",
        description: "",
        totalValue: 0,
    }

    const [budgetDetails, setBudgetDetails] = useState<State>(initialState);
    const { name } = useParams<string>();
    const navigate = useNavigate();


    useEffect(() => {
        getOneBudget(name!)
            .then((currentBudget: any) => {
                setBudgetDetails({...budgetDetails, name: currentBudget.name, description: currentBudget.description})
                
            })
            .catch((error: any) => {
                console.log(error);
                
            })
    }, [])



    const handleNavigate = (location: string) => {
        navigate("/dashboard")
    }

    return (
        <div>
            <Button onClick={() => handleNavigate("dashboard")}>Back to Budgets</Button>
            <div>
                {budgetDetails.name}
                <br />
                {budgetDetails.description}
            </div>
        </div>
    )
}

export default ViewBudget;