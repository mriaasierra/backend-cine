import { query } from '../config/db.js';

export const User = {
    // Buscar un usuario por email (fundamental para el login)
    findByEmail: async (email) => {
        const result = await query(
            'SELECT u.*, r.role_name FROM users u JOIN roles r ON u.role_id = r.role_id WHERE u.email = $1',
            [email]
        );
        return result.rows[0];
    },

    /**
     * Buscar por ID.
     * Útil para el perfil (me)
     */
    findById: async (id) => {
        const text = `
            SELECT u.user_id, u.first_name, u.last_name, u.email, u.status, r.role_name 
            FROM users u 
            JOIN roles r ON u.role_id = r.role_id 
            WHERE u.user_id = $1
        `;
        const result = await query(text, [id]);
        return result.rows[0];
    },

    // Crear un nuevo usuario (Gerente o Empleado)
    create: async ({ first_name, last_name, email, password, role_id, status }) => {
        const result = await query(
            `INSERT INTO users (first_name, last_name, email, password, role_id, status) 
             VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id, email, first_name`,
            [first_name, last_name, email, password, role_id, status]
        );
        return result.rows[0];
    },

    // Listar todos los usuarios para la gestión del Gerente
    getAll: async () => {
        const result = await query(
            `SELECT u.user_id, u.first_name, u.last_name, u.email, u.status, r.role_name 
             FROM users u 
             JOIN roles r ON u.role_id = r.role_id 
             ORDER BY u.user_id ASC`
        );
        return result.rows;
    },

    // NUEVO: Actualizar dinámicamente cualquier campo del usuario (usado por el controlador)
    update: async (id, updateData) => {
        const fields = [];
        const values = [];
        let paramIndex = 1;

        // Construimos dinámicamente el bloque SET basándonos en lo que venga del front
        for (const [key, value] of Object.entries(updateData)) {
            if (value !== undefined) {
                fields.push(`${key} = $${paramIndex}`);
                values.push(value);
                paramIndex++;
            }
        }

        if (fields.length === 0) return null;

        // Añadimos el ID como el último parámetro de la consulta
        values.push(id);
        const text = `
            UPDATE users 
            SET ${fields.join(', ')} 
            WHERE user_id = $${paramIndex} 
            RETURNING user_id, first_name, last_name, email, status, role_id;
        `;

        const result = await query(text, values);
        return result.rows[0];
    },

    // NUEVO: Eliminar un usuario por su ID
    delete: async (id) => {
        const text = `
            DELETE FROM users 
            WHERE user_id = $1 
            RETURNING user_id;
        `;
        const result = await query(text, [id]);
        return result.rows[0];
    },

    updatePassword: async (user_id, newHashedPassword) => {
        const text = `
            UPDATE users 
            SET password = $1 
            WHERE user_id = $2
        `;
        await query(text, [newHashedPassword, user_id]);
    }
};