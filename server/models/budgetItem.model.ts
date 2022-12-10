export {};

import { Budget } from "./budget.model";
import {
	AllowNull,
	AutoIncrement,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	Model,
	Table,
	UpdatedAt,
} from "sequelize-typescript";
import { Sequelize, TEXT } from "sequelize";

@Table({ tableName: "budget_items" })
export class BudgetItem extends Model {
	@AllowNull(false)
	@AutoIncrement
	@Column({ primaryKey: true })
	id: number;

	@Column({
		field: "name",
		validate: {
			notEmpty: {
				msg: "Item name required",
			},
		},
	})
	name: string;

	@Column({
		field: "balance",
		defaultValue: 0.0,
		// validate: {
		//   notEmpty: {
		//     msg: "Price"
		//   }
		// }
	})
	balance: number;

	@Column({
		field: "description",
	})
	description: string;

	@Column({
		field: "history",
		type: TEXT
	})
	history: string

	@ForeignKey(() => Budget)
	@Column({
		field: "budget_id",
		allowNull: false,
		onDelete: "cascade",
		onUpdate: "restrict",
	})
	budgetId: number;

	@BelongsTo(() => Budget)
	budget: Budget;

	@CreatedAt
	created_at: Date;

	@UpdatedAt
	updated_at: Date;
}
