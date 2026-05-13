const { z } = require('zod');

const roleSchema = z.object({
  role_name: z.enum(['Gerente', 'Empleado'])
});

module.exports = roleSchema;