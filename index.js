import express from 'express';
import { PORT } from './config.js';
import indexRouter from './routes/routes.js';
import getRouter from './routes/getRouters.js';
const app = express();

app.use(express.json());
app.use('/api', indexRouter);
app.use('/api', getRouter);
app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});