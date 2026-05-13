import Movie from '../models/movieModel.js';

export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener películas: " + error.message });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ message: "Película no encontrada" });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createMovie = async (req, res) => {
    try {
        const newMovie = await Movie.create(req.body);
        res.status(201).json(newMovie);
    } catch (error) {
        // Manejo específico si el genre_id no existe en la tabla genres
        if (error.code === '23503') {
            return res.status(400).json({ message: "El género especificado no existe" });
        }
        res.status(500).json({ error: error.message });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const updated = await Movie.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ message: "Película no encontrada" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
