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

@Table({ tableName: "google_auth_token" })
export class ThirdPartyAuth extends Model {
	@AllowNull(false)
	@AutoIncrement
	@Column({ primaryKey: true })
	id: number;

    @Column({
		field: "refresh_token",
	})
	refreshToken: string;

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
