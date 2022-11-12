const jwt = require("jsonwebtoken");



const registerUser = async() => {
    register: (req: any, res: any) => {
        UserSchema.create(req.body)
            .then((user: typeof User) => {
                res.json({ msg: "success!", user: user })
            })
            .catch((err: any) => res.json(err))
    }
}