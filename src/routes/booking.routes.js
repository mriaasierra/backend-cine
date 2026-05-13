const router = require('express').Router();
const bookingController = require('../controllers/bookingController');
const seatController = require('../controllers/seatController');
const { verifyToken } = require('../middlewares/authMiddleware');

// PRIVADO (TOKEN): Cualquier empleado logueado puede realizar una venta
router.get('/', verifyToken, bookingController.getAllBookings);
router.post('/', verifyToken, bookingController.createBooking);

// Asignación de asientos vinculada a la venta
router.post('/assign-seats', verifyToken, seatController.assignSeats);

// PRIVADO (TOKEN): Cancelar requiere estar logueado
router.patch('/:id/cancel', verifyToken, bookingController.cancelBooking);

module.exports = router;