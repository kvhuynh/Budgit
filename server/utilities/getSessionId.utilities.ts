
export {}

import jwtDecode from "jwt-decode";


interface SessionToken {
    id: number;
    iat: number;
  }

const getSessionId = (userToken: string) => {
    const id = jwtDecode<SessionToken> (userToken);

    const sessionId = id.id;
    return sessionId
}

module.exports = {
    getSessionId
}