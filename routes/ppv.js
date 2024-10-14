import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
  // Obtener productos por venta
  router.get('/productosporventa', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM productosporventa');
    res.json(rows);
});
// Insertar productos por ventas
router.post('/productosporventas', async (req, res) => {
    const { productos } = req.body; // Suponiendo que envías un array de productos

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: 'Debe proporcionar una lista de productos válida' });
    }

    try {
        // Crear la query base
        let query = 'INSERT INTO productosporventas (IdHistorial, IdVariante, Cantidad, Precio) VALUES ';
        const values = [];
        
        // Generar las filas dinámicamente
        productos.forEach((producto, index) => {
            query += `(?, ?, ?, ?)${index === productos.length - 1 ? '' : ','}`;
            values.push(producto.IdHistorial, producto.IdVariante, producto.Cantidad, producto.Precio);
        });

        // Ejecutar la consulta
        const [result] = await pool.query(query, values);

        res.status(201).json({ message: 'Productos insertados exitosamente', insertedRows: result.affectedRows });
    } catch (error) {
        res.status(500).json({ error: 'Error al insertar los productos por ventas' });
    }
});
router.put('/actualizarProductoPorVenta/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del producto por venta a actualizar
    const { IdHistorial, IdVariante, Cantidad, Precio } = req.body; // Obtener los nuevos valores

    // Validar que al menos uno de los campos no esté vacío
    if (IdHistorial === undefined && IdVariante === undefined && Cantidad === undefined && Precio === undefined) {
        return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
    }

    const updates = [];
    const params = [];

    if (IdHistorial !== undefined) {
        updates.push('IdHistorial = ?');
        params.push(IdHistorial);
    }
    if (IdVariante !== undefined) {
        updates.push('IdVariante = ?');
        params.push(IdVariante);
    }
    if (Cantidad !== undefined) {
        updates.push('Cantidad = ?');
        params.push(Cantidad);
    }
    if (Precio !== undefined) {
        updates.push('Precio = ?');
        params.push(Precio);
    }

    // Agregar el ID al final de los parámetros
    params.push(id);

    // Crear la consulta dinámica
    const query = `
        UPDATE ProductosPorVentas SET 
        ${updates.join(', ')}
        WHERE IdProductosPorVenta = ?
    `;

    try {
        const [result] = await pool.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto por venta no encontrado" });
        }

        return res.status(200).json({ message: "Producto por venta actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar producto por venta:', error);
        return res.status(500).json({ message: 'Error al actualizar producto por venta', error: error.message });
    }
});
router.put('/AltaLogicaProductosPorVentas', async (req, res) => {
    const { id } = req.body; // Obtener el ID del producto por venta a actualizar

    try {
        const query = 'UPDATE ProductosPorVentas SET Estado = 1 WHERE IdProductosPorVenta = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto por venta no encontrado" });
        }

        return res.status(200).json({ message: "Producto por venta activado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del producto por venta:', error);
        return res.status(500).json({ message: 'Error al actualizar producto por venta', error: error.message });
    }
});
router.put('/BajaLogicaProductosPorVentas', async (req, res) => {
    const { id } = req.body; // Obtener el ID del producto por venta a actualizar

    try {
        const query = 'UPDATE ProductosPorVentas SET Estado = 0 WHERE IdProductosPorVenta = ?';
        const [result] = await pool.query(query, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto por venta no encontrado" });
        }

        return res.status(200).json({ message: "Producto por venta desactivado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar el estado del producto por venta:', error);
        return res.status(500).json({ message: 'Error al actualizar producto por venta', error: error.message });
    }
});
router.get('/HistorialProductosPorVentas', async (req, res) => {
    try {
        const [rows] = await pool.query(
            `SELECT ppv.IdProductosPorVenta, ppv.Cantidad, ppv.Precio, h.IdHistorial, h.Fecha AS FechaHistorial, h.IdCliente, h.IdReintegro, h.IdMetodoPago  FROM  ProductosPorVentas AS ppv LEFT JOIN Historial AS h ON ppv.IdHistorial = h.IdHistorial`
        );

        res.json(rows);
    } catch (error) {
        console.error('Error al obtener historial y productos por ventas:', error);
        res.status(500).json({ message: 'Error al obtener historial y productos por ventas', error: error.message });
    }
});

export default router;