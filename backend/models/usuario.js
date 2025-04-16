import sequelize from '../config/database.js'; // Importa la conexión correctamente
import { DataTypes } from 'sequelize';

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dni: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol: {  // Nueva columna "rol"
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'usuario'  // Puede ser "admin", "usuario", etc.
    },
    categoria: {  // Nueva columna "categoria"
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'general'  // Puede ser algo como "premium", "básico", etc.
    }
}, {
    tableName: 'usuarios',  // Define el nombre de la tabla
    timestamps: false
});

export default Usuario;
