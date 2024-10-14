import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
// Obtener todos los reintegros
router.get('/reintegros', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM reintegro');
    res.json(rows);
});

// Cargar nuevo reintegro
router.post('/nuevoReintegro', async (req, res) => {
    const { Estado } = req.body; // En el cuerpo de la petición solo enviamos 'Estado'

    if (Estado === undefined) {
        return res.status(400).json({ message: "El campo 'Estado' es obligatorio" });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO Reintegro (Estado) VALUES (?)', 
            [Estado]
        );

        return res.status(201).json({ 
            message: 'Reintegro creado exitosamente',
            reintegroId: result.insertId // Devuelve el ID del nuevo reintegro
        });
    } catch (error) {
        console.error('Error al insertar reintegro:', error);
        return res.status(500).json({ message: 'Error al guardar el reintegro', error: error.message });
    }
});
router.put('/actualizarReintegro/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del reintegro a actualizar
    const { Estado } = req.body; // Obtener el nuevo estado

    // Validar que el estado no esté vacío
    if (Estado === undefined) {
        return res.status(400).json({ message: "El campo Estado es obligatorio" });
    }

    try {
        const query = `
            UPDATE Reintegro SET 
            Estado = ?
            WHERE IdReintegro = ?
        `;
        const [result] = await pool.query(query, [Estado, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Reintegro no encontrado" });
        }

        return res.status(200).json({ message: "Reintegro actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar reintegro:', error);
        return res.status(500).json({ message: 'Error al actualizar reintegro', error: error.message });
    }
});
router.put('/AltaLogicaReintegro', async (req, res) => {
    const { id } = req.body; // Obtener el ID del reintegro a actualizar

    try {
        const query = 'UPDATE Reintegro SET Estado = 1 WHERE IdReintegro = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Reintegro no encontrado" });
        }

        return res.status(200).json({ message: "Reintegro activado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del reintegro:', error);
        return res.status(500).json({ message: 'Error al actualizar reintegro', error: error.message });
    }
});
router.put('/BajaLogicaReintegro', async (req, res) => {
    const { id } = req.body; // Obtener el ID del reintegro a actualizar

    try {
        const query = 'UPDATE Reintegro SET Estado = 0 WHERE IdReintegro = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Reintegro no encontrado" });
        }

        return res.status(200).json({ message: "Reintegro desactivado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del reintegro:', error);
        return res.status(500).json({ message: 'Error al actualizar reintegro', error: error.message });
    }
});

export default router;