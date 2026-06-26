import bcrypt from 'bcrypt';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '123456789',
    database: 'Proyecto_cine',
    port: 5432,
});

async function crearUsuario() {
    const email = 'majosierra.2004@gmail.com';
    const passwordPlana = '30651079Maria';
    const firstName = 'Maria';
    const lastName = 'Sierra';

    try {
        const passwordEncriptada = await bcrypt.hash(passwordPlana, 10);

        const query = `
        INSERT INTO users (first_name, last_name, email, password, role_id, status)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING user_id, email;
        `;

        const values = [firstName, lastName, email, passwordEncriptada, 1, 'Activo'];

        const res = await pool.query(query, values);
        console.log('usuario creado con exito', res.rows[0]);
    } catch (err) {
        console.error('error al crear usuario:', err.message);
    } finally {
        await pool.end();
    }
}

crearUsuario();