import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

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

export default router;