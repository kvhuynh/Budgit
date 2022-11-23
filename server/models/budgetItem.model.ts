export { };

import { Budget } from "./budget.model"
import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';


@Table({tableName: 'budget_items'})
export class BudgetItem extends Model {

  @AllowNull(false)
  @AutoIncrement
  @Column({primaryKey: true})
  id: number


  @Column({
    field: "name",
    allowNull: false,
    validate: {
      notNull: {
        msg: "Item name required"
      }
    }
  })
  name: string

  @Column({
    field: "balance",
    allowNull: false,
    defaultValue: 0,
    validate: {
      notNull: {
        msg: "Last name is required"
      }
    }
  })
  balance: number;

  @ForeignKey(() => Budget)
  @Column({
    field: "budget_id"})
  
  budgetId: number;
  
  @BelongsTo(() => Budget)
  budget: Budget;
  

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

};
