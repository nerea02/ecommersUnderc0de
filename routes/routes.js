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
router.get('/metodos-pago', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM metodos_pago');
    res.json(rows);
});
// Obtener productos por venta
router.get('/productos-venta', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM productos_venta');
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
    const [rows] = await pool.query('SELECT * FROM color');
    res.json(rows);
});


//posts
//cargar nivel
router.post('/NuevoNivel', async (req, res) => {

    const {DescripcionNivel}= req.body;
    if( DescripcionNivel.trim() === "" ||!DescripcionNivel){
        return res.status(400).json({message: "se espera campos que no esten vacios"})
    }
    try {
        const [result] = await pool.query('INSERT INTO niveles (descripcion) VALUES (?)', [DescripcionNivel]);

        return res.status(201).json({message: "Ha sido cargado exitosamente"})
    } catch (error) {
       
        console.error(error)
        return res.status(500).json({message: "Error para guardar la solicitud" + error})
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
    const { nombreCliente, email } = req.body;
    if (!nombreCliente || !email) {
        return res.status(400).json({ message: "Faltan campos requeridos" });
    }
    try {
        const [result] = await pool.query('INSERT INTO clientes (nombre, email) VALUES (?, ?)', [nombreCliente, email]);
        return res.status(201).json({ message: "Cliente cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el cliente" + error });
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
    const { idCliente, idProducto, fechaCompra } = req.body;
    if (!idCliente || !idProducto || !fechaCompra) {
        return res.status(400).json({ message: "Campos requeridos vacíos" });
    }
    try {
        const [result] = await pool.query('INSERT INTO historial (idCliente, idProducto, fechaCompra) VALUES (?, ?, ?)', 
            [idCliente, idProducto, fechaCompra]);
        return res.status(201).json({ message: "Historial cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el historial" + error });
    }
});

// Cargar nuevo método de pago
router.post('/nuevoMetodoPago', async (req, res) => {
    const { tipoMetodo } = req.body;
    if (!tipoMetodo) {
        return res.status(400).json({ message: "El método de pago es requerido" });
    }
    try {
        const [result] = await pool.query('INSERT INTO metodos_pago (tipo) VALUES (?)', [tipoMetodo]);
        return res.status(201).json({ message: "Método de pago cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el método de pago" + error });
    }
});

// Cargar nuevo producto
router.post('/nuevoProducto', async (req, res) => {
    const { nombreProducto, precio } = req.body;
    if (!nombreProducto || !precio) {
        return res.status(400).json({ message: "Campos requeridos vacíos" });
    }
    try {
        const [result] = await pool.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombreProducto, precio]);
        return res.status(201).json({ message: "Producto cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el producto" + error });
    }
});

// Cargar nuevo reintegro
router.post('/nuevoReintegro', async (req, res) => {
    const { idVenta, motivo } = req.body;
    if (!idVenta || motivo.trim() === "") {
        return res.status(400).json({ message: "Campos requeridos vacíos" });
    }
    try {
        const [result] = await pool.query('INSERT INTO reintegro (idVenta, motivo) VALUES (?, ?)', [idVenta, motivo]);
        return res.status(201).json({ message: "Reintegro cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el reintegro" + error });
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
        const [result] = await pool.query('INSERT INTO color (descripcion) VALUES (?)', [descripcionColor]);
        return res.status(201).json({ message: "Color cargado exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar el color" + error });
    }
});

// Cargar nueva variante de producto
router.post('/nuevaVarianteProducto', async (req, res) => {
    const { idProducto, idTalle, idColor } = req.body;
    if (!idProducto || !idTalle || !idColor) {
        return res.status(400).json({ message: "Campos requeridos vacíos" });
    }
    try {
        const [result] = await pool.query('INSERT INTO variantes_productos (idProducto, idTalle, idColor) VALUES (?, ?, ?)', 
            [idProducto, idTalle, idColor]);
        return res.status(201).json({ message: "Variante de producto cargada exitosamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al cargar la variante de producto" + error });
    }
});





//update



//Delete



//consultas
//gets

    //Obtener Cliente y el sexo
    router.get('/ClienteXSexo', async (req, res) => {
        const [rows] = await pool.query('select c.DNI, c.Nombre, c.Apellido, c.Email, c.Estado, s.Descripcion from clientes as C inner join sexo s ON s.IdSexo =c.IdSexo ');
        res.json(rows);
    });


export default router;