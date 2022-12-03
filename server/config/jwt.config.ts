const jwt = require("jsonwebtoken");

import { Request, Response } from "express";


module.exports.authenticate = (req: Request, res: Response, next: Function) => { 
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err: any, payload: Object) => {
        if (err) {
            res.status(401).json({ verified: false });
            
        } else {
            next();
        }
    })
}