import { Router } from 'express';
import * as movieController from '../controllers/movieController.js';
import { verifyToken, isGerente } from '../middlewares/authMiddleware.js';

const router = Router();

// --- RUTAS DE PELÍCULAS ---

/**
 * @route   GET /api/movies
 * @desc    PÚBLICO: Consultar todas las películas (Cartelera)
 */
router.get('/', movieController.getAllMovies);

/**
 * @route   GET /api/movies/:id
 * @desc    PÚBLICO: Ver detalles de una película específica
 */
router.get('/:id', movieController.getMovieById);

/**
 * @route   POST /api/movies
 * @desc    SOLO GERENTE: Añadir una nueva película al sistema
 */
router.post('/', verifyToken, isGerente, movieController.createMovie);

/**
 * @route   PUT /api/movies/:id
 * @desc    SOLO GERENTE: Editar información o estado de una película
 */
router.put('/:id', verifyToken, isGerente, movieController.updateMovie);

/**
 * @route   DELETE /api/movies/:id
 * @desc    SOLO GERENTE: Eliminar película (si no tiene funciones activas)
 */
router.delete('/:id', verifyToken, isGerente, movieController.deleteMovie);

export default router;