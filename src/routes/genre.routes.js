import { Router } from 'express';
import * as genreController from '../controllers/genreController.js';
import { verifyToken, isGerente } from '../middlewares/authMiddleware.js';

const router = Router();

// --- RUTAS DE GÉNEROS DE PELÍCULAS ---

/**
 * @route   GET /api/genres
 * @desc    PÚBLICO: Ver todos los géneros (Acción, Drama, etc.) para filtros en cartelera
 */
router.get('/', genreController.getAllGenres);

/**
 * @route   POST /api/genres
 * @desc    SOLO GERENTE: Registrar nuevos géneros en el sistema
 */
router.post('/', verifyToken, isGerente, genreController.createGenre);

/**
 * @route   PUT /api/genres/:id
 * @desc    SOLO GERENTE: Editar el nombre de un género existente
 */
router.put('/:id', verifyToken, isGerente, genreController.updateGenre);

/**
 * @route   DELETE /api/genres/:id
 * @desc    SOLO GERENTE: Eliminar géneros 
 */
router.delete('/:id', verifyToken, isGerente, genreController.deleteGenre);

export default router;