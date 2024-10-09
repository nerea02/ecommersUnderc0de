import { Router } from "express";
import { pool } from "../db.js";

const router = Router();
//gets

    //Obtener niveles
router.get('/nivel', async (req, res) => {
    const [rows] = await pool.query('select * from niveles');
    res.json(rows);
});
    //Obtener Historial
    router.get('/historial', async (req, res) => {
        const [rows] = await pool.query('select * from historial');
        res.status(200).json(rows);
    });
// Obtener todas las calificaciones por producto
router.get('/calificaciones', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM calificacionporproducto');
    res.json(rows);
});
// Obtener todas las categorías
router.get('/categorias', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM categorias');
    res.json(rows);
});
// Obtener todos los clientes
router.get('/clientes', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
});
// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
});
// Obtener todos los métodos de pago
router.get('/metodopago', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM metodopago');
    res.json(rows);
});
// Obtener productos por venta
router.get('/productosporventa', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM productosporventa');
    res.json(rows);
});

// Obtener todos los productos
router.get('/productos', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM productos');
    res.json(rows);
});

// Obtener todos los reintegros
router.get('/reintegros', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM reintegro');
    res.json(rows);
});

// Obtener todos los talles
router.get('/talles', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM talle');
    res.json(rows);
});

// Obtener todos los colores
router.get('/colores', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM colores');
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

// Cargar calificación por producto
router.post('/nuevaCalificacion', async (req, res) => {
    const { idProducto, calificacion, comentario } = req.body;
    if (!idProducto || !calificacion || comentario.trim() === "") {
        return res.status(400).json({ message: "Campos requeridos vacíos" });
    }
    try {
        const [result] = await pool.query('INSERT INTO calificaciones (idProducto, calificacion, comentario) VALUES (?, ?, ?)', 
            [idProducto, calificacion, comentario]);
        return res.status(201).json({ message: "Calificación cargada exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar la calificación" + error });
    }
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

// Cargar nuevo cliente
router.post('/nuevoCliente', async (req, res) => {
    const { IdSexo, IdNivel, Estado, DNI, Nombre, Apellido, Email, Tel, Contraseña } = req.body;

    // Validamos que no falten datos
    if (!IdSexo || !IdNivel || !DNI || !Nombre || !Apellido || !Email || !Tel || !Contraseña) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        // Consulta SQL para insertar un cliente
        const query = 'INSERT INTO Clientes (IdSexo, IdNivel, Estado, DNI, Nombre, Apellido, Email, Tel, Contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const [result] = await pool.query(query, [IdSexo, IdNivel, Estado, DNI, Nombre, Apellido, Email, Tel, Contraseña]);

        // Devolvemos una respuesta con éxito
        return res.status(201).json({
            message: 'Cliente insertado exitosamente',
            IdCliente: result.insertId,
        });
    } catch (error) {
        console.error('Error al insertar cliente:', error);
        return res.status(500).json({ message: 'Error al guardar el cliente', error: error.message });
    }
});

// Cargar nuevo usuario
router.post('/nuevoUsuario', async (req, res) => {
    const { nombreUsuario, password } = req.body;
    if (!nombreUsuario || !password) {
        return res.status(400).json({ message: "Campos requeridos vacíos" });
    }
    try {
        const [result] = await pool.query('INSERT INTO usuarios (nombre, password) VALUES (?, ?)', [nombreUsuario, password]);
        return res.status(201).json({ message: "Usuario cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el usuario" + error });
    }
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

// Cargar nuevo producto
router.post('/nuevoProducto', async (req, res) => {
    const { productos } = req.body; // Esperamos un array de productos

    if (!Array.isArray(productos) || productos.length === 0) {
        return res.status(400).json({ message: "Debe proporcionar una lista válida de productos" });
    }

    try {
        // Generamos los valores a insertar
        const values = productos.map(({ IdCategoria, IdCalificacionProducto, Estado, Nombre, Descripcion, Precio }) => 
            [IdCategoria, IdCalificacionProducto, Estado, Nombre, Descripcion, Precio]
        );

        // Query para insertar múltiples filas
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

// Cargar nuevo talle
router.post('/nuevoTalle', async (req, res) => {
    const { descripcionTalle } = req.body;
    if (!descripcionTalle || descripcionTalle.trim() === "") {
        return res.status(400).json({ message: "El campo de descripción del talle no puede estar vacío" });
    }
    try {
        const [result] = await pool.query('INSERT INTO talle (descripcion) VALUES (?)', [descripcionTalle]);
        return res.status(201).json({ message: "Talle cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el talle" + error });
    }
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

// Cargar nueva variante de producto
router.post('/nuevaVariante', async (req, res) => {
    const { IdTalle, IdProducto, IdColor, Cantidad } = req.body;

    if (IdTalle === undefined || IdProducto === undefined || IdColor === undefined || Cantidad === undefined) {
        return res.status(400).json({ message: "Todos los campos son obligatorios." });
    }

    try {
        // Insertar una nueva variante de producto
        const query = 'INSERT INTO VariantesProductos (IdTalle, IdProducto, IdColor, Cantidad) VALUES (?, ?, ?, ?)';
        const [result] = await pool.query(query, [IdTalle, IdProducto, IdColor, Cantidad]);

        return res.status(201).json({
            message: 'Variante de producto insertada exitosamente',
            IdVariante: result.insertId, // Retornamos el ID de la variante insertada
        });
    } catch (error) {
        console.error('Error al insertar variante de producto:', error);
        return res.status(500).json({ message: 'Ocurrió un error al guardar la variante de producto', error: error.message });
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
router.put('/actualizarSexo/:id', async (req, res) => {
    const { id } = req.params;
    const { Descripcion } = req.body;

    if (!Descripcion) {
        return res.status(400).json({ message: "La descripción es obligatoria" });
    }

    try {
        const query = 'UPDATE Sexo SET Descripcion = ? WHERE IdSexo = ?';
        const [result] = await pool.query(query, [Descripcion, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Sexo no encontrado" });
        }

        return res.status(200).json({ message: "Sexo actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar sexo:', error);
        return res.status(500).json({ message: 'Error al actualizar sexo', error: error.message });
    }
});
router.put('/actualizarCliente/:id', async (req, res) => {
    const { id } = req.params;
    const { IdSexo, IdNivel, Estado, DNI, Nombre, Apellido, Email, Tel, Contraseña } = req.body;

    if (!DNI || !Nombre || !Apellido || !Email || !Tel || !Contraseña) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const query = `
            UPDATE Clientes SET 
            IdSexo = ?, 
            IdNivel = ?, 
            Estado = ?, 
            DNI = ?, 
            Nombre = ?, 
            Apellido = ?, 
            Email = ?, 
            Tel = ?, 
            Contraseña = ? 
            WHERE IdCliente = ?
        `;
        const [result] = await pool.query(query, [IdSexo, IdNivel, Estado, DNI, Nombre, Apellido, Email, Tel, Contraseña, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        return res.status(200).json({ message: "Cliente actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        return res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
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
router.put('/actualizarVariante/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la variante a actualizar
    const { IdTalle, IdProducto, IdColor, Cantidad } = req.body; // Obtener los nuevos valores

    // Validar que los campos no estén vacíos
    if (IdTalle === undefined || IdProducto === undefined || IdColor === undefined || Cantidad === undefined) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        const query = `
            UPDATE VariantesProductos SET 
            IdTalle = ?, 
            IdProducto = ?, 
            IdColor = ?, 
            Cantidad = ? 
            WHERE IdVariante = ?
        `;
        const [result] = await pool.query(query, [IdTalle, IdProducto, IdColor, Cantidad, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Variante de producto no encontrada" });
        }

        return res.status(200).json({ message: "Variante de producto actualizada exitosamente" });
    } catch (error) {
        console.error('Error al actualizar variante de producto:', error);
        return res.status(500).json({ message: 'Error al actualizar variante de producto', error: error.message });
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
router.put('/actualizarTalle/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del talle a actualizar
    const { Talle } = req.body; // Obtener el nuevo valor de Talle

    // Validar que el campo Talle no esté vacío
    if (!Talle || Talle.trim() === "") {
        return res.status(400).json({ message: "El campo Talle no puede estar vacío" });
    }

    try {
        const query = `
            UPDATE Talle SET 
            Talle = ?
            WHERE IdTalle = ?
        `;
        const [result] = await pool.query(query, [Talle, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Talle no encontrado" });
        }

        return res.status(200).json({ message: "Talle actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar talle:', error);
        return res.status(500).json({ message: 'Error al actualizar talle', error: error.message });
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
router.put('/actualizarProducto/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del producto a actualizar
    const { IdCategoria, IdCalificacionProducto, Estado, Nombre, Descripcion, Precio } = req.body; // Obtener los nuevos valores

    // Validar que al menos uno de los campos no esté vacío
    if (IdCategoria === undefined && IdCalificacionProducto === undefined && Estado === undefined && 
        Nombre === undefined && Descripcion === undefined && Precio === undefined) {
        return res.status(400).json({ message: "Se debe proporcionar al menos un campo para actualizar" });
    }

    const updates = [];
    const params = [];

    if (IdCategoria !== undefined) {
        updates.push('IdCategoria = ?');
        params.push(IdCategoria);
    }
    if (IdCalificacionProducto !== undefined) {
        updates.push('IdCalificacionProducto = ?');
        params.push(IdCalificacionProducto);
    }
    if (Estado !== undefined) {
        updates.push('Estado = ?');
        params.push(Estado);
    }
    if (Nombre !== undefined) {
        updates.push('Nombre = ?');
        params.push(Nombre);
    }
    if (Descripcion !== undefined) {
        updates.push('Descripcion = ?');
        params.push(Descripcion);
    }
    if (Precio !== undefined) {
        updates.push('Precio = ?');
        params.push(Precio);
    }

    // Agregar el ID al final de los parámetros
    params.push(id);

    // Crear la consulta dinámica
    const query = `
        UPDATE Productos SET 
        ${updates.join(', ')}
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


//Delete

router.delete('/eliminarNivel/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del nivel a eliminar

    try {
        const [result] = await pool.query('DELETE FROM Niveles WHERE IdNivel = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Nivel no encontrado" });
        }

        return res.status(200).json({ message: "Nivel eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar nivel:', error);
        return res.status(500).json({ message: 'Error al eliminar nivel', error: error.message });
    }
});
router.delete('/eliminarSexo/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del sexo a eliminar

    try {
        const [result] = await pool.query('DELETE FROM Sexo WHERE IdSexo = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Sexo no encontrado" });
        }

        return res.status(200).json({ message: "Sexo eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar sexo:', error);
        return res.status(500).json({ message: 'Error al eliminar sexo', error: error.message });
    }
});
router.delete('/eliminarCliente/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del cliente a eliminar

    try {
        const [result] = await pool.query('DELETE FROM Clientes WHERE IdCliente = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        return res.status(200).json({ message: "Cliente eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar cliente:', error);
        return res.status(500).json({ message: 'Error al eliminar cliente', error: error.message });
    }
});
router.delete('/eliminarMetodoPago/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del método de pago a eliminar

    try {
        const [result] = await pool.query('DELETE FROM MetodoPago WHERE IdMetodoPago = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Método de pago no encontrado" });
        }

        return res.status(200).json({ message: "Método de pago eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar método de pago:', error);
        return res.status(500).json({ message: 'Error al eliminar método de pago', error: error.message });
    }
});
router.delete('/eliminarReintegro/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del reintegro a eliminar

    try {
        const [result] = await pool.query('DELETE FROM Reintegro WHERE IdReintegro = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Reintegro no encontrado" });
        }

        return res.status(200).json({ message: "Reintegro eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar reintegro:', error);
        return res.status(500).json({ message: 'Error al eliminar reintegro', error: error.message });
    }
});
router.delete('/eliminarCategoria/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la categoría a eliminar

    try {
        const [result] = await pool.query('DELETE FROM Categorias WHERE IdCategoria = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        return res.status(200).json({ message: "Categoría eliminada exitosamente" });
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        return res.status(500).json({ message: 'Error al eliminar categoría', error: error.message });
    }
});
router.delete('/eliminarCalificacion/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID de la calificación a eliminar

    try {
        const [result] = await pool.query('DELETE FROM CalificacionPorProducto WHERE IdCalificacionProducto = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Calificación no encontrada" });
        }

        return res.status(200).json({ message: "Calificación eliminada exitosamente" });
    } catch (error) {
        console.error('Error al eliminar calificación:', error);
        return res.status(500).json({ message: 'Error al eliminar calificación', error: error.message });
    }
});
router.delete('/eliminarTalle/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del talle a eliminar

    try {
        const [result] = await pool.query('DELETE FROM Talle WHERE IdTalle = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Talle no encontrado" });
        }

        return res.status(200).json({ message: "Talle eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar talle:', error);
        return res.status(500).json({ message: 'Error al eliminar talle', error: error.message });
    }
});
router.delete('/eliminarColor/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del color a eliminar

    try {
        const [result] = await pool.query('DELETE FROM Colores WHERE IdColor = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Color no encontrado" });
        }

        return res.status(200).json({ message: "Color eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar color:', error);
        return res.status(500).json({ message: 'Error al eliminar color', error: error.message });
    }
});
router.delete('/eliminarHistorial/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del historial a eliminar

    try {
        const [result] = await pool.query('DELETE FROM Historial WHERE IdHistorial = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Historial no encontrado" });
        }

        return res.status(200).json({ message: "Historial eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar historial:', error);
        return res.status(500).json({ message: 'Error al eliminar historial', error: error.message });
    }
});
router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del registro a eliminar

    try {
        const [result] = await pool.query('DELETE FROM ProductosPorVentas WHERE IdProductosPorVenta = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        return res.status(200).json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar registro de ProductosPorVentas:', error);
        return res.status(500).json({ message: 'Error al eliminar registro', error: error.message });
    }
});
router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del registro a eliminar

    try {
        const [result] = await pool.query('DELETE FROM Productos WHERE IdProducto = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        return res.status(200).json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar registro de Productos:', error);
        return res.status(500).json({ message: 'Error al eliminar registro', error: error.message });
    }
});
// Ruta para eliminar un registro de VariantesProductos
router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del registro a eliminar

    try {
        const [result] = await pool.query(
            'DELETE FROM VariantesProductos WHERE IdVariante = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        return res.status(200).json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar registro de VariantesProductos:', error);
        return res.status(500).json({ message: 'Error al eliminar registro', error: error.message });
    }
});
// Ruta para eliminar un registro de Usuario
router.delete('/eliminar/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del registro a eliminar

    try {
        const [result] = await pool.query(
            'DELETE FROM Usuario WHERE IdUsuario = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        return res.status(200).json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        console.error('Error al eliminar registro de Usuario:', error);
        return res.status(500).json({ message: 'Error al eliminar registro', error: error.message });
    }
});


//consultas
//gets

    //Obtener Cliente y el sexo
    router.get('/ClienteXSexo', async (req, res) => {
        const [rows] = await pool.query('select c.DNI, c.Nombre, c.Apellido, c.Email, c.Estado, s.Descripcion from clientes as C inner join sexo s ON s.IdSexo =c.IdSexo ');
        res.json(rows);
    });
//Obtener Cliente que tiene baja logica
router.get('/ClientesInactivos', async (req, res) => {
    const [rows] = await pool.query('select * from clientes c  where c.Estado =0 ');
    res.json(rows);
});
//Obtener Cliente Activos
router.get('/ClientesActivos', async (req, res) => {
    const [rows] = await pool.query('select * from clientes c  where c.Estado =1 ');
    res.json(rows);
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