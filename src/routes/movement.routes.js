import { Router } from 'express';
import * as movementController from '../controllers/movementController.js';
import { verifyToken, isGerente } from '../middlewares/authMiddleware.js';
import { validateMovement } from '../middlewares/movementValidator.js';

const router = Router();

/**
 * @route   GET /api/movements
 * @desc    HISTORIAL: Ver todos los movimientos de entrada y salida de stock
 */
router.get('/', verifyToken, movementController.getAllMovements);

/**
 * @route   POST /api/movements
 * @desc    REGISTRO: Crear un nuevo movimiento de inventario (Solo Gerente)
 * Nota: Esto disparará el Trigger en PostgreSQL para actualizar el stock.
 */
router.post('/', 
    verifyToken, 
    isGerente, 
    validateMovement, 
    movementController.createMovement
);

export default router;