import express from 'express';
import { PORT } from './config.js';
import indexRouter from './routes/routes.js';

const app = express();

app.use(express.json());
app.use('/api', indexRouter);

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});