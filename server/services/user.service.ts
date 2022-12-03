export {}

const secret = process.env.FIRST_SECRET_KEY;

<<<<<<< Updated upstream
const { User } = require("../models/user.model");
=======
import { User } from "../models/user.model";
const { getSessionId } = require("../utilities/getSessionId.utilities")

>>>>>>> Stashed changes

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const createUser = async (data: any, res: any) => {
<<<<<<< Updated upstream
    console.log("checking if email is available....");

    const { email } = data;
    
    const emailAvailable = await User.findOne({email: email})

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
            .catch((err: any) => res.json(err));

        return user;

    } else {
        throw {name: "EmailNotUniqueError", message: "email is already in use"};

    }
=======
    const user = await User.create(data)
        .then((user: any) => { // TODO user should have a user type
            // const userToken = jwt.sign({
            //     id: user._id,
            // }, process.env.SECRET_KEY);

            // res
            //     .cookie("usertoken", userToken, secret, {
            //         httpOnly: true
            //     })
            //     .json({ msg: "success", user: user });
            const userToken = jwt.sign( {
                id: user.id // id: user._id
            }, process.env.SECRET_KEY );
        
            res
                .cookie("usertoken", userToken, secret, {
                    httpOnly: true
                })
                .json({ msg: "success!" })
                console.log(userToken);
        })
        .catch((err: any) => {        
            return err;
        });    
    return user
>>>>>>> Stashed changes
}

const loginUser = async (data: any, res: any) => {
    const user = await User.findOne({email: data.email});
    console.log(data.firstName);
    console.log(user);
    
    
    
    if (user === null) {
        throw { name: "UserNotFoundError", message: "incorrect credentials" };
    }

    const correctPassword = await bcrypt.compare(data.password, user.password);

    if (!correctPassword) {
        throw { name: "PasswordIsIncorrectError", message: "incorrect credentials" };
    }

    const userToken = jwt.sign( {
        id: user._id
    }, process.env.SECRET_KEY );

    res
        .cookie("usertoken", userToken, secret, {
            httpOnly: true
        })
        .json({ msg: "success!" })
        console.log(userToken);
        
        

}

const logoutUser = async (res: any) => {
    res.clearCookie("usertoken");
    res.sendStatus(200);
}

<<<<<<< Updated upstream
=======
const getCurrentUser = async (res: any) => {
    console.log(res);
    
    const id = getSessionId(res.usertoken)
    const user = await User.findOne({ where: { id: id} })
    
    return user;
}

const getOneUser = async (id: number, res: any) => {
    
    const user = await User.findOne({ where: { id: id } })
    
    return user;
}
>>>>>>> Stashed changes

module.exports = {
    createUser,
    loginUser,
<<<<<<< Updated upstream
    logoutUser
=======
    logoutUser, 
    getCurrentUser,
    getOneUser
>>>>>>> Stashed changes
};