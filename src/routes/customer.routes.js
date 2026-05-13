import { Router } from 'express';
import * as customerController from '../controllers/customerController.js';
import { verifyToken, isGerente } from '../middlewares/authMiddleware.js';
import { validateCustomer } from '../middlewares/customerValidator.js';

const router = Router();

// --- RUTAS DE CLIENTES ---

/**
 * @route   GET /api/customers
 * @desc    CUALQUIER USUARIO LOGUEADO: Ver lista completa de clientes registrados
 */
router.get('/', verifyToken, customerController.getAllCustomers);

/**
 * @route   GET /api/customers/cedula/:cedula
 * @desc    BÚSQUEDA RÁPIDA: Encontrar cliente por cédula 
 */
router.get('/cedula/:cedula', verifyToken, customerController.getCustomerByCedula);

/**
 * @route   POST /api/customers
 * @desc    REGISTRO: Crear un nuevo cliente durante el proceso de venta
 */
router.post('/', verifyToken, validateCustomer, customerController.createCustomer);

/**
 * @route   PUT /api/customers/:id
 * @desc    EDICIÓN: Actualizar datos de cliente (Gerente)
 */
router.put('/:id', 
    verifyToken, 
    isGerente, 
    validateCustomer, 
    customerController.updateCustomer
);

export default router;