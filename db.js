import { createPool } from 'mysql2/promise';

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    port: 3307, 
    password: '1234',
    database: 'ecommerce'
});