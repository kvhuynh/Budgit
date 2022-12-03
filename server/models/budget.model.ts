export { };

import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt, HasMany } from 'sequelize-typescript';
import { User } from "./user.model";
import { BudgetItem } from "./budgetItem.model";

const bcrypt = require("bcrypt");

@Table({tableName: 'budgets'})
export class Budget extends Model {

  @AllowNull(false)
  @AutoIncrement
  @Column({primaryKey: true})
  id: number


  @Column({
    field: "name",
    validate: {
      notEmpty: {
        msg: "Budget name is required"
      }
    }
  })
  name: string;

  @Column({
    field: "description",
  })
  description: string;

  @Column({
    field: "total_balance",
    defaultValue: 0,
  })
  totalBalance: number;

  @ForeignKey(() => User)
  @Column({
    field: "user_id",
    allowNull: false
  })
  
  userId: number;

  @HasMany(() => BudgetItem, {
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  })
  budgetItems: BudgetItem[];
  
  @BelongsTo(() => User)
  user: User;
  

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

};
