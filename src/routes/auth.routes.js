import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import { verifyToken, isGerente } from '../middlewares/authMiddleware.js';

const router = Router();

// POST /api/auth/login
// PÚBLICO: Acceso al sistema para todo el personal
router.post('/login', login);

// POST /api/auth/register
// PRIVADO: Registro de nuevo personal (Solo accesible por Gerente)
router.post('/register', verifyToken, isGerente, register);

export default router;