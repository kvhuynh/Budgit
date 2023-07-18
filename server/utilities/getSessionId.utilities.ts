export {};

import jwtDecode from "jwt-decode";

interface SessionToken {
	id: number;
	iat: number;
}

const getSessionId = (userToken: string): number => {
	const id = jwtDecode<SessionToken>(userToken);

	const sessionId: number = id.id;
	return sessionId;
};

module.exports = {
	getSessionId,
};
