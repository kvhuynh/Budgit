// import * as Yup from "yup";
import { useState } from "react";
import { useFormik, Form, FormikProvider } from "formik";
import { useNavigate } from "react-router-dom";
import {
	Stack,
	Box,
	TextField,
	IconButton,
	InputAdornment,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

import { createUser } from "../../services/auth/userApiService";
import Cookies from "js-cookie";

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
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

interface ErrorState {
	firstNameError: string;
	lastNameError: string;
	emailError: string;
	passwordError: string;
	confirmPasswordError: string;
}

const initialErrorState = {
	firstNameError: "",
	lastNameError: "",
	emailError: "",
	passwordError: "",
	confirmPasswordError: "",
};

const RegisterForm: React.FC = () => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setConfirmPassword] = useState(false);
	const [error, setError] = useState<ErrorState>(initialErrorState);

	const formik = useFormik({
		initialValues: {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		},

		onSubmit: (values: UserState) => {
			setTimeout(() => {

				createUser(values)
					.then((user: any) => {
						console.log(user.errors);

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
							console.log(user);
							// localStorage.setItem("token", user.accessToken)
							// navigate("/summary");
							Cookies.set("token", user.accessToken);
						    navigate("/summary");
						}
				setSubmitting(false);

					})
					.catch((err: any) => {
						console.log(err);
					});
			}, 1000);
		},
	});

	const validate = (values: UserState) => {
		console.log(values);
	};

	const { errors, touched, handleSubmit, isSubmitting, setSubmitting, getFieldProps } = formik;

	return (
		<FormikProvider value={formik}>
			<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
				<Stack spacing={3}>
					<Stack
						component={motion.div}
						initial={{ opacity: 0, y: 60 }}
						animate={animate}
						direction={{ xs: "column", sm: "row" }}
						spacing={2}
					>
						{error.firstNameError ? (
							<TextField
								error
								fullWidth
								label="First Name"
								// defaultValue=""
								{...getFieldProps("firstName")}
								helperText={error.firstNameError}
								// variant="filled"
							/>
						) : (
							<TextField
								fullWidth
								label="First name"
								{...getFieldProps("firstName")}
								error={Boolean(touched.firstName && errors.firstName)}
								helperText={touched.firstName && errors.firstName}
							/>
						)}

						{error.lastNameError ? (
							<TextField
								error
								fullWidth
								label="Last Name"
								{...getFieldProps("lastName")}
								helperText={error.lastNameError}
							/>
						) : (
							<TextField
								fullWidth
								label="Last name"
								{...getFieldProps("lastName")}
								error={Boolean(touched.lastName && errors.lastName)}
								helperText={touched.lastName && errors.lastName}
							/>
						)}
					</Stack>

					<Stack
						spacing={3}
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
								error={Boolean(touched.email && errors.email)}
								helperText={touched.email && errors.email}
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

						{error.confirmPasswordError ? (
							<TextField
								error
								fullWidth
								autoComplete="current-password"
								type={showPassword ? "text" : "password"}
								label="Password"
								{...getFieldProps("confirmPassword")}
                                helperText={error.confirmPasswordError}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												edge="end"
												onClick={() => setConfirmPassword((prev) => !prev)}
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
						) : (
							<TextField
								fullWidth
								autoComplete="current-password"
								type={showConfirmPassword ? "text" : "password"}
								label="Confirm Password"
								{...getFieldProps("confirmPassword")}
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												edge="end"
												onClick={() => setConfirmPassword((prev) => !prev)}
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
					</Stack>

					<Box
						component={motion.div}
						initial={{ opacity: 0, y: 20 }}
						animate={animate}
					>
						<LoadingButton
							fullWidth
							size="large"
							type="submit"
							variant="contained"
							loading={isSubmitting}
						>
							Sign up
						</LoadingButton>
					</Box>
				</Stack>
			</Form>
		</FormikProvider>
	);
};

export default RegisterForm;
