export {}

import { Request, Response } from "express";

const secret = process.env.FIRST_SECRET_KEY;

import { User } from "../models/user.model";

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (data: any, res: any) => {
    console.log("checking if email is available....");

    const { email } = data;

    const emailAvailable = await User.findOne({ where: { email: email } });

    console.log(emailAvailable);

    if (!emailAvailable) {
        console.log("service: creating user");
        const user = await User.create(data)
            .then((user: any) => { // TODO user should have a user type
                const userToken = jwt.sign({
                    id: user._id,
                }, process.env.SECRET_KEY);

                res
                    .cookie("usertoken", userToken, secret, {
                        httpOnly: true
                    })
                    .json({ msg: "success", user: user });
            })
            .catch((err: any) => {
                throw {name: "PasswordsMismatchError", message: err}
            });

        return user;

    } else {
        throw {name: "EmailNotUniqueError", message: "email is already in use"};

    }
}

const loginUser = async (data: any, res: any) => {
    
    const user = await User.findOne({ where: { email: data.email } });
    
    if (user === null) {
        throw { name: "UserNotFoundError", message: "incorrect credentials" };
    }

    const correctPassword = await bcrypt.compare(data.password, user.password);

    if (!correctPassword) {
        throw { name: "PasswordIsIncorrectError", message: "incorrect credentials" };
    }

    const userToken = jwt.sign( {
        id: user.id // id: user._id
    }, process.env.SECRET_KEY );

    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" });

} // TODO to verify user decrypt the user token with alogrithm

const logoutUser = async (res: any) => {
    res.clearCookie("usertoken");
    console.log("logging out");
    
    res.sendStatus(200);
}

const getOneUser = async (id: number, res: any) => {
    console.log(id);
    
    const user = await User.findOne({ where: { id: id } })
    
    return user;
}

module.exports = {
    createUser,
    loginUser,
    logoutUser, 
    getOneUser
};