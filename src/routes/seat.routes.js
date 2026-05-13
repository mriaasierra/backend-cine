const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');
const { verifyToken } = require('../middlewares/authMiddleware');
const { validateSeat } = require('../middlewares/seatValidator');

// --- RUTAS DE ASIGNACIÓN DE ASIENTOS ---

// PRIVADO (TOKEN): Ver qué asientos están ocupados en una reserva específica
router.get('/booking/:bookingId', verifyToken, seatController.getSeatsByBooking);

// PRIVADO (TOKEN): Asignar asientos a una reserva (Ruta para el proceso de venta)
// Esta es la que recibe el array de asientos ["A1", "A2"]
router.post('/assign', verifyToken, validateSeat, seatController.assignSeats);

module.exports = router;