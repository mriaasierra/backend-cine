const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { verifyToken, isGerente } = require('../middlewares/authMiddleware');
const { validateCustomer } = require('../middlewares/customerValidator');

// --- RUTAS DE CLIENTES ---

// CUALQUIER USUARIO LOGUEADO: Puede ver la lista de clientes
router.get('/', verifyToken, customerController.getAllCustomers);

// CUALQUIER USUARIO LOGUEADO: Puede buscar un cliente por su cédula 
// (Muy útil para la taquilla del cine)
router.get('/cedula/:cedula', verifyToken, customerController.getCustomerByCedula);

// CUALQUIER USUARIO LOGUEADO: Puede registrar un nuevo cliente al momento de la venta
router.post('/', verifyToken, validateCustomer, customerController.createCustomer);

// SOLO ADMIN (Gerente): Puede actualizar datos sensibles de un cliente
router.put('/:id', verifyToken, isGerente, validateCustomer, customerController.updateCustomer);

module.exports = router;