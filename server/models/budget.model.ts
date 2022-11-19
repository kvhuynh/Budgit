export { };

import { User } from "./user.model"
import { AllowNull, AutoIncrement, BelongsTo, Column, CreatedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';

const bcrypt = require("bcrypt");

@Table({tableName: 'budgets'})
export class Budget extends Model {

  @AllowNull(false)
  @AutoIncrement
  @Column({primaryKey: true})
  id: number


  @Column({
    field: "name",
    allowNull: false,
    validate: {
      notNull: {
        msg: "Budget name is required"
      }
    }
  })
  name: string

  @Column({
    field: "total_balance",
    defaultValue: 0,
  })
  totalBalance: number;

  @ForeignKey(() => User)
  @Column({
    field: "user_id"})
  
  userId: number;
  
  @BelongsTo(() => User)
  user: User;
  

  @CreatedAt
  created_at: Date;

  @UpdatedAt
  updated_at: Date;

};