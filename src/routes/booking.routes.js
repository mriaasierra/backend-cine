import { Router } from 'express';
import * as bookingController from '../controllers/bookingController.js';
import * as seatController from '../controllers/seatController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @route   GET /api/bookings
 * @descripcion   Obtener listado de ventas/reservas 
 */
router.get('/', verifyToken, bookingController.getAllBookings);

/**
 * @route   POST /api/bookings
 * @desc    Registrar una nueva venta/reserva
 */
router.post('/', verifyToken, bookingController.createBooking);

/**
 * @route   POST /api/bookings/assign-seats
 * @desc    Vincular asientos específicos a una reserva ya creada
 */
router.post('/assign-seats', verifyToken, seatController.assignSeats);

/**
 * @route   PATCH /api/bookings/:id/cancel
 * @desc    Cambiar estado de reserva a 'Cancelada'
 */
router.patch('/:id/cancel', verifyToken, bookingController.cancelBooking);

export default router;