export { };

import { Budget } from "./budget.model"
import { AllowNull, AutoIncrement, BeforeCreate, Column, CreatedAt, DataType, Model, Table, UpdatedAt, HasMany } from 'sequelize-typescript';

const bcrypt = require("bcrypt");

@Table({tableName: 'users'})
export class User extends Model {

  @AllowNull(false)
  @AutoIncrement
  @Column({primaryKey: true})
  id: number

  @Column({
    field: "first_name",
    allowNull: false,
    validate: {
      notNull: {
        msg: "First name is required"
      }
    }
  })
  firstName: string

  @Column({
    field: "last_name",
    allowNull: false,
    validate: {
      notNull: {
        msg: "Last name is required"
      }
    }
  })
  lastName: string

  @Column({
    field: "email",
    allowNull: false,
    validate: {
        isEmail: true
    }  
  })
  email: string

  @Column({
    field: "password",
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
  })
  password: string

  @Column(DataType.VIRTUAL)
  confirmPassword: string

  @HasMany(() => Budget)
  budgets: Budget[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

  @BeforeCreate
  static hashPassword(instance: User) {
    if (instance.password === instance.confirmPassword) {
        instance.password = bcrypt.hashSync(instance.password, 10);
    } else {
        // return Promise.reject(new Error("passwords must match"));
        return Promise.reject("passwords must match")
    }
  }

};

// export default User;


// const sequelize = require("../config/sequelize.config");

// const bcrypt = require("bcrypt");


// const { Sequelize, DataTypes } = require("sequelize");

// const sequelize = require("../config/sequelize.config");

// const bcrypt = require("bcrypt");

// const User = sequelize.define("users", {
//     id: {
//         field: "id",
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },

//     firstName: {
//         field: "first_name",
//         type: Sequelize.STRING, allowNull: false
//     },

//     lastName: {
//         field: "last_name",
//         type: Sequelize.STRING, allowNull: false
//     },

//     email: {
//         field: "email",
//         type: Sequelize.STRING, allowNull: false,
//         validate: {
//             isEmail: true
//         }
//     },

//     password: {
//         field: "password",
//         type: Sequelize.STRING, 
//         allowNull: false,
//         validate: {
//             notNull: {
//                 msg: "Password is required"
//             },

//             notEmpty: {
//                 msg: "Please provide a password"
//             },

//             len: {
//                 args: [8, 20],
//                 msg: "Password must be between 8 and 20 characters"
//             }
//         }
//     },

//     confirmPassword: {
//         field: "confirm_password",
//         type: Sequelize.VIRTUAL
//     },


//     created_at: {
//         type: Sequelize.DATE,
//         defaultValue: sequelize.literal("NOW()")
//     },

//     updated_at: {
//         type: Sequelize.DATE,
//         defaultValue: sequelize.literal("NOW()")
//     }
    
// },

// );

// // User.addHook("beforeValidate", (user: any) => {
// //     user.password === user.confirmPassword;
    
// // });

// // User.addHook("afterValidate", (user: any) => {
// //     return Promise.reject(new Error("passwords must match"));
// // })

// User.addHook("beforeCreate", (user: any) => {
//     if (user.password === user.confirmPassword) {
//         user.password = bcrypt.hashSync(user.password, 10);
//     } else {
//         return Promise.reject(new Error("passwords must match"));
//     }
// });

// module.exports = User
