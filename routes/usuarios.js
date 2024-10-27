import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
});
// Cargar nuevo usuario
router.post('/nuevoUsuario', async (req, res) => {
    const { nombreUsuario, password } = req.body;
    if (!nombreUsuario || !password) {
        return res.status(400).json({ message: "Campos requeridos vacíos" });
    }
    try {
        const [result] = await pool.query('INSERT INTO usuarios (nombre, password) VALUES (?, ?)', [nombreUsuario, password]);
        return res.status(201).json({ message: "Usuario cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el usuario" + error });
    }
});
// Actualizar un usuario
router.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { Nombre, Apellido, Dni, Usuario, Contraseña } = req.body; // Los campos que vamos a actualizar
    try {
        const [result] = await pool.query(
            `UPDATE Usuario 
             SET Nombre = ?, Apellido = ?, Dni = ?, Usuario = ?, Contraseña = ? 
             WHERE IdUsuario = ?`,
            [Nombre, Apellido, Dni, Usuario, Contraseña, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});
router.put('/AltaLogicaUsuario', async (req, res) => {
    const { id } = req.body; // Obtener el ID del usuario a actualizar

    try {
        const query = 'UPDATE Usuario SET Estado = 1 WHERE IdUsuario = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json({ message: "Usuario activado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del usuario:', error);
        return res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
});
router.put('/BajaLogicaUsuario', async (req, res) => {
    const { id } = req.body; // Obtener el ID del usuario a actualizar

    try {
        const query = 'UPDATE Usuario SET Estado = 0 WHERE IdUsuario = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json({ message: "Usuario desactivado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del usuario:', error);
        return res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
});






export default router;