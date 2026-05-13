import { Router } from 'express';
import * as seatController from '../controllers/seat.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { validateSeat } from '../middlewares/seat.validator.js';

const router = Router();

// --- RUTAS DE ASIGNACIÓN DE ASIENTOS ---

/**
 * @route   GET /api/seats/booking/:bookingId
 * @desc    CONSULTA: Ver los asientos específicos vinculados a una reserva
 * @access  Privado (Cualquier empleado logueado)
 */
router.get('/booking/:bookingId', authMiddleware, seatController.getSeatsByBooking);

/**
 * @route   POST /api/seats/assign
 * @desc    OPERACIÓN: Asignar múltiples asientos a una reserva en proceso de venta
 * @access  Privado (Cualquier empleado logueado)
 * @note    Recibe un array de identificadores de asientos (Ej: ["A1", "A2"])
 */
router.post('/assign', 
    authMiddleware, 
    validateSeat, 
    seatController.assignSeats
);

export default router;