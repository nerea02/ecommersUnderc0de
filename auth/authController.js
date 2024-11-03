import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db.js';
const JWT_SECRET = 'your_secret_key'; // Cambia esta clave por una segura

// Función de registro
export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar el cliente en la base de datos
        const [result] = await pool.query(
            'INSERT INTO clientes (email, password) VALUES (?, ?)', 
            [email, hashedPassword]
        );

        res.status(201).json({ message: 'Cliente registrado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar cliente' });
    }
};

// Función de inicio de sesión
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Buscar el cliente en la tabla `clientes`
        const [rows] = await pool.query('SELECT * FROM clientes WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Cliente no encontrado' });
        }

        const client = rows[0];
        const isMatch = await bcrypt.compare(password, client.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar el token JWT
        const token = jwt.sign({ clientId: client.id, email: client.email }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};
