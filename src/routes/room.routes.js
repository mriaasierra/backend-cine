// src/routes/roomRoutes.js
const router = require('express').Router();
const roomController = require('../controllers/roomController');
const { verifyToken, isGerente } = require('../middlewares/authMiddleware');

// PRIVADO (TOKEN): Cualquier empleado puede ver las salas para checkear disponibilidad
router.get('/', verifyToken, roomController.getAllRooms);

// PRIVADO (ADMIN): Solo el Gerente crea o modifica salas físicas
router.post('/', verifyToken, isGerente, roomController.createRoom);
router.put('/:id', verifyToken, isGerente, roomController.updateRoom);

module.exports = router;