
import sequelize from './config/database.js';
import userRoutes from './routes/users.js'; // Importa correctamente las rutas

import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 5000;

// Habilitar CORS para todas las solicitudes
app.use(cors());
// Middleware para procesar JSON
app.use(express.json());

// Rutas
app.use("/api/usuarios", userRoutes);

// 📌 Ruta de prueba
app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

// 📌 Conectar a la base de datos y sincronizar modelos
sequelize.sync({ alter: true }) // Aquí solo sincronizas una vez
    .then(() => {
        console.log("Base de datos sincronizada");
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    })
    .catch(err => console.error("Error al conectar a la base de datos:", err));
