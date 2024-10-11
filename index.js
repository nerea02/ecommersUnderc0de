import express from 'express';
import { PORT } from './config.js';
import indexRouter from './routes/routes.js';
import getRouter from './routes/getRouters.js';
import cors from 'cors'; 

const app = express();

app.use(cors()); 
app.use(express.json()); 

// Definir rutas
app.use('/api', indexRouter);
app.use('/api', getRouter);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});