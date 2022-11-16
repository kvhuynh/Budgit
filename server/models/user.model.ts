import { userInfo } from "os";

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../config/sequelize.config");

const bcrypt = require("bcrypt");

const User = sequelize.define("users", {
    id: {
        field: "id",
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    firstName: {
        field: "first_name",
        type: Sequelize.STRING, allowNull: false
    },

    lastName: {
        field: "last_name",
        type: Sequelize.STRING, allowNull: false
    },

    email: {
        field: "email",
        type: Sequelize.STRING, allowNull: false,
        validate: {
            isEmail: true
        }
    },

    password: {
        field: "password",
        type: Sequelize.STRING, 
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required"
            },

            notEmpty: {
                msg: "Please provide a password"
            },

            len: {
                args: [8, 20],
                msg: "Password must be between 8 and 20 characters"
            }
        }
    },

    confirmPassword: {
        field: "confirm_password",
        type: Sequelize.VIRTUAL
    },


    created_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("NOW()")
    },

    updated_at: {
        type: Sequelize.DATE,
        defaultValue: sequelize.literal("NOW()")
    }
    
},

);

// User.addHook("beforeValidate", (user: any) => {
//     user.password === user.confirmPassword;
    
// });

// User.addHook("afterValidate", (user: any) => {
//     return Promise.reject(new Error("passwords must match"));
// })

User.addHook("beforeCreate", (user: any) => {
    if (user.password === user.confirmPassword) {
        user.password = bcrypt.hashSync(user.password, 10);
    } else {
        return Promise.reject(new Error("passwords must match"));
    }
});

module.exports = User

// const mongoose = require("mongoose");

// const bcrypt = require("bcrypt");

// const UserSchema = new mongoose.Schema({

//     firstName: {
//         type: String,
//         required: [true, "First name is required"]
//     },

//     lastName: {
//         type: String,
//         required: [true, "Last name is required"]
//     },

//     email: {
//         type: String,
//         required: [true, "Email is required"],
//         validate: {
//             validator: (val:string) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
//             message: "Please enter a valid email"
//         }
//     },

//     password: {
//         type: String,
//         required: [true, "Password is required"],
//         minlength: [8, "Password must be 8 characters or longer"]
//     }

// }, {timestamps:true});

// UserSchema.virtual("confirmPassword")
//     .get(function(this: any) {
//         return this._confirmPassword;
//     })
//     .set(function(this: any, value: any) {
//         return this._confirmPassword = value;
//     });

// UserSchema.pre("validate", function(this: any, next: any) {
//     if (this.password !== this.confirmPassword) {
//         this.invalidate("confirmPassword", "Password must match confirm password");
//     }
//     next();
// })

// UserSchema.pre("save", function(this: any, next: any) {
//     bcrypt.hash(this.password, 10)
//         .then((hash: any) => {
//             this.password = hash;
//             next();
//         });
// })

// const User = mongoose.model("User", UserSchema)

// module.exports = { User: User }