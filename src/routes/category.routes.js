import { Router } from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { verifyToken, isGerente } from '../middlewares/authMiddleware.js';
import { validateCategory } from '../middlewares/categoryValidator.js';

const router = Router();

// --- RUTAS DE CATEGORÍAS DE PRODUCTOS ---

/**
 * @route   GET /api/categories
 * @descripcion   CUALQUIER USUARIO LOGUEADO: Ver categorías para filtrar productos
 */
router.get('/', verifyToken, categoryController.getAllCategories);

/**
 * @route   POST /api/categories
 * @desc    SOLO GERENTE: Crear nuevas categorías (ej. "Combos", "Snacks")
 */
router.post('/', 
    verifyToken, 
    isGerente, 
    validateCategory, 
    categoryController.createCategory
);

/**
 * @route   PUT /api/categories/:id
 * @desc    SOLO GERENTE: Actualizar nombre de una categoría
 */
router.put('/:id', 
    verifyToken, 
    isGerente, 
    validateCategory, 
    categoryController.updateCategory
);

/**
 * @route   DELETE /api/categories/:id
 * @desc    SOLO GERENTE: Eliminar categorías (si no tienen productos asociados)
 */
router.delete('/:id', 
    verifyToken, 
    isGerente, 
    categoryController.deleteCategory
);

export default router;