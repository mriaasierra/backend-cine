const { z } = require('zod');

const userSchema = z.object({
  first_name: z.string().min(2, "El nombre es muy corto").max(100),
  last_name: z.string().min(2, "El apellido es muy corto").max(100),
  email: z.string().email("Formato de correo inválido").max(100),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres").max(255),
  role_id: z.number().int().positive("El rol es obligatorio"),
  status: z.enum(['Activo', 'Desactivo', 'Bloqueado'])
});

module.exports = userSchema;