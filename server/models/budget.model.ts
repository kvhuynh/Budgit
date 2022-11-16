
export {}

const Sequelize = require("sequelize");

const sequelize = require("../config/sequelize.config");


const Budget = sequelize.define("budget", {
    id: {
        type: Sequelize.INTEGER,

        autoIncrement: true,

        allowNull: false,

        primaryKey: true
    },

    name: {
        type: Sequelize.STRING, allowNull: false
    },

    created_at: {
        type: Sequelize.DATE, allowNull: false
    },

    updated_at: {
        type: Sequelize.DATE, allowNull: false
    }
});


module.exports = Budget;

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