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
	// height: "110vh",
	minHeight: "100vh",
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

					{/* <Box component={motion.div} {...fadeInUp}>
						<SocialAuth />
					</Box> */}
					<SocialAuth/>

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
