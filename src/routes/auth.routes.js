import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { authMiddleware, isGerente } from '../middlewares/auth.js';

const router = Router();

// POST /api/auth/login
// PÚBLICO: Acceso al sistema para todo el personal
router.post('/login', login);

// POST /api/auth/register
// PRIVADO: Registro de nuevo personal (Solo accesible por Gerente)
router.post('/register', authMiddleware, isGerente, register);

export default router;