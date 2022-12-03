
<<<<<<< Updated upstream

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First name is required"]
    },

    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: (val:string) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
=======
import { Budget } from "./budget.model"
import { AllowNull, AutoIncrement, BeforeCreate, Column, CreatedAt, DataType, Model, Table, UpdatedAt, HasMany, Length } from 'sequelize-typescript';

const bcrypt = require("bcrypt");

@Table({tableName: 'users'})
export class User extends Model {

  @AllowNull(false)
  @AutoIncrement
  @Column({primaryKey: true})
  id: number

  @Column({
    field: "first_name",
    validate: {
      notEmpty: {
        msg: "First name is required"
      }
    }
  })
  firstName: string

  @Column({
    field: "last_name",
    validate: {
      notEmpty: {
        msg: "Last name is required"
      }
    }
    })
  lastName: string

  @Column({
    field: "email",
    validate: {
      isEmail: {
        msg: "Email is not in a valid format"
      },
      notEmpty: {
        msg: "Email is required"
      }
    },
    unique: true
  })
  email: string

  @Column({
    field: "password",
    allowNull: false,
    validate: {
        notEmpty: {
            msg: "Password is required"
        },
        len: {
          args: [8, 50],
          msg: "Password must be between 8 and 50 characters"
        },
        hashPassword() {
          if (this.password === this.confirmPassword) {
            this.password = bcrypt.hashSync(this.confirmPassword, 10);
        } else {
            throw new Error("passwords must match")
        }
>>>>>>> Stashed changes
        }
    },

<<<<<<< Updated upstream
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be 8 characters or longer"]
    }

}, {timestamps:true});

UserSchema.virtual("confirmPassword")
    .get(function(this: any) {
        return this._confirmPassword;
    })
    .set(function(this: any, value: any) {
        return this._confirmPassword = value;
    });

UserSchema.pre("validate", function(this: any, next: any) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password");
    }
    next();
})

UserSchema.pre("save", function(this: any, next: any) {
    bcrypt.hash(this.password, 10)
        .then((hash: any) => {
            this.password = hash;
            next();
        });
})

const User = mongoose.model("User", UserSchema)

module.exports = { User: User }
=======
  @Column(DataType.VIRTUAL)
  confirmPassword: string

  @HasMany(() => Budget)
  budgets: Budget[];

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

};
>>>>>>> Stashed changes
