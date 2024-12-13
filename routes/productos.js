import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

// Obtener todos los productos
router.get('/productos', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
});

// Cargar nuevo producto
router.post('/nuevoProducto', async (req, res) => {
    const { productos } = req.body; 

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: "Debe proporcionar una lista válida de productos" });
    }

    try {
        const values = productos.map(({ IdCategoria, IdCalificacionProducto, Estado, Nombre, Descripcion, Precio }) => 
            [IdCategoria, IdCalificacionProducto, Estado, Nombre, Descripcion, Precio]
        );

        const query = `INSERT INTO productos (IdCategoria, IdCalificacionProducto, Estado, Nombre, Descripcion, Precio) VALUES ?`;

        // Ejecutamos la consulta
        const [result] = await pool.query(query, [values]);

        return res.status(201).json({
            message: 'Productos insertados exitosamente',
            affectedRows: result.affectedRows
        });
    } catch (error) {
        console.error('Error al insertar productos:', error);
        return res.status(500).json({ message: 'Ocurrió un error al guardar los productos', error: error.message });
    }
});

// Actualizar producto
router.put('/actualizarProducto/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del producto a actualizar
    const { IdCategoria, Nombre, Descripcion, Imagen, Precio } = req.body; // Obtener los nuevos valores

    // Validar que al menos uno de los campos no esté vacío
    if (IdCategoria === undefined && Nombre === undefined && Descripcion === undefined && 
        Imagen === undefined && Precio === undefined) {
        return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
    }

    const updates = [];
    const params = [];

    if (IdCategoria !== undefined) {
        updates.push('IdCategoria = ?');
        params.push(IdCategoria);
    }
    if (Nombre !== undefined) {
        updates.push('Nombre = ?');
        params.push(Nombre);
    }
    if (Descripcion !== undefined) {
        updates.push('Descripcion = ?');
        params.push(Descripcion);
    }
    if (Imagen !== undefined) {
        updates.push('Imagen = ?');
        params.push(Imagen);
    }
    if (Precio !== undefined) {
        updates.push('Precio = ?');
        params.push(Precio);
    }

    // Agregar el ID al final de los parámetros
    params.push(id);

    // Crear la consulta dinámica
    const query = `
        UPDATE productos 
        SET ${updates.join(', ')} 
        WHERE IdProducto = ?
    `;

    try {
        const [result] = await pool.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.status(200).json({ message: "Producto actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        return res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
});

// Alta lógica de producto
router.put('/AltaLogicaProductos', async (req, res) => {
    const { id } = req.body; // Obtener el ID del producto a actualizar

    try {
        const query = 'UPDATE Productos SET Estado = 1 WHERE IdProducto = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.status(200).json({ message: "Producto activado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del producto:', error);
        return res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
});

// Baja lógica de producto
router.put('/BajaLogicaProductos', async (req, res) => {
    const { id } = req.body; // Obtener el ID del producto a actualizar

    try {
        const query = 'UPDATE Productos SET Estado = 0 WHERE IdProducto = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        return res.status(200).json({ message: "Producto desactivado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del producto:', error);
        return res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
});

export default router;
