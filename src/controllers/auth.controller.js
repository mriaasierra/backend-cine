import * as User from '../models/user.model.js';
import { encrypt, verified } from '../../utils/password.handle.js';
import { generateToken } from '../../utils/jwt.handle.js';

export const register = async (req, res) => {
    try {
        const { password, ...userData } = req.body;

        const hashedPwd = await encrypt(password);

        const newUser = await User.create({ ...userData, password: hashedPwd });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);

        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

        const validPassword = await verified(password, user.password);
        if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" });

        const token = generateToken(user);

        res.json({
            message: "Bienvenido",
            token,
            user: { name: user.first_name, role: user.role_name }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
