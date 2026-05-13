import { Router } from 'express';
import * as screeningController from '../controllers/screeningController.js';
import { validateScreening } from '../middlewares/screeningValidator.js';
import { verifyToken, isGerente } from '../middlewares/authMiddleware.js';

const router = Router();

// --- RUTAS DE FUNCIONES (SCREENINGS) ---

/**
 * @route   GET /api/screenings
 * @desc    PRIVADO: Listar funciones 
 */
router.get('/', verifyToken, screeningController.getAllScreenings);

/**
 * @route   GET /api/screenings/:id
 * @desc    PRIVADO: Consultar detalles técnicos de una función específica
 */
router.get('/:id', verifyToken, screeningController.getScreeningById);

/**
 * @route   POST /api/screenings
 * @desc    SOLO GERENTE: Programar nuevas funciones 
 */
router.post('/', 
    verifyToken, 
    isGerente, 
    validateScreening, 
    screeningController.createScreening
);

/**
 * @route   DELETE /api/screenings/:id
 * @desc    SOLO GERENTE: Eliminar una función 
 */
router.delete('/:id', 
    verifyToken, 
    isGerente, 
    screeningController.deleteScreening
);

export default router;