const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const { verifyToken, isGerente } = require('../middlewares/authMiddleware');

// --- RUTAS DE GÉNEROS DE PELÍCULAS ---

// PÚBLICO: Cualquier persona (o el frontend) puede ver los géneros para filtrar la cartelera
router.get('/', genreController.getAllGenres);

// PRIVADO (ADMIN): Solo el Gerente puede crear nuevos géneros
router.post('/', verifyToken, isGerente, genreController.createGenre);

// PRIVADO (ADMIN): Solo el Gerente puede editar nombres de géneros
router.put('/:id', verifyToken, isGerente, genreController.updateGenre);

// PRIVADO (ADMIN): Solo el Gerente puede eliminar géneros
router.delete('/:id', verifyToken, isGerente, genreController.deleteGenre);

module.exports = router;