const express = require('express');
const router = express.Router();
const movementController = require('../controllers/movementController');
const { verifyToken, isGerente } = require('../middlewares/authMiddleware');
const { validateMovement } = require('../middlewares/movementValidator');

// Ver historial de stock
router.get('/', verifyToken, movementController.getAllMovements);

// Registrar entrada/salida (Solo Admin)
router.post('/', verifyToken, isGerente, validateMovement, movementController.createMovement);

module.exports = router;