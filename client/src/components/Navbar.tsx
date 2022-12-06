import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { useState, useEffect } from "react";

import { getCurrentUser, logoutUser } from "../services/internalApiService";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		getCurrentUser()
			.then((user: Object) => {
				if (user !== null) {
					setLoggedIn(true);
				}
			})
			.catch((error: any) => {
				console.log(error);
			});
	});

	const handleOnClick = () => {
		logoutUser().then((user: any) => {
			setLoggedIn(false);
			navigate("/");
		});
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" style={{ background: "#2E3B55" }}>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex" },
							fontFamily: "sans-serif",
							fontWeight: 1000,
							letterSpacing: ".3rem",
						}}
					>
						Budgit
					</Typography>
					{loggedIn ? (
						<Button
							color="inherit"
							variant="outlined"
							onClick={() => handleOnClick()}
						>
							Logout
						</Button>
					) : (
						<Button color="inherit">Login</Button>
					)}
					{/* <Button color="inherit">Login</Button> */}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
