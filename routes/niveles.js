import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

    //Obtener niveles
    router.get('/nivel', async (req, res) => {
        const [rows] = await pool.query('select * from niveles');
        res.json(rows);
    });
//posts
//cargar nivel
router.post('/nuevoNivel', async (req, res) => {
    const { Descripcion } = req.body; // Se extrae el campo 'Descripcion' desde el body de la solicitud

    // Validar que el campo Descripcion no esté vacío
    if (!Descripcion || Descripcion.trim() === "") {
        return res.status(400).json({ message: "El campo 'Descripcion' es obligatorio" });
    }

    try {
        // Insertar nuevo nivel en la tabla 'Niveles'
        const [result] = await pool.query('INSERT INTO Niveles (Descripcion) VALUES (?)', [Descripcion]);

        return res.status(201).json({ 
            message: 'Nivel creado exitosamente',
            nivelId: result.insertId // Devolver el ID del nuevo nivel creado
        });
    } catch (error) {
        console.error('Error al insertar nivel:', error);
        return res.status(500).json({ message: 'Error al guardar el nivel', error: error});
    }
});
//update
// Ruta para actualizar un nivel
router.put('/actualizarNivel/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del nivel a actualizar
    const { Descripcion } = req.body; // Obtener la nueva descripción

    if (!Descripcion) {
        return res.status(400).json({ message: "La descripción es obligatoria" });
    }

    try {
        const query = 'UPDATE Niveles SET Descripcion = ? WHERE IdNivel = ?';
        const [result] = await pool.query(query, [Descripcion, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nivel no encontrado" });
        }

        return res.status(200).json({ message: "Nivel actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar nivel:', error);
        return res.status(500).json({ message: 'Error al actualizar nivel', error: error.message });
    }
});

//actualizar estado

router.put('/BajaLogicaNivel', async (req, res) => {
    const { id } = req.body; // Obtener el ID del nivel a actualizar
   

    try {
        const query = 'UPDATE Niveles SET Estado = 0 WHERE IdNivel = ?';
        const [result] = await pool.query(query, [ id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nivel no encontrado" });
        }

        return res.status(200).json({ message: "Nivel actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar nivel:', error);
        return res.status(500).json({ message: 'Error al actualizar nivel', error: error.message });
    }
});
router.put('/AltaLogicaNivel', async (req, res) => {
    const { id } = req.body; // Obtener el ID del nivel a actualizar
   

    try {
        const query = 'UPDATE Niveles SET Estado = 1 WHERE IdNivel = ?';
        const [result] = await pool.query(query, [ id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nivel no encontrado" });
        }

        return res.status(200).json({ message: "Nivel actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar nivel:', error);
        return res.status(500).json({ message: 'Error al actualizar nivel', error: error.message });
    }
});

    export default router;