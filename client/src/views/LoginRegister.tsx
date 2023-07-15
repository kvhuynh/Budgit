
// import Login from "../components/Login";
// import Register from "../components/Register";

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { getCurrentUser } from '../services/internalApiService';

// export const LoginRegister = (props: any) => {

//     const navigate = useNavigate();

//     useEffect(() => {
//         getCurrentUser()
//             .then((user: any) => {
//                 navigate("/summary")
//             })
//     })
    
//     return (
//         <>
//             <Register />
//             <Login />
//         </>
//     )
// }

// export default LoginRegister;


import Login from "../components/Login";
import Register from "../components/Register";

import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from '../services/internalApiService';

export const LoginRegister = (props: any) => {

    const navigate = useNavigate();

    useEffect(() => {
        console.log("fasdfasdfsadf")
        getCurrentUser()
            .then((user: any) => {
                navigate("/summary")
            })
    })
    
    return (
        <Routes>
            {/* <Route path="/"></Route> */}
            {/* <Route path="/" element={<LoginRegister/>}></Route> */}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
        </Routes>
    )
}

export default LoginRegister;

