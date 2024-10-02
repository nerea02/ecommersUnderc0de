import { Router } from "express";
import { pool } from "../db.js";

const router = Router();

router.get('/nivel', async (req, res) => {
    const [rows] = await pool.query('select * from niveles');
    res.json(rows);
});
export default router;