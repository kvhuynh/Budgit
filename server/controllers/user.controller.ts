// const jwt = require("jsonwebtoken");



// const registerUser = async() => {
//     register: (req: any, res: any) => {
//         UserSchema.create(req.body)
//             .then((user: typeof User) => {
//                 res.json({ msg: "success!", user: user })
//             })
//             .catch((err: any) => res.json(err))
//     }
// }


/** 
* Registers user.
* @param { req, res } parameterNameHere - Brief description of the parameter here. Note: For other notations of data types, please refer to JSDocs: DataTypes command.
* @return {ReturnValueDataTypeHere} Brief description of the returning value here.
*/

export {}
// const jwt = require("jswebtoken")
const {
    createUser
} = require("../services/user.service")

const registerUser = async (req: any, res: any) => {
    
    try {
        const user = await createUser(req.body);
        return res.json(user);
    } catch (error: unknown) {
        return res.status(400).json(error);
    }
}


const loginUser = (req: any, res: any) => {
    res.json({ message: "Logging in user" })

}

const getUser = (req: any, res: any) => {
    res.json({ message: "Getting user" })

}

module.exports = {
    registerUser,
    loginUser,
    getUser
}

