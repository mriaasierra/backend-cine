import { Router } from 'express';
import * as productController from '../controllers/productController.js';
import { verifyToken, isGerente } from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @route   GET /api/products
 * @desc    Consultar el stock actual y lista de productos
 * @access  Privado (Cualquier empleado logueado)
 */
router.get('/', verifyToken, productController.getAllProducts);

/**
 * @route   POST /api/products
 * @desc    Crear un nuevo producto en el inventario
 * @access  Privado (Solo Gerente)
 */
router.post('/', verifyToken, isGerente, productController.createProduct);

export default router;