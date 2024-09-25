import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // This will create database.sqlite in the project root
  logging: false,  // Set to true to see SQL queries in console
});

export default sequelize;
