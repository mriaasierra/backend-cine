const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyToken, isGerente } = require('../middlewares/authMiddleware');
const { validateCategory } = require('../middlewares/categoryValidator');

// --- RUTAS DE CATEGORÍAS DE PRODUCTOS ---

// CUALQUIER USUARIO LOGUEADO: Puede ver las categorías para filtrar productos
router.get('/', verifyToken, categoryController.getAllCategories);

// SOLO ADMIN (Gerente): Puede crear nuevas categorías (ej. "Promociones", "Souvenirs")
router.post('/', 
    verifyToken, 
    isGerente, 
    validateCategory, 
    categoryController.createCategory
);

// SOLO ADMIN (Gerente): Puede actualizar el nombre de una categoría existente
router.put('/:id', 
    verifyToken, 
    isGerente, 
    validateCategory, 
    categoryController.updateCategory
);

// SOLO ADMIN (Gerente): Puede eliminar categorías 
// (Nota: El controlador debe validar que no tenga productos asociados)
router.delete('/:id', 
    verifyToken, 
    isGerente, 
    categoryController.deleteCategory
);

module.exports = router;