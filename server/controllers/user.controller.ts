export {}

const {
    createUser,
    loginUser,
<<<<<<< Updated upstream
    getUser,
=======
    getOneUser,
    getCurrentUser,
>>>>>>> Stashed changes
    logoutUser,
} = require("../services/user.service")

const handleRegisterUser = async (req: any, res: any) => {
    
    try {
        const user = await createUser(req.body, res)     
        return res.json(user);
<<<<<<< Updated upstream
    } catch (error: any) {
        
=======
    } catch (error: any) {   
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
const handleGetUser = async (req: any, res: any) => {
    res.json({ message: "Getting user" })
=======
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
>>>>>>> Stashed changes

};

const handleLogoutUser = async (req: any, res: any) => {

    try {
        const user = await logoutUser(res);
<<<<<<< Updated upstream
        return res.json(user);
    } catch {
        res.json( {message: "Logout failed"} )
=======
        // return res.json(user);
    } catch (error: any) {
        console.log(error);
        
>>>>>>> Stashed changes
    }
};

module.exports = {
    handleRegisterUser,
    handleLoginUser,
<<<<<<< Updated upstream
    handleGetUser,
=======
    handleGetCurrentUser,
    handleGetOneUser,
>>>>>>> Stashed changes
    handleLogoutUser,
};
