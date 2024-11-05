import express from 'express';
import { PORT } from './config.js';
import authRoutes from './routes/auth/authRoutes.js';
import categorias from './routes/categorias.js';
import clientes from './routes/clientes.js';
import clolores from './routes/colores.js';
import cpp from './routes/cpp.js';
import getRouter from './routes/getRouters.js';
import historial from './routes/historial.js';
import mp from './routes/mp.js';
import niveles from './routes/niveles.js';
import ppv from './routes/ppv.js';
import productos from './routes/productos.js';
import reintegros from './routes/reintegros.js';
import indexRouter from './routes/routes.js';
import sexo from './routes/sexo.js';
import talles from './routes/talles.js';
import usuarios from './routes/usuarios.js';




import cors from 'cors';

const app = express();

app.use(cors()); 
app.use(express.json()); 

// Definir rutas
app.use('/api/auth', authRoutes);
app.use('/api', indexRouter);
app.use('/api', getRouter);
app.use('/api', categorias);
app.use('/api', productos);
app.use('/api', clientes);
app.use('/api', clolores);
app.use('/api', cpp);
app.use('/api', historial);
app.use('/api', mp);
app.use('/api', niveles);
app.use('/api', ppv);
app.use('/api', reintegros);
app.use('/api', sexo);
app.use('/api', talles);
app.use('/api', usuarios);




// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});