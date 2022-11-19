export {}

const {
    createUser,
    loginUser,
    getOneUser,
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

const handleGetOneUser = async (req: any, res: any) => {
    try {
        const user = await getOneUser(req.params.id);
        return res.json(user);
    } catch (error: any) {

        return res.status(400).json(error);
    }

};

const handleGetAllUsers = async (req: any, res: any) => {
    res.json({ message: "Getting all users" })
};

const handleLogoutUser = async (req: any, res: any) => {

    try {
        const user = await logoutUser(res);
        return res.json(user);
    } catch (error: any) {
        res.json( {message: "Logout failed"} )
    }
};

module.exports = {
    handleRegisterUser,
    handleLoginUser,
    handleGetOneUser,
    handleLogoutUser,
    handleGetAllUsers
};
