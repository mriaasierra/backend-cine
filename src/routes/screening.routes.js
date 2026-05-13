const express = require('express');
const router = express.Router();
const screeningController = require('../controllers/screeningController');
const { validateScreening } = require('../middlewares/screeningValidator');
const { verifyToken, isGerente } = require('../middlewares/authMiddleware');

// --- RUTAS DE FUNCIONES (SCREENINGS) ---

// CUALQUIERA LOGUEADO: Puede ver las funciones para informar al cliente o vender
router.get('/', verifyToken, screeningController.getAllScreenings);

// CUALQUIERA LOGUEADO: Puede ver el detalle de una función específica
router.get('/:id', verifyToken, screeningController.getScreeningById);

// SOLO ADMIN (Gerente): Puede programar nuevas funciones de películas
router.post('/', 
    verifyToken, 
    isGerente, 
    validateScreening, 
    screeningController.createScreening
);

// SOLO ADMIN (Gerente): Puede eliminar o cancelar una función programada
router.delete('/:id', 
    verifyToken, 
    isGerente, 
    screeningController.deleteScreening
);

module.exports = router;