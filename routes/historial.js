import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
 //Obtener Historial
 router.get('/historial', async (req, res) => {
    const [rows] = await pool.query('select * from historial');
    res.status(200).json(rows);
});
// Cargar nuevo historial
router.post('/nuevoHistorial', async (req, res) => {
    const { registros } = req.body; // Se espera un array de objetos con los datos de cada historial

    if (!Array.isArray(registros) || registros.length === 0) {
        return res.status(400).json({ message: "Se espera un una lista valida" });
    }

    try {
        // Mapeamos los registros y generamos los valores a insertar
        const values = registros.map(({ IdCliente, IdReintegro, Fecha, IdMetodoPago }) => [IdCliente, IdReintegro, Fecha, IdMetodoPago]);

        // Query para insertar múltiples filas
        const query = `INSERT INTO historial (IdCliente, IdReintegro, Fecha, IdMetodoPago) VALUES ?`;

        // Ejecutamos la consulta
        const [result] = await pool.query(query, [values]);

        return res.status(201).json({ 
            message: 'Historial insertado exitosamente', 
            affectedRows: result.affectedRows 
        });
    } catch (error) {
        console.error('Error al insertar historial:', error);
        return res.status(500).json({ message: 'Error al guardar el historial', error: error.message });
    }
});
router.put('/actualizarHistorial/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del historial a actualizar
    const { IdCliente, IdReintegro, IdMetodoPago } = req.body; // Obtener los nuevos valores

    // Validar que al menos uno de los campos no esté vacío
    if (IdCliente === undefined && IdReintegro === undefined && IdMetodoPago === undefined) {
        return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
    }

    const updates = [];
    const params = [];

    if (IdCliente !== undefined) {
        updates.push('IdCliente = ?');
        params.push(IdCliente);
    }
    if (IdReintegro !== undefined) {
        updates.push('IdReintegro = ?');
        params.push(IdReintegro);
    }
    if (IdMetodoPago !== undefined) {
        updates.push('IdMetodoPago = ?');
        params.push(IdMetodoPago);
    }

    // Agregar el ID al final de los parámetros
    params.push(id);

    // Crear la consulta dinámica
    const query = `
        UPDATE Historial SET 
        ${updates.join(', ')}
        WHERE IdHistorial = ?
    `;

    try {
        const [result] = await pool.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Historial no encontrado" });
        }

        return res.status(200).json({ message: "Historial actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar historial:', error);
        return res.status(500).json({ message: 'Error al actualizar historial', error: error.message });
    }
});
router.put('/AltaLogicaHistorial', async (req, res) => {
    const { id } = req.body; // Obtener el ID del historial a actualizar

    try {
        const query = 'UPDATE Historial SET Estado = 1 WHERE IdHistorial = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Historial no encontrado" });
        }

        return res.status(200).json({ message: "Historial activado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del historial:', error);
        return res.status(500).json({ message: 'Error al actualizar historial', error: error.message });
    }
});
router.put('/BajaLogicaHistorial', async (req, res) => {
    const { id } = req.body; // Obtener el ID del historial a actualizar

    try {
        const query = 'UPDATE Historial SET Estado = 0 WHERE IdHistorial = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Historial no encontrado" });
        }

        return res.status(200).json({ message: "Historial desactivado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del historial:', error);
        return res.status(500).json({ message: 'Error al actualizar historial', error: error.message });
    }
});


export default router;