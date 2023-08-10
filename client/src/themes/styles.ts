import styled from "@emotion/styled";
import { Box, BoxProps } from "@mui/material";

/*

------ STYLE FOR BOXES ------

*/
export const RootStyle = styled("div")({
	// background: "linear-gradient(180deg, #c4beee 0%, #0a5cff 100%)",
	// height: "100rem",
	minHeight: "100vh",
	// minWidth: "100vw",
	display: "grid",
	// flexDirection: "row",
	// placeItems: "center",
	// justifyContent: "flex-start",
});

export const HeadingStyle = styled(Box)({
	textAlign: "center",
});

export const commonBoxStyles: any = {
	maxWidth: 480,
	padding: 25,
	margin: "auto",
	display: "flex",
	background: "#fff",
	justifyContent: "center",
	flexDirection: "column",
	borderRadius: 50,
	borderColor: "#000",
};

export const SmallBox = styled(Box)(commonBoxStyles);

export const LargeBox = styled(Box)({
	padding: 25,
	margin: "auto",
	display: "flex",
	background: "#fff",
	justifyContent: "center",
	flexDirection: "column",
	borderRadius: 50,
	borderColor: "#000",
});

/*

------ ANIMATIONS ------

*/

let easing = [0.6, -0.05, 0.01, 0.99];
export const fadeInUp = {
	initial: {
		y: 60,
		opacity: 0,
		transition: { duration: 6.5, ease: easing },
	},
	animate: {
		y: 0,
		opacity: 1,
		transition: {
			duration: 6.5,
			ease: easing,
		},
	},
};