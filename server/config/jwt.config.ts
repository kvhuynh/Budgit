const jwt = require("jsonwebtoken");

import { Request, Response } from "express";

module.exports.authenticate = (req: any, res: Response, next: Function) => {
	if (!req.cookies.token) {
		return res.status(401).json({ error: "Access-denied" });
	}

	try {
		const verified = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
		req.id = { id: verified.id };

		next();
	} catch (error: any) {
		res.status(401).json({ error: "Invalid-token" });
	}

	// jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err: any, payload: Object) => {
	//     if (err) {
	//         res.status(401).json({ verified: false });

	//     } else {
	//         next();
	//     }
	// })
};
