import Genre from '../models/genreModel.js';

export const getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.findAll();
        res.json(genres);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createGenre = async (req, res) => {
    try {
        const newGenre = await Genre.create(req.body.name);
        res.status(201).json(newGenre);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteGenre = async (req, res) => {
    try {
        await Genre.delete(req.params.id);
        res.json({ message: "Género eliminado correctamente" });
    } catch (error) {
        // Manejo de integridad referencial para películas
        if (error.code === '23503') {
            return res.status(400).json({ 
                message: "No se puede eliminar: hay películas registradas con este género" 
            });
        }
        res.status(500).json({ error: error.message });
    }
};
