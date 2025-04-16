import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('consultorio', 'root', '', {
    host: 'localhost',
    port: 3306, // Usa 3306 si es el puerto por defecto
    dialect: 'mysql',
    logging: false
});


export default sequelize;
