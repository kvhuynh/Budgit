import { useEffect } from "react"

import { Icon } from "@iconify/react";
import { IconButton, Stack } from "@mui/material";
import {
	CodeResponse,
	useGoogleLogin
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { getCurrentUser } from "../services/internalApiService"
import { createUser, exchangeToken, loginUser } from "../services/googleApiService";

const SocialAuth = () => {
	const navigate = useNavigate();

	// useEffect(() => {
	// 	const session:string = localStorage.getItem("token")!
	// 	if (!session) {
	// 		navigate("/login")
	// 	}
	// 	getCurrentUser(session)
	// 		.then(() => {

	// 		})
	// }, [])

	const login = useGoogleLogin({
		onSuccess: (tokenResponse: CodeResponse) => {
			
			exchangeToken(tokenResponse)
				.then((oAuthData: string) => {
					// add a case where the user already has an account
					createUser(oAuthData).then(
						(successStatus: { isSuccess: boolean; accessToken: string }) => {
							if (successStatus.isSuccess) {
								localStorage.setItem("token", successStatus.accessToken)
								navigate("/summary");
							} else {
								// account already is in database
								loginUser(successStatus.accessToken)
									.then(() => {
										// console.log(successStatus.accessToken);
										
										navigate("/summary")
										localStorage.setItem("token", successStatus.accessToken)
									})
							}
						}
					);
				})
				.catch((error: any) => {
					console.log(error);
				});
		},
		onError: (error: any) => console.log(error),
		flow: "auth-code",
	});

	return (
		<>
			<Stack direction="row" spacing={2}>
				<IconButton
					onClick={() => login()}
					sx={{
						border: "2px solid #ccc",
						borderRadius: "5px",
						padding: "0.5675rem",
						flex: 1,
					}}
				>
					<Icon icon="eva:google-fill" color="#DF3E30" width={22} height={22} />
				</IconButton>
				<IconButton
					sx={{
						border: "2px solid #ccc",
						borderRadius: "5px",
						padding: "0.5675rem",
						flex: 1,
					}}
				>
					<Icon
						icon="eva:facebook-fill"
						color="#1877F2"
						width={22}
						height={22}
					/>
				</IconButton>
				<IconButton
					sx={{
						border: "2px solid #ccc",
						borderRadius: "5px",
						padding: "0.5675rem",
						flex: 1,
					}}
				>
					<Icon icon="eva:github-fill" color="#1C9CEA" width={22} height={22} />
				</IconButton>
			</Stack>
		</>
	);
};

export default SocialAuth;
