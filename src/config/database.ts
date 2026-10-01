import { Sequelize, Options } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const isSSL = process.env.DB_SSL === 'true';

const sequelizeOptions: Options = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  dialect: 'postgres',
  logging: false,
  dialectOptions: isSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    : {}
};

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'finance_db',
  process.env.DB_USER || 'postgres',
  process.env.DB_PASS || '',
  sequelizeOptions
);