import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Op } from 'sequelize'; // ✅ Importación correcta
import Usuario from '../models/usuario.js';

const router = express.Router();
const SECRET_KEY = 'tu_secreto_super_seguro'; // Usa una variable de entorno en producción

// Ruta para registrar un usuario
router.post('/', async (req, res) => {
    const { nombre, apellido, email, contraseña, dni, rol, categoria } = req.body;

    if (!nombre || !apellido || !email || !contraseña || !dni || !rol || !categoria) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(contraseña, 10);
        const nuevoUsuario = await Usuario.create({
            nombre,
            apellido,
            email,
            contraseña: hashedPassword,
            dni,
            rol,
            categoria
        });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;

    if (!email || !contraseña) {
        return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no encontrado' });
        }

        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) {
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            SECRET_KEY,
            { expiresIn: '2h' }
        );

        res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol } });
    } catch (error) {
        res.status(500).json({ error: 'Error en el login' });
    }
});
// Ruta para obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
});

// Ruta para buscar usuarios por nombre, apellido o dni
router.get('/buscar', async (req, res) => {
    const { query } = req.query;

    try {
        const usuarios = await Usuario.findAll({
            where: {
                [Op.or]: [
                    { nombre: { [Op.like]: `%${query}%` } },
                    { apellido: { [Op.like]: `%${query}%` } },
                    { dni: { [Op.like]: `%${query}%` } }
                ]
            }
        });
        res.json(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al buscar usuarios' });
    }
});

// Ruta para actualizar un usuario
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, email, contraseña, dni, rol, categoria } = req.body;

    if (!nombre || !apellido || !email || !dni || !rol || !categoria) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        usuario.nombre = nombre;
        usuario.apellido = apellido;
        usuario.email = email;
        usuario.dni = dni;
        usuario.rol = rol;
        usuario.categoria = categoria;

        if (contraseña) {
            usuario.contraseña = await bcrypt.hash(contraseña, 10);
        }

        await usuario.save();
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

export default router;
