import Grid from '@mui/material/Grid'; // Grid version 1
import Login from "../components/Login";
import Register from "../components/Register";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from '../services/internalApiService';

export const LoginRegister = (props: any) => {

    const navigate = useNavigate();

    useEffect(() => {
        getCurrentUser()
            .then((user: any) => {
                console.log("hello from loginregister view");
                
                navigate("/dashboard")
            })
    })
    
    return (
        <>
            <Register />
            <Login />
        </>
    )
}

export default LoginRegister;