import { Router } from "express";
import { pool } from "../db.js";
const router = Router();

router.put('/BajaVarianteProducto', async (req, res) => {
    try {
        const { id } = req.body;
        const query = `
            update variantesproductos set 
            estado = 0 where idvariante=?
        `;
        const [result] = await pool.query(query, [id]);
    
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }


        res.json({ message: "Producto dado de baja correctamente" });
    } catch (error) {
        console.error('Error en BajaVarianteProducto:', error);
        res.status(500).json({ message: "Hubo un error al procesar la solicitud." });
    }
});

router.put('/AltaVarianteProducto', async (req, res) => {
    try {
        const { id } = req.body;
        const query = `
            update variantesproductos set 
            estado = 1 where idvariante=?
        `;
        const [result] = await pool.query(query, [id]);
        
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }


        res.json({ message: "Producto dado de alta correctamente" });
    } catch (error) {
        console.error('Error en AltaVarianteProducto:', error);
        res.status(500).json({ message: "Hubo un error al procesar la solicitud." });
    }
});

export default router;