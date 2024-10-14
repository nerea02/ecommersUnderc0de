import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
 // Obtener todos los talles
 router.get('/talles', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM talle');
    res.json(rows);
});
// Cargar nuevo talle
router.post('/nuevoTalle', async (req, res) => {
    const { descripcionTalle } = req.body;
    if (!descripcionTalle || descripcionTalle.trim() === "") {
        return res.status(400).json({ message: "El campo de descripción del talle no puede estar vacío" });
    }
    try {
        const [result] = await pool.query('INSERT INTO talle (descripcion) VALUES (?)', [descripcionTalle]);
        return res.status(201).json({ message: "Talle cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el talle" + error });
    }
});

router.put('/actualizarTalle/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del talle a actualizar
    const { Talle } = req.body; // Obtener el nuevo valor de Talle

    // Validar que el campo Talle no esté vacío
    if (!Talle || Talle.trim() === "") {
        return res.status(400).json({ message: "El campo Talle no puede estar vacío" });
    }

    try {
        const query = `
            UPDATE Talle SET 
            Talle = ?
            WHERE IdTalle = ?
        `;
        const [result] = await pool.query(query, [Talle, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Talle no encontrado" });
        }

        return res.status(200).json({ message: "Talle actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar talle:', error);
        return res.status(500).json({ message: 'Error al actualizar talle', error: error.message });
    }
});
router.put('/AltaLogicaTalle', async (req, res) => {
    const { id } = req.body; // Obtener el ID del talle a actualizar

    try {
        const query = 'UPDATE Talle SET Estado = 1 WHERE IdTalle = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Talle no encontrado" });
        }

        return res.status(200).json({ message: "Talle activado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del talle:', error);
        return res.status(500).json({ message: 'Error al actualizar talle', error: error.message });
    }
});
router.put('/BajaLogicaTalle', async (req, res) => {
    const { id } = req.body; // Obtener el ID del talle a actualizar

    try {
        const query = 'UPDATE Talle SET Estado = 0 WHERE IdTalle = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Talle no encontrado" });
        }

        return res.status(200).json({ message: "Talle desactivado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del talle:', error);
        return res.status(500).json({ message: 'Error al actualizar talle', error: error.message });
    }
});

export default router;