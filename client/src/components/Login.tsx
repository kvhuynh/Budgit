// import { useState, useEffect } from "react";
// import Box from '@mui/material/Box';
// import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import InputLabel from '@mui/material/InputLabel';
// import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';

// import Button from '@mui/material/Button';

// import { loginUser } from "../services/internalApiService";

// import { useNavigate } from "react-router-dom"

// interface State {
//     email: string;
//     password: string;
//     validationError: string;
// };

// const initialState = {
//     email: "kvhuynh820@gmail.com",
//     password: "123456789",
//     validationError: ""

// }


// export const Login = () => {
//     const navigate = useNavigate();

//     const [values, setValues] = useState<State>(initialState);

//     const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         loginUser(values)
//             .then((user) => {
                
//                 navigate(`/summary/`);
//             })
//             .catch((error: any) => {
//                 console.log(error);
//                 setValues({...values, validationError: "Invalid credentials"})
                
//             })

//     }

//     const handleChange =
//     (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
//       setValues({ ...values, [prop]: event.target.value });
      
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//           <Box
//             component="form"
//             sx={{
//               '& .MuiTextField-root': { m: 1, width: '25ch' },
//               display: 'flex',
//               flexDirection: 'column',
//             }}
//             noValidate
//             autoComplete="off"
//           >
//               <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
//                 <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
//                 <Input onChange={ handleChange("email") }  defaultValue="kvhuynh820@gmail.com"/>
//               </FormControl>

    
//               <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
//                 <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
//                 <Input
//                   id="standard-adornment-password"
//                   onChange={ handleChange("password") }
//                   defaultValue="123456789"
//                   endAdornment={
//                     <InputAdornment position="end">
//                       <IconButton

//                       >

//                       </IconButton>
//                     </InputAdornment>
//                   }
//                 />
//               </FormControl>
//               {values.validationError}
//           </Box>
//           <Button variant="outlined" type="submit">Submit</Button>
//         </form>
//       );
// }

// export default Login;

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "../views/LoginForm";
import SocialAuth from "../components/SocialAuth";
import Logo from "../components/Logo";
import { motion } from "framer-motion";

const RootStyle = styled("div")({
	background: "linear-gradient(180deg, #c4beee 0%, #0a5cff 100%)",

  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled("div")({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
  borderRadius: 50
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

export const Login = () => {
  return (
    <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <Logo />
            <Typography sx={{ color: "text.secondary", mb: 5 }}>
              Login to your account
            </Typography>
          </HeadingStyle>

          <Box component={motion.div} {...fadeInUp}>
            <SocialAuth />
          </Box>

          <Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>

          <LoginForm />

          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Don’t have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
              Sign up
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
};

export default Login;