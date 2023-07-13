// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import Button from "@mui/material/Button";

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import { createUser } from "../services/internalApiService";

// interface State {
// 	firstName: string;
// 	lastName: string;
// 	email: string;
// 	password: string;
// 	confirmPassword: string;
// 	showPassword: boolean;
// 	showConfirmPassword: boolean;
// 	firstNameError: string;
// 	lastNameError: string;
// 	emailError: string;
// 	passwordError: string;
// }

// const initialState = {
// 	firstName: "",
// 	lastName: "",
// 	email: "",
// 	password: "",
// 	confirmPassword: "",
// 	showPassword: false,
// 	showConfirmPassword: false,
// 	firstNameError: "",
// 	lastNameError: "",
// 	emailError: "",
// 	passwordError: "",
// };

// const Register = () => {
// 	const [values, setValues] = useState<State>(initialState);
// 	const navigate = useNavigate();

// 	const handleChange =
// 		(prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
// 			setValues({ ...values, [prop]: event.target.value });
// 		};

// 	const handleSetErrors = (errorKey: string, errorMessage: string) => {
// 		setValues((values) => ({
// 			...values,
// 			[errorKey]: errorMessage,
// 		}));
// 	};

// 	const handleClickShowPassword = () => {
// 		setValues({
// 			...values,
// 			showPassword: !values.showPassword,
// 		});
// 	};

// 	const handleClickShowConfirmPassword = () => {
// 		setValues({
// 			...values,
// 			showConfirmPassword: !values.showConfirmPassword,
// 		});
// 	};

// 	const handleMouseDownPassword = (
// 		event: React.MouseEvent<HTMLButtonElement>
// 	) => {
// 		event.preventDefault();
// 	};

// 	const handleSubmit = (event: any) => {
// 		event.preventDefault();
// 		// set all errors to default
// 		// setValues(initialState)
// 		setValues({
// 			...values,
// 			firstNameError: "",
// 			lastNameError: "",
// 			emailError: "",
// 			passwordError: "",
// 		});

// 		createUser(values)
// 			.then((user: any) => {
// 				console.log(user.errors);

// 				if (user.errors !== undefined) {
// 					console.log("what");

// 					for (let i = 0; i < user.errors.length; i++) {
// 						const errorKey = user.errors[i].path + "Error";
// 						handleSetErrors(errorKey, user.errors[i].message);
// 					}
// 				} else {
// 					navigate("/summary");
// 				}
// 			})
// 			.catch((err: any) => {
// 				console.log(err);
// 			});
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<Box
// 				component="form"
// 				sx={{
// 					"& .MuiTextField-root": { m: 1, width: "25ch" },
// 					display: "flex",
// 					flexDirection: "column",
// 				}}
// 				noValidate
// 				autoComplete="off"
// 			>
// 				<FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
// 					<InputLabel htmlFor="standard-adornment-password">
// 						First Name
// 					</InputLabel>
// 					<Input onChange={handleChange("firstName")} />
// 				</FormControl>
// 				{values.firstNameError}

// 				<FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
// 					<InputLabel htmlFor="standard-adornment-password">
// 						Last Name
// 					</InputLabel>
// 					<Input onChange={handleChange("lastName")} />
// 				</FormControl>
// 				{values.lastNameError}

// 				<FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
// 					<InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
// 					<Input onChange={handleChange("email")} />
// 				</FormControl>
// 				{values.emailError}

// 				<FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
// 					<InputLabel htmlFor="standard-adornment-password">
// 						Password
// 					</InputLabel>
// 					<Input
// 						id="standard-adornment-password"
// 						type={values.showPassword ? "text" : "password"}
// 						value={values.password}
// 						onChange={handleChange("password")}
// 						endAdornment={
// 							<InputAdornment position="end">
// 								<IconButton
// 									aria-label="toggle password visibility"
// 									onClick={handleClickShowPassword}
// 									onMouseDown={handleMouseDownPassword}
// 								>
// 									{values.showPassword ? <VisibilityOff /> : <Visibility />}
// 								</IconButton>
// 							</InputAdornment>
// 						}
// 					/>
// 				</FormControl>
// 				{values.passwordError}

// 				<FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
// 					<InputLabel htmlFor="standard-adornment-password">
// 						Confirm Password
// 					</InputLabel>
// 					<Input
// 						id="standard-adornment-password"
// 						type={values.showConfirmPassword ? "text" : "password"}
// 						value={values.confirmPassword}
// 						onChange={handleChange("confirmPassword")}
// 						endAdornment={
// 							<InputAdornment position="end">
// 								<IconButton
// 									aria-label="toggle password visibility"
// 									onClick={handleClickShowConfirmPassword}
// 									onMouseDown={handleMouseDownPassword}
// 								>
// 									{values.showConfirmPassword ? (
// 										<VisibilityOff />
// 									) : (
// 										<Visibility />
// 									)}
// 								</IconButton>
// 							</InputAdornment>
// 						}
// 					/>
// 				</FormControl>
// 			</Box>
// 			<Button variant="outlined" type="submit">
// 				Submit
// 			</Button>
// 		</form>
// 	);
// };

// export default Register;

// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';

// function Copyright(props: any) {
// 	return (
// 	  <Typography variant="body2" color="text.secondary" align="center" {...props}>
// 		{'Copyright © '}
// 		<Link color="inherit" href="https://mui.com/">
// 		  Your Website
// 		</Link>{' '}
// 		{new Date().getFullYear()}
// 		{'.'}
// 	  </Typography>
// 	);
//   }

// export const Register: React.FC = () => {
// 	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
// 	  event.preventDefault();
// 	  const data = new FormData(event.currentTarget);
// 	  console.log({
// 		email: data.get('email'),
// 		password: data.get('password'),
// 	  });
// 	};

// 	return (
// 		<Container component="main" maxWidth="xs">
// 		  <Box
// 			sx={{
// 			  marginTop: 8,
// 			  display: 'flex',
// 			  flexDirection: 'column',
// 			  alignItems: 'center',
// 			}}
// 		  >
// 			<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
// 			  <LockOutlinedIcon />
// 			</Avatar>
// 			<Typography component="h1" variant="h5">
// 			  Register
// 			</Typography>
// 			<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
// 			  <TextField
// 				margin="normal"
// 				required
// 				fullWidth
// 				id="email"
// 				label="Email Address"
// 				name="email"
// 				autoComplete="email"
// 				autoFocus
// 			  />
// 			  <TextField
// 				margin="normal"
// 				required
// 				fullWidth
// 				name="password"
// 				label="Password"
// 				type="password"
// 				id="password"
// 				autoComplete="current-password"
// 			  />
// 			  <FormControlLabel
// 				control={<Checkbox value="remember" color="primary" />}
// 				label="Remember me"
// 			  />
// 			  <Button
// 				type="submit"
// 				fullWidth
// 				variant="contained"
// 				sx={{ mt: 3, mb: 2 }}
// 			  >
// 				Sign In
// 			  </Button>
// 			  <Link href="#" variant="body2" alignSelf={"center"}>
// 					{"Already have an account? Sign In"}
// 				  </Link>
// 			  {/* <Grid container>
// 				  <Link href="#" variant="body2" alignSelf={"center"}>
// 					{"Already have an account? Sign In"}
// 				  </Link>
// 				<Grid item>
// 				  <Link href="#" variant="body2">
// 					{"Already have an account? Sign In"}
// 				  </Link>
// 				</Grid>
// 			  </Grid> */}
// 			</Box>
// 		  </Box>
// 		  <Copyright sx={{ mt: 8, mb: 4 }} />
// 		</Container>
// 	);
//   }

//   export default Register;

import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider } from "@mui/material";
import styled from "@emotion/styled";

import SocialAuth from "../components/SocialAuth";
import RegisterForm from "../views/RegisterForm";
import Logo from "../components/Logo";
import { motion } from "framer-motion";

//////////////////////////////////
const RootStyle = styled("div")({
	background: "linear-gradient(180deg, #c4beee 0%, #0a5cff 100%)",
	height: "110vh",
	padding: 20,
	display: "grid",
	placeItems: "center",
	
});

const HeadingStyle = styled(Box)({
	textAlign: "center",
});

const ContentStyle = styled(Box)({
	maxWidth: 480,
	padding: 25,
	margin: "auto",
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	background: "#fff",
	borderRadius: 50,
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
	initial: {
		y: 40,
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

export const Register = () => {
	return (
		<RootStyle>
			<Container maxWidth="sm">
				<ContentStyle>
					<HeadingStyle component={motion.div} {...fadeInUp}>
						<Logo />

						<Typography sx={{ color: "text.secondary", mb: 5 }}>
							Enter your details below.
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

					<RegisterForm />

					<Typography
						component={motion.p}
						{...fadeInUp}
						variant="body2"
						align="center"
						sx={{ color: "text.secondary", mt: 2 }}
					>
						By registering, I agree to{" "}
						<Link underline="always" color="text.primary" href="#">
							Terms of Service
						</Link>{" "}
						&{" "}
						<Link underline="always" color="text.primary" href="#">
							Privacy Policy
						</Link>
						.
					</Typography>

					<Typography
						component={motion.p}
						{...fadeInUp}
						variant="body2"
						align="center"
						sx={{ mt: 3 }}
					>
						Have an account?{" "}
						<Link variant="subtitle2" component={RouterLink} to="/login">
							Login
						</Link>
					</Typography>
				</ContentStyle>
			</Container>
		</RootStyle>
	);
};

export default Register;
