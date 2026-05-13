const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const categoryController = require('../controllers/categoryController');
const { verifyToken, isGerente } = require('../middlewares/authMiddleware');
const { validateProduct } = require('../middlewares/productValidator');

// --- PRODUCTOS ---
// Cualquier empleado ve el catálogo de productos y stock actual
router.get('/products', verifyToken, productController.getAllProducts);
router.get('/products/alerts', verifyToken, productController.getInventoryAlerts);

// Solo el Gerente crea o edita productos
router.post('/products', verifyToken, isGerente, validateProduct, productController.createProduct);

// --- CATEGORÍAS ---
router.get('/categories', verifyToken, categoryController.getAllCategories);
router.post('/categories', verifyToken, isGerente, categoryController.createCategory);

module.exports = router;