import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
 // Obtener todos los métodos de pago
 router.get('/metodopago', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM metodopago');
    res.json(rows);
});
// Cargar nuevo método de pago
router.post('/nuevoMetodoPago', async (req, res) => {
    const { descripciones } = req.body; // Esperamos un array de descripciones

    if (!Array.isArray(descripciones) || descripciones.length === 0) {
        return res.status(400).json({ message: "Debe proporcionar una lista válida de descripciones de métodos de pago" });
    }

    try {
        // Generamos los valores a insertar
        const values = descripciones.map(descripcion => [descripcion]);

        // Query para insertar múltiples filas
        const query = `INSERT INTO metodopago (Descripcion) VALUES ?`;

        // Ejecutamos la consulta
        const [result] = await pool.query(query, [values]);

        return res.status(201).json({
            message: 'Métodos de pago insertados exitosamente',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error('Error al insertar métodos de pago:', error);
        return res.status(500).json({ message: 'Ocurrió un error al guardar los métodos de pago', error: error.message });
    }
});
router.put('/actualizarMetodoPago/:id', async (req, res) => {
    const { id } = req.params;
    const { Descripcion } = req.body;

    if (!Descripcion) {
        return res.status(400).json({ message: "La descripción es obligatoria" });
    }

    try {
        const query = 'UPDATE MetodoPago SET Descripcion = ? WHERE IdMetodoPago = ?';
        const [result] = await pool.query(query, [Descripcion, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Método de pago no encontrado" });
        }

        return res.status(200).json({ message: "Método de pago actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar método de pago:', error);
        return res.status(500).json({ message: 'Error al actualizar método de pago', error: error.message });
    }
});
router.put('/AltaLogicaMetodoPago', async (req, res) => {
    const { id } = req.body; // Obtener el ID del método de pago a actualizar

    try {
        const query = 'UPDATE MetodoPago SET Estado = 1 WHERE IdMetodoPago = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Método de pago no encontrado" });
        }

        return res.status(200).json({ message: "Método de pago activado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del método de pago:', error);
        return res.status(500).json({ message: 'Error al actualizar método de pago', error: error.message });
    }
});
router.put('/BajaLogicaMetodoPago', async (req, res) => {
    const { id } = req.body; // Obtener el ID del método de pago a actualizar

    try {
        const query = 'UPDATE MetodoPago SET Estado = 0 WHERE IdMetodoPago = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Método de pago no encontrado" });
        }

        return res.status(200).json({ message: "Método de pago desactivado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del método de pago:', error);
        return res.status(500).json({ message: 'Error al actualizar método de pago', error: error.message });
    }
});

export default router;