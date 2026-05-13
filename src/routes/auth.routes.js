const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, isGerente } = require('../middlewares/authMiddleware');

// PÚBLICO: Para que cualquier empleado/gerente entre al sistema
router.post('/login', authController.login);

// PRIVADO (ADMIN): Solo el Gerente puede crear nuevos usuarios en el sistema
router.post('/register', verifyToken, isGerente, authController.register);

module.exports = router;