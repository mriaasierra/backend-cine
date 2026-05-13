const db = require('../config/db');

const User = {
    findByEmail: async (email) => {
        const query = `
            SELECT u.*, r.role_name 
            FROM users u 
            JOIN roles r ON u.role_id = r.role_id 
            WHERE u.email = $1`;
        const { rows } = await db.query(query, [email]);
        return rows[0];
    },

    create: async (data) => {
        const { first_name, last_name, email, password, role_id } = data;
        const query = `
            INSERT INTO users (first_name, last_name, email, password, role_id, status)
            VALUES ($1, $2, $3, $4, $5, 'Activo') RETURNING user_id, email, first_name`;
        const values = [first_name, last_name, email, password, role_id];
        const { rows } = await db.query(query, values);
        return rows[0];
    }
};

module.exports = User;