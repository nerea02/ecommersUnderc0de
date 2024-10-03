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


export default router;