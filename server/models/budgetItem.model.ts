export {};

import { Budget } from "./budget.model";
import {
	AllowNull,
	AutoIncrement,
	BeforeCreate,
	BeforeUpdate,
	BelongsTo,
	Column,
	CreatedAt,
	DataType,
	ForeignKey,
	Model,
	Table,
	UpdatedAt,
} from "sequelize-typescript";
import { Sequelize, TEXT, BIGINT, DataTypes } from "sequelize";

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


	@BeforeUpdate
	static updateHistory(instance: BudgetItem, data: any) {
		// if (instance.history === "") {
		// 	console.log("yo");
			
		// }

		// if (instance.dataValues.history !== "") {
		// 	const dateTime = new Date();
		// 	let history = JSON.parse(instance.dataValues.history)
		// 	let newHistory = [(dateTime.toISOString().slice(0,10)), instance.dataValues.balance]
		// 	// console.log(history);
			
		// 	// console.log(newHistory);
			
		// 	history.push(newHistory)
			
		// 	console.log(history);
			
		// } else {
		// 	console.log("no");
			
		// }
		// console.log(data.budgetItemId);
		
	}
}
