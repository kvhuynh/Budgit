const jwt = require("jsonwebtoken");

<<<<<<< Updated upstream:server/config/jwt.config.js
module.exports.authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err, payload) => {
=======
import { Request, Response } from "express";


module.exports.authenticate = (req: Request, res: Response, next: Function) => { 
    jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err: any, payload: Object) => {
>>>>>>> Stashed changes:server/config/jwt.config.ts
        if (err) {
            res.status(401).json({ verified: false });
            
        } else {
            next();
        }
    })
}