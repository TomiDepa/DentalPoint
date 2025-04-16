import { sequelize } from './database.js';  // Importar el objeto sequelize

export default {
  development: {
    username: 'root',
    password: '',
    database: 'consultorio',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  test: {
    username: 'root',
    password: '',
    database: 'consultorio_test',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
  production: {
    username: 'root',
    password: '',
    database: 'consultorio',
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
  },
};
