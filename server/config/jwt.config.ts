const jwt = require("jsonwebtoken");

import { Request, Response } from "express";


module.exports.authenticate = (req: any, res: Response, next: Function) => { 

    console.log(process.env.SECRET_KEY);
    
    console.log(req.body.headers);
    

    
    if (!req.body.headers) {
        console.log("HERE");
        
        return res.status(401).json({error: "Access-denied"});
    }

    try {
        const verified = jwt.verify(req.body.headers.Authorization, process.env.SECRET_KEY);
        console.log("HERE!");
        
        req.id = {id: verified.id};
        console.log(req.id);
        
        next();
        
    } catch (error: any) {

        console.log(error);        
        res.status(401).json({error: "Invalid-token"});
    }


    // jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY, (err: any, payload: Object) => {
    //     if (err) {
    //         res.status(401).json({ verified: false });
            
    //     } else {
    //         next();
    //     }
    // })
}