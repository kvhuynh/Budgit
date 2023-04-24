export {};

import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	CreatedAt,
	ForeignKey,
	Model,
	Table,
	UpdatedAt,
	HasMany,
} from "sequelize-typescript";
import { Sequelize, TEXT, BIGINT, DataTypes } from "sequelize";

import { User } from "./user.model";

@Table({ tableName: "income_sources" })
export class IncomeSource extends Model {
	@AllowNull(false)
	@AutoIncrement
	@Column({ primaryKey: true })
	id: number;

	@Column({
		field: "name",
		validate: {
			notEmpty: {
				msg: "Income name required.",
			},
		},
	})
	name: string;

	@Column({
		field: "access_token",
	})
	accessToken: string;

	@Column({
		field: "item_id",
	})
	itemId: string;

	@Column({
		field: "total_balance",
		defaultValue: 0,
	})
	totalBalance: number;

	@Column({
		field: "institution_name",
	})
	institutionName: string;

	@Column({
		field: "institution_logo",
    type: TEXT
	})
	institutionLogo: string

	@Column({
		field: "institution_url",
	})
	institutionUrl: string;

	@ForeignKey(() => User)
	@Column({
		field: "user_id",
		allowNull: false,
	})
	userId: number;

	@BelongsTo(() => User)
	user: User;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;
}
