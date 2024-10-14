import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
 // Obtener todos los colores
 router.get('/colores', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM colores');
    res.json(rows);
});
// Cargar nuevo color
router.post('/nuevoColor', async (req, res) => {
    const { descripcionColor } = req.body;
    if (!descripcionColor || descripcionColor.trim() === "") {
        return res.status(400).json({ message: "El campo de descripción del color no puede estar vacío" });
    }
    try {
        const [result] = await pool.query('INSERT INTO colores (descripcion) VALUES (?)', [descripcionColor]);
        return res.status(201).json({ message: "Color cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el color" + error });
    }
});

router.put('/actualizarColor/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del color a actualizar
    const { Color } = req.body; // Obtener el nuevo valor de Color

    // Validar que el campo Color no esté vacío
    if (!Color || Color.trim() === "") {
        return res.status(400).json({ message: "El campo Color no puede estar vacío" });
    }

    try {
        const query = `
            UPDATE Colores SET 
            Color = ?
            WHERE IdColor = ?
        `;
        const [result] = await pool.query(query, [Color, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Color no encontrado" });
        }

        return res.status(200).json({ message: "Color actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar color:', error);
        return res.status(500).json({ message: 'Error al actualizar color', error: error.message });
    }
});
router.put('/AltaLogicaColores', async (req, res) => {
    const { id } = req.body; // Obtener el ID del color a actualizar

    try {
        const query = 'UPDATE Colores SET Estado = 1 WHERE IdColor = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Color no encontrado" });
        }

        return res.status(200).json({ message: "Color activado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del color:', error);
        return res.status(500).json({ message: 'Error al actualizar color', error: error.message });
    }
});
router.put('/BajaLogicaColores', async (req, res) => {
    const { id } = req.body; // Obtener el ID del color a actualizar

    try {
        const query = 'UPDATE Colores SET Estado = 0 WHERE IdColor = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Color no encontrado" });
        }

        return res.status(200).json({ message: "Color desactivado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del color:', error);
        return res.status(500).json({ message: 'Error al actualizar color', error: error.message });
    }
});
export default router;