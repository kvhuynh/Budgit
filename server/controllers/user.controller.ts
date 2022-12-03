export {}

const {
    createUser,
    loginUser,
    getOneUser,
    getCurrentUser,
    logoutUser,
} = require("../services/user.service")

const handleRegisterUser = async (req: any, res: any) => {
    
    try {
        const user = await createUser(req.body, res)     
        return res.json(user);
    } catch (error: any) {   
        return res.status(400).json(error);
    }
};


const handleLoginUser = async (req: any, res: any) => {
    try {
        const user = await loginUser(req.body, res);
        console.log(user);
        
        return res.json(user)
    } catch (error: any) {
        console.log(error);
        
        return res.status(400).json(error);
    }

};

const handleGetCurrentUser = async (req: any, res: any) => {
    try {
        const user = await getCurrentUser(req.cookies);
        return res.json(user);
    } catch (error: any) {
        
        return res.status(400).json(error);
    }
}

const handleGetOneUser = async (req: any, res: any) => {
    try {
        const user = await getOneUser(req.params.id);
        return res.json(user);
    } catch (error: any) {

        return res.status(400).json(error);
    }

};

const handleLogoutUser = async (req: any, res: any) => {

    try {
        const user = await logoutUser(res);
        // return res.json(user);
    } catch (error: any) {
        console.log(error);
        
    }
};

module.exports = {
    handleRegisterUser,
    handleLoginUser,
    handleGetCurrentUser,
    handleGetOneUser,
    handleLogoutUser,
};
