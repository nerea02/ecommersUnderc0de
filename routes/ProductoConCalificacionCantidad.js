import { Router } from "express";
import { pool } from "../db.js"; // Asegúrate de que 'pool' se está importando correctamente

const router = Router();

router.put('/AgregarProductoCantidadCalificacion', async (req, res) => {
    let { nombre, descripcion, color, categoria, cantidad, talle, precio, calificacion } = req.body;

    // Asignar valor predeterminado a talle si está vacío
    if (!talle) {
      talle = 4;  // Si talle está vacío, asignamos 4
    }

    // Asegurarse de que precio esté en formato decimal
    precio = parseFloat(precio); // Convertir a decimal en caso de que no esté en formato correcto

    console.log("Datos recibidos:", req.body);

    try {
        const idCalificacionProducto = 1;

        const productoQuery = `
            INSERT INTO Productos (IdCategoria, IdCalificacionProducto, Nombre, Descripcion, Precio, Imagen)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const [productoResult] = await pool.query(productoQuery, [categoria, idCalificacionProducto, nombre, descripcion, precio, "default_image.jpg"]);
        const idProducto = productoResult.insertId;

        const cantidadQuery = `
            INSERT INTO VariantesProductos (IdProducto, Cantidad, IdTalle, IdColor)
            VALUES (?, ?, ?, ?)
        `;
        await pool.query(cantidadQuery, [idProducto, cantidad, talle, color]);

        res.json({ message: "Producto, cantidad y calificación agregados correctamente", idProducto });
    } catch (error) {
        console.error("Error al agregar producto:", error);
        res.status(500).json({ error: "Error al agregar producto, cantidad o calificación." });
    }
});

export default router;