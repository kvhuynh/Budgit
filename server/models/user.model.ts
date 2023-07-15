import { Budget } from "./budget.model";
import {
	AllowNull,
	AutoIncrement,
	BeforeCreate,
	Column,
	CreatedAt,
	DataType,
	Model,
	Table,
	UpdatedAt,
	HasMany,
	Length,
	Default,
} from "sequelize-typescript";

const bcrypt = require("bcrypt");

@Table({ tableName: "users" })
export class User extends Model {
	@AllowNull(false)
	@AutoIncrement
	@Column({ primaryKey: true })
	id: number;

	@Column({
		field: "first_name",
		validate: {
			notEmpty: {
				msg: "First name is required",
			},
		},
	})
	firstName: string;

	@Column({
		field: "last_name",
		validate: {
			notEmpty: {
				msg: "Last name is required",
			},
		},
	})
	lastName: string;

	@Column({
		field: "email",
		validate: {
			isEmail: {
				msg: "Email is not in a valid format",
			},
			notEmpty: {
				msg: "Email is required",
			},
		},
		unique: true,
	})
	email: string;

	@Default(false)
	@Column({
		field: "is_oauth",
		allowNull: true,
	})
	isOAuth: boolean;

	@Column({
		field: "password",
		allowNull: true,
		validate: {
			notEmpty: {
				msg: "Password is required",
			},
			len: {
				args: [8, 50],
				msg: "Password must be between 8 and 50 characters",
			},
      hashPassowrd() {
        if (this.confirmPassword === null) {
          return
        } else if (this.password === this.confirmPassword) {
				  this.password = bcrypt.hashSync(this.confirmPassword, 10);

        } else {
					throw new Error("passwords must match");
          
        }
      }

			// hashPassword() {
			// 	if (this.password === this.confirmPassword) {
			// 		this.password = bcrypt.hashSync(this.confirmPassword, 10);
			// 	} else {
			// 		throw new Error("passwords must match");
			// 	}
			// },
		},
    
	})
	password: string;

	@Column(DataType.VIRTUAL)
	confirmPassword: string;

	// @Column

	// @HasMany(() => Budget)
	// budgets: Budget[];

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;
}
