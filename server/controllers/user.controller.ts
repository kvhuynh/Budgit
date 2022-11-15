export {}

const {
    createUser,
    loginUser,
    getUser,
    logoutUser,
} = require("../services/user.service")

const handleRegisterUser = async (req: any, res: any) => {
    
    try {
        const user = await createUser(req.body, res);
        return res.json(user);
    } catch (error: any) {
        
        return res.status(400).json(error);
    }
};


const handleLoginUser = async (req: any, res: any) => {
    try {
        const user = await loginUser(req.body, res);
        return res.json(user)
    } catch (error: any) {

        return res.status(400).json(error);
    }

};

const handleGetUser = async (req: any, res: any) => {
    res.json({ message: "Getting user" })

};

const handleGetAllUsers = async (req: any, res: any) => {
    res.json({ message: "Getting all users" })
};

const handleLogoutUser = async (req: any, res: any) => {

    try {
        const user = await logoutUser(res);
        return res.json(user);
    } catch {
        res.json( {message: "Logout failed"} )
    }
};

module.exports = {
    handleRegisterUser,
    handleLoginUser,
    handleGetUser,
    handleLogoutUser,
    handleGetAllUsers
};
