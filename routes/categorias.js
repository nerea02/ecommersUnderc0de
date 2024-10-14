import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
// Obtener todas las categorías
router.get('/categorias', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM categorias');
    res.json(rows);
});
// Cargar nueva categoría
router.post('/nuevaCategoria', async (req, res) => {
    const { nombreCategoria } = req.body;
    if (!nombreCategoria || nombreCategoria.trim() === "") {
        return res.status(400).json({ message: "El nombre de la categoría no puede estar vacío" });
    }
    try {
        const [result] = await pool.query('INSERT INTO categorias (nombre) VALUES (?)', [nombreCategoria]);
        return res.status(201).json({ message: "Categoría cargada exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar la categoría" + error });
    }
});
router.put('/actualizarCategoria/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la categoría a actualizar
    const { Descripcion } = req.body; // Obtener la nueva descripción

    // Validar que la descripción no esté vacía
    if (!Descripcion || Descripcion.trim() === "") {
        return res.status(400).json({ message: "El campo Descripcion es obligatorio" });
    }

    try {
        const query = `
            UPDATE Categorias SET 
            Descripcion = ?
            WHERE IdCategoria = ?
        `;
        const [result] = await pool.query(query, [Descripcion, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        return res.status(200).json({ message: "Categoría actualizada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        return res.status(500).json({ message: 'Error al actualizar categoría', error: error.message });
    }
});
router.put('/AltaLogicaCategorias', async (req, res) => {
    const { id } = req.body; // Obtener el ID de la categoría a actualizar

    try {
        const query = 'UPDATE Categorias SET Estado = 1 WHERE IdCategoria = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        return res.status(200).json({ message: "Categoría activada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado de la categoría:', error);
        return res.status(500).json({ message: 'Error al actualizar categoría', error: error.message });
    }
});
router.put('/BajaLogicaCategorias', async (req, res) => {
    const { id } = req.body; // Obtener el ID de la categoría a actualizar

    try {
        const query = 'UPDATE Categorias SET Estado = 0 WHERE IdCategoria = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        return res.status(200).json({ message: "Categoría desactivada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado de la categoría:', error);
        return res.status(500).json({ message: 'Error al actualizar categoría', error: error.message });
    }
});




export default router;