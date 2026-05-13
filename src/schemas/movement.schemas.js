const { z } = require('zod');

const movementSchema = z.object({
  user_id: z.number().int(),
  product_id: z.number().int(),
  movement_type: z.enum(['Entrada', 'Salida']),
  quantity: z.number().int().positive()
});

module.exports = movementSchema;