import { Icon } from "@iconify/react";
import { Stack, Button, IconButton } from "@mui/material";
import {
	CodeResponse,
	GoogleLogin,
	useGoogleLogin,
	useGoogleOneTapLogin,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import { exchangeToken } from "../services/googleApiService";
import { createUser } from "../services/googleApiService";


const SocialAuth = () => {
	const navigate = useNavigate();

	const login = useGoogleLogin({
		onSuccess: (tokenResponse: CodeResponse) => {
      exchangeToken(tokenResponse)
        .then((oAuthData: string) => {
          createUser(oAuthData)
            .then((successStatus: {isSuccess:boolean}) => {
              if (successStatus.isSuccess) {
                navigate("/summary")
              }
          })
        })
        .catch((error: any) => {
          console.log(error);
          
        })
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
					<Icon
						icon="eva:github-fill"
						color="#1C9CEA"
						width={22}
						height={22}
					/>
				</IconButton>
			</Stack>
		</>
	);
};

export default SocialAuth;
