import { Router } from 'express';
import * as movieController from '../controllers/movieController.js';
import { checkAuth } from '../middlewares/authMiddleware.js';

// PÚBLICO: Para ver qué películas hay disponibles (Cartelera)
router.get('/', movieController.getAllMovies);
router.get('/:id', movieController.getMovieById);

// PRIVADO (ADMIN): Solo el Gerente puede añadir, editar o quitar películas
router.post('/', verifyToken, isGerente, movieController.createMovie);
router.put('/:id', verifyToken, isGerente, movieController.updateMovie);
router.delete('/:id', verifyToken, isGerente, movieController.deleteMovie);

export default router; // Exportación por defecto