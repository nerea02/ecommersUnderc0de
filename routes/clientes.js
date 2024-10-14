import { Router } from "express";
import { pool } from "../db.js";
const router = Router();
// Obtener todos los clientes
router.get('/clientes', async (req, res) => {
    const [rows] = await pool.query('SELECT * FROM clientes');
    res.json(rows);
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
router.put('/AltaLogicaClientes', async (req, res) => {
    const { id } = req.body; // Obtener el ID del nivel a actualizar
   

    try {
        const query = 'UPDATE Cliente SET Estado = 1 WHERE IdCliente = ?';
        const [result] = await pool.query(query, [ id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "cliente no encontrado" });
        }

        return res.status(200).json({ message: "cliente actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar sexo:', error);
        return res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
    }
});
router.put('/BajaLogicaCliente', async (req, res) => {
    const { id } = req.body; // Obtener el ID del nivel a actualizar
   

    try {
        const query = 'UPDATE Cliente SET Estado = 0 WHERE IdCliente = ?';
        const [result] = await pool.query(query, [ id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Cliente no encontrado" });
        }

        return res.status(200).json({ message: "cliente actualizado exitosamente" });
    } catch (error) {
        console.error('Error al actualizar cliente:', error);
        return res.status(500).json({ message: 'Error al actualizar cliente', error: error.message });
    }
});



export default router;