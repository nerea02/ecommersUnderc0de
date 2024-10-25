import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
 // Obtener todas las calificaciones por producto
 router.get('/calificaciones', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM calificacionporproducto');
    res.json(rows);
});
// Cargar calificación por producto
router.post('/nuevaCalificacion', async (req, res) => {
    const { idProducto, calificacion} = req.body;
    if (!idProducto || !calificacion ) {
        return res.status(400).json({ message: "Campos requeridos vacíos" });
    }
    try {
        const [result] = await pool.query('INSERT INTO calificacionporproducto (idProducto, calificacion) VALUES (?, ?)', 
            [idProducto, calificacion]);
        return res.status(201).json({ message: "Calificación cargada exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar la calificación" + error });
    }
});
router.put('/actualizarCalificacion/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la calificación a actualizar
    const { IdProducto, Calificacion } = req.body; // Obtener los nuevos valores

    // Validar que la calificación sea un número válido entre 1 y 5
    if (Calificacion === undefined || typeof Calificacion !== 'number' || Calificacion < 1 || Calificacion > 5) {
        return res.status(400).json({ message: "La calificación debe ser un número entre 1 y 5" });
    }

    try {
        const query = `
            UPDATE CalificacionPorProducto SET 
            IdProducto = ?, 
            Calificacion = ?
            WHERE IdCalificacionProducto = ?
        `;
        const [result] = await pool.query(query, [IdProducto, Calificacion, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Calificación no encontrada" });
        }

        return res.status(200).json({ message: "Calificación actualizada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar calificación:', error);
        return res.status(500).json({ message: 'Error al actualizar calificación', error: error.message });
    }
});
//La función AVG() calcula el promedio de las calificaciones de cada producto.
//El GROUP BY asegura que las calificaciones se agrupen por producto.
//Si un producto no tiene calificaciones, puedes manejarlo mostrando un valor NULL o ajustar la consulta para mostrar un valor predeterminado.
router.get('/ProductosConCalificaciones', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT p.Nombre AS Producto,p.Descripcion,p.Precio,p.Estado, AVG(c.Calificacion) AS CalificacionPromedio FROM Productos AS p INNER JOIN CalificacionPorProducto AS c ON p.IdProducto = c.IdProducto GROUP BY 
                p.IdProducto, p.Nombre, p.Descripcion, p.Precio, p.Estado`
        );

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener los productos con calificaciones:', error);
        res.status(500).json({ message: 'Error al obtener los productos con calificaciones', error: error.message });
    }
});
router.put('/AltaLogicaCalificacionPorProducto', async (req, res) => {
    const { id } = req.body; // Obtener el ID de la calificación a actualizar

    try {
        const query = 'UPDATE CalificacionPorProducto SET Estado = 1 WHERE IdCalificacionProducto = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Calificación no encontrada" });
        }

        return res.status(200).json({ message: "Calificación activada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado de la calificación:', error);
        return res.status(500).json({ message: 'Error al actualizar calificación', error: error.message });
    }
});
router.put('/BajaLogicaCalificacionPorProducto', async (req, res) => {
    const { id } = req.body; // Obtener el ID de la calificación a actualizar

    try {
        const query = 'UPDATE CalificacionPorProducto SET Estado = 0 WHERE IdCalificacionProducto = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Calificación no encontrada" });
        }

        return res.status(200).json({ message: "Calificación desactivada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado de la calificación:', error);
        return res.status(500).json({ message: 'Error al actualizar calificación', error: error.message });
    }
});


export default router;