import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
// import * as Yup from "yup";

import {
	Box,
	Checkbox,
	FormControlLabel,
	IconButton,
	InputAdornment,
	Link,
	Stack,
	TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { loginUser } from "../services/internalApiService";

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
	opacity: 1,
	y: 0,
	transition: {
		duration: 0.6,
		ease: easing,
		delay: 0.16,
	},
};

interface UserState {
	email: string;
	password: string;
    remember: boolean;
}

interface ErrorState {
	emailError: string;
	passwordError: string;
}

const initialErrorState = {
	emailError: "",
	passwordError: "",
};

export const LoginForm = () => {
	const navigate = useNavigate();
	const location = useLocation();
    const [error, setError] = useState<ErrorState>(initialErrorState);
	//   const from = location.state?.from?.pathname || "/";

	const [showPassword, setShowPassword] = useState(false);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
			remember: true,
		},
		onSubmit: (values: UserState) => {
			setTimeout(() => {
                loginUser(values)
                    .then((user: any) => {
						setError(initialErrorState);
						if (user.errors !== undefined) {

							for (let i = 0; i < user.errors.length; i++) {
								const errorKey = user.errors[i].path + "Error";
								setError((error: ErrorState) => ({
									...error,
									[errorKey]: user.errors[i].message,
								}));
								console.log(user.errors[i].message);
							}
						} else {
							navigate("/summary");
						}
                    })
				navigate("/summary");
			}, 2000);
		},
	});

	const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
		formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Box
					component={motion.div}
					animate={{
						transition: {
							staggerChildren: 0.55,
						},
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: 3,
						}}
						component={motion.div}
						initial={{ opacity: 0, y: 40 }}
						animate={animate}
					>
						{error.emailError ? (
							<TextField
								error
								fullWidth
								label="Email address"
								{...getFieldProps("email")}
								helperText={error.emailError}
							/>
						) : (
							<TextField
								fullWidth
								autoComplete="username"
								type="email"
								label="Email address"
								{...getFieldProps("email")}
							/>
						)}

{error.passwordError ? (
							<TextField
								error
								fullWidth
								autoComplete="current-password"
								type={showPassword ? "text" : "password"}
								label="Password"
								{...getFieldProps("password")}
                                helperText={error.passwordError}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												edge="end"
												onClick={() => setShowPassword((prev) => !prev)}
											>
												<Icon
													icon={
														showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
													}
												/>
											</IconButton>
										</InputAdornment>
									),
								}}
								// error={Boolean(touched.password && errors.password)}
								// helperText={touched.password && errors.password}
							/>
						) : (
							<TextField
								fullWidth
								autoComplete="current-password"
								type={showPassword ? "text" : "password"}
								label="Password"
								{...getFieldProps("password")}

								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												edge="end"
												onClick={() => setShowPassword((prev) => !prev)}
											>
												<Icon
													icon={
														showPassword ? "eva:eye-fill" : "eva:eye-off-fill"
													}
												/>
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						)}
					</Box>

					<Box
						component={motion.div}
						initial={{ opacity: 0, y: 20 }}
						animate={animate}
					>
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							sx={{ my: 2 }}
						>
							<FormControlLabel
								control={
									<Checkbox
										{...getFieldProps("remember")}
										checked={values.remember}
									/>
								}
								label="Remember me"
							/>

							<Link
								component={RouterLink}
								variant="subtitle2"
								to="#"
								underline="hover"
							>
								Forgot password?
							</Link>
						</Stack>

						<LoadingButton
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={isSubmitting}
						>
							{isSubmitting ? "loading..." : "Login"}
						</LoadingButton>
					</Box>
				</Box>
			</Form>
		</FormikProvider>
	);
};

export default LoginForm;
