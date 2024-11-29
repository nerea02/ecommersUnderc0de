import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get('/ABMListar', async (req, res) => {
    const [rows] = await pool.query('select VP.idvariante as codigoProducto,p.nombre, p.descripcion, p.precio, t.talle, c.color ,p.imagen, cf.calificacion, vp.estado  from productos P inner join variantesproductos VP on p.idproducto = vp.idproducto inner join colores c on c.idcolor = vp.idcolor inner join talle t on t.idtalle = vp.idtalle inner join calificacionporproducto cf on cf.idcalificacionproducto = p.idcalificacionproducto');
    res.json(rows);
});



export default router;