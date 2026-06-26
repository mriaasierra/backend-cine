import { User } from '../models/user.model.js';
import { encrypt } from '../../utils/password.handle.js';
import { successResponse, errorResponse } from '../../utils/response.handle.js';

// ==========================================
// FUNCIONES TRADUCTORAS DE ESTADO (ENUM PUENTE)
// ==========================================

// Frontend ('Inactivo') -> Base de Datos ('Desactivo')
const mapStatusToDB = (frontendStatus) => {
    if (!frontendStatus) return 'Activo';
    const status = frontendStatus.toLowerCase();
    if (status === 'activo' || status === 'activa') return 'Activo';
    if (status === 'inactivo' || status === 'inactiva' || status === 'desactivo' || status === 'desactiva') return 'Desactivo';
    return 'Activo'; 
};

// Base de Datos ('Desactivo') -> Frontend ('Inactivo')
const mapStatusToFrontend = (dbStatus) => {
    if (dbStatus === 'Activo') return 'Activo';
    if (dbStatus === 'Desactivo') return 'Inactivo'; // El frontend solo verá "Inactivo"
    return dbStatus;
};

// ==========================================
// METODOS DEL CONTROLADOR
// ==========================================

// 1. OBTENER TODOS LOS USUARIOS
export const getUsers = async (req, res) => {
    try {
        const users = await User.getAll();
        
        // Mapeamos el estado de cada usuario antes de enviarlo al frontend
        const formattedUsers = users.map(user => ({
            ...user,
            status: mapStatusToFrontend(user.status)
        }));

        return successResponse(res, 'Usuarios recuperados', formattedUsers);
    } catch (error) {
        console.error("Error al obtener usuarios:", error.message);
        return errorResponse(res, 'Error al obtener usuarios');
    }
};

// 2. CREAR UN NUEVO USUARIO
export const createUser = async (req, res) => {
    try {
        const { password, status, ...userData } = req.body;
        
        // Encriptación de la contraseña antes de ir a la DB
        const hashedPassword = await encrypt(password);
        
        // Traducimos el estado para PostgreSQL
        const dbStatus = mapStatusToDB(status);
        
        const newUser = await User.create({
            ...userData,
            status: dbStatus,
            password: hashedPassword
        });

        // Devolvemos el registro formateado con "Inactivo" para el estado global del front
        const savedUser = {
            ...newUser,
            status: mapStatusToFrontend(newUser.status)
        };

        return successResponse(res, 'Usuario registrado exitosamente', savedUser, 200);
    } catch (error) {
        if (error.code === '23505') {
            return errorResponse(res, 'El correo electrónico ya está registrado', 400);
        }
        console.error("Error al crear usuario:", error.message);
        return errorResponse(res, 'Error al crear el usuario');
    }
};

// 3. ACTUALIZAR UN USUARIO EXISTENTE
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { password, status, ...updateData } = req.body;

        // Si viene contraseña en el formulario, la encriptamos
        if (password && password.trim() !== '') {
            updateData.password = await encrypt(password);
        }

        // Si viene el estado del frontend, lo traducimos a lo que espera el ENUM de Postgres
        if (status !== undefined) {
            updateData.status = mapStatusToDB(status);
        }

        // Ejecutamos la actualización en el modelo
        const updatedUser = await User.update(id, updateData);

        if (!updatedUser) {
            return errorResponse(res, 'Usuario no encontrado', 404);
        }

        // Formateamos la respuesta para que el frontend reciba "Inactivo" de vuelta
        const formattedUser = {
            ...updatedUser,
            status: mapStatusToFrontend(updatedUser.status)
        };

        return successResponse(res, 'Usuario actualizado exitosamente', formattedUser);
    } catch (error) {
        console.error("Error al actualizar usuario:", error.message);
        return errorResponse(res, 'Error al actualizar el usuario');
    }
};

// 4. ELIMINAR UN USUARIO
export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.delete(id);

        if (!deletedUser) {
            return errorResponse(res, 'Usuario no encontrado', 404);
        }

        return successResponse(res, 'Usuario eliminado exitosamente');
    } catch (error) {
        console.error("Error al eliminar usuario:", error.message);
        return errorResponse(res, 'Error al eliminar el usuario');
    }
};