const router = require('express').Router();
const productController = require('../controllers/productController');
const movementController = require('../controllers/movementController');
const { verifyToken, isGerente } = require('../middlewares/authMiddleware');

// PRODUCTOS
router.get('/', verifyToken, productController.getAllProducts); // Ver stock
router.post('/', verifyToken, isGerente, productController.createProduct); // Crear producto nuevo

// MOVIMIENTOS (Entradas/Salidas)
router.get('/movements', verifyToken, movementController.getAllMovements); 
router.post('/movements', verifyToken, isGerente, movementController.createMovement); // Solo Admin registra facturas de proveedores

module.exports = router;