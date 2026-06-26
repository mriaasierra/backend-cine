import pg from 'pg';
const { Pool } = pg;

// Conexión base a tu base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: '123456789',
  database: 'Proyecto_cine',
  port: 5432,
});

// 1. TRADUCTOR: Lo que viene del frontend ('Inactiva') -> Lo que entiende la BD ('Desactiva')
const mapStatusToDB = (frontendStatus) => {
    if (!frontendStatus) return 'Activa';
    const status = frontendStatus.toLowerCase();
    if (status === 'activa' || status === 'active') return 'Activa';
    if (status === 'inactiva' || status === 'inactive' || status === 'desactiva') return 'Desactiva';
    return 'Próximamente'; 
};

// 2. TRADUCTOR INVERSO: Lo que viene de la BD ('Desactiva') -> Lo que espera el frontend ('Inactiva')
const mapStatusToFrontend = (dbStatus) => {
    if (dbStatus === 'Activa') return 'Activa';
    if (dbStatus === 'Desactiva') return 'Inactiva'; // <-- El secreto está aquí: el front solo verá "Inactiva"
    return dbStatus;
};

// ==========================================
// CONTROLLER METHODS
// ==========================================

// 1. OBTENER TODAS LAS PELÍCULAS
export const getAllMovies = async (req, res) => {
    try {
        const { search, genre_id, status } = req.query;
        let query = `
            SELECT 
                m.movie_id, 
                m.title, 
                m.director, 
                m.duration, 
                m.poster_url, 
                m.genre_id, 
                g.name as genre_name,
                m.status
            FROM movies m
            LEFT JOIN genres g ON m.genre_id = g.genre_id
            WHERE 1=1
        `;
        const values = [];
        let paramIndex = 1;

        if (search) {
            query += ` AND (m.title ILIKE $${paramIndex} OR m.director ILIKE $${paramIndex})`;
            values.push(`%${search}%`);
            paramIndex++;
        }

        if (genre_id) {
            query += ` AND m.genre_id = $${paramIndex}`;
            values.push(genre_id);
            paramIndex++;
        }

        if (status && status !== 'todos') {
            query += ` AND m.status = $${paramIndex}`;
            values.push(mapStatusToDB(status));
            paramIndex++;
        }

        query += " ORDER BY m.movie_id DESC";
        const result = await pool.query(query, values);

        // Mapeamos el status que viene de la base de datos a "Inactiva" antes de enviárselo al frontend
        const formattedRows = result.rows.map(row => ({
            ...row,
            status: mapStatusToFrontend(row.status)
        }));

        return res.status(200).json(formattedRows);
    } catch (error) {
        console.error("Error al obtener películas:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

// 2. CREAR NUEVA PELÍCULA
export const createMovie = async (req, res) => {
    try {
        const { title, director, duration, poster_url, status, genre_id } = req.body;
        // Traducimos "Inactiva" del formulario a "Desactiva" para la base de datos
        const dbStatus = mapStatusToDB(status);

        const query = `
            INSERT INTO movies (title, director, duration, poster_url, status, genre_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *;
        `;
        const values = [title, director, duration, poster_url, dbStatus, genre_id];
        const result = await pool.query(query, values);

        // Devolvemos el registro formateado para el estado de la app en el front
        const savedMovie = {
            ...result.rows[0],
            status: mapStatusToFrontend(result.rows[0].status)
        };

        return res.status(201).json({
            success: true,
            message: "Película creada exitosamente",
            movie: savedMovie
        });
    } catch (error) {
        console.error("Error al crear película:", error.message);
        return res.status(500).json({ error: error.message });
    }
};

// 3. ACTUALIZAR PELÍCULA
export const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.id || req.body.movie_id || req.body.id;
        const { title, director, duration, poster_url, status, genre_id } = req.body;

        if (!movieId) {
            return res.status(400).json({ success: false, message: "El ID de la película es requerido" });
        }

        // Si mandan estatus desde el front, lo transformamos a lo que requiere el ENUM
        const dbStatus = status !== undefined ? mapStatusToDB(status) : undefined;

        const query = `
            UPDATE movies 
            SET 
                title = COALESCE($1, title),
                director = COALESCE($2, director),
                duration = COALESCE($3, duration),
                poster_url = COALESCE($4, poster_url),
                status = COALESCE($5, status),
                genre_id = COALESCE($6, genre_id)
            WHERE movie_id = $7
            RETURNING *;
        `;

        const values = [title, director, duration, poster_url, dbStatus, genre_id, movieId];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Película no encontrada" });
        }

        // Formateamos la respuesta de la actualización para que el front reciba "Inactiva"
        const updatedMovie = {
            ...result.rows[0],
            status: mapStatusToFrontend(result.rows[0].status)
        };

        return res.status(200).json({
            success: true,
            message: "Película actualizada correctamente",
            movie: updatedMovie
        });

    } catch (error) {
        console.error("Error al actualizar la película:", error.message);
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
};

// 4. ELIMINAR PELÍCULA
export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const query = "DELETE FROM movies WHERE movie_id = $1 RETURNING *;";
        const result = await pool.query(query, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ success: false, message: "Película no encontrada" });
        }

        return res.status(200).json({
            success: true,
            message: "Película eliminada exitosamente"
        });
    } catch (error) {
        console.error("Error al eliminar película:", error.message);
        return res.status(500).json({ error: error.message });
    }
};