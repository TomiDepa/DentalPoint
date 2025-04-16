import sequelize from './config/database.js';

async function probarConexion() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a MySQL exitosa.');
    } catch (error) {
        console.error('Error al conectar con MySQL:', error);
    }
}

probarConexion();
