import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../config/database';

export type TransactionType = 'INCOME' | 'EXPENSE';

// Interface com todos os atributos da entidade
export interface ITransactionAttributes {
  id: number;
  description: string;
  amount: number;
  type: TransactionType;
  category: string;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// Atributos opcionais para criação (id, createdAt e updatedAt são gerados automaticamente)
export interface ITransactionCreationAttributes
  extends Optional<ITransactionAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

// Definição da classe estendendo a Model tipada do Sequelize
export class Transaction
  extends Model<ITransactionAttributes, ITransactionCreationAttributes>
  implements ITransactionAttributes
{
  public id!: number;
  public description!: string;
  public amount!: number;
  public type!: TransactionType;
  public category!: string;
  public date!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('amount');
        return rawValue ? parseFloat(rawValue.toString()) : 0;
      }
    },
    type: {
      type: DataTypes.ENUM('INCOME', 'EXPENSE'),
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'transactions',
    timestamps: true
  }
);