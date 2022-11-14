export {}

const { User } = require("../models/user.model");

const createUser = async (data: any) => {
    console.log("service: creating user");
    const user = await User.create(data);
    console.log(user);
    return user
    
    
}


module.exports = {
    createUser
};