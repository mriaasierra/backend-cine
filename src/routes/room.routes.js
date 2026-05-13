import { Router } from 'express';
import * as roomController from '../controllers/roomController.js';
import { verifyToken, isGerente } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @route   GET /api/rooms
 * @desc    PRIVADO: Consultar todas las salas para verificar disponibilidad
 * @access  Cualquier empleado autenticado
 */
router.get('/', verifyToken, roomController.getAllRooms);

/**
 * @route   POST /api/rooms
 * @desc    PRIVADO: Registrar una nueva sala física en el sistema
 * @access  Solo Gerente
 */
router.post('/', verifyToken, isGerente, roomController.createRoom);

/**
 * @route   PUT /api/rooms/:id
 * @desc    PRIVADO: Modificar especificaciones de una sala (capacidad, tipo, estado)
 * @access  Solo Gerente
 */
router.put('/:id', verifyToken, isGerente, roomController.updateRoom);

export default router;