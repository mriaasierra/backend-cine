import { Router } from 'express';
import * as roomController from '../controllers/room.controller.js';
import { authMiddleware, isGerente } from '../middlewares/auth.js';

const router = Router();

/**
 * @route   GET /api/rooms
 * @desc    PRIVADO: Consultar todas las salas para verificar disponibilidad
 * @access  Cualquier empleado autenticado
 */
router.get('/', authMiddleware, roomController.getAllRooms);

/**
 * @route   POST /api/rooms
 * @desc    PRIVADO: Registrar una nueva sala física en el sistema
 * @access  Solo Gerente
 */
router.post('/', authMiddleware, isGerente, roomController.createRoom);

/**
 * @route   PUT /api/rooms/:id
 * @desc    PRIVADO: Modificar especificaciones de una sala (capacidad, tipo, estado)
 * @access  Solo Gerente
 */
router.put('/:id', authMiddleware, isGerente, roomController.updateRoom);

export default router;