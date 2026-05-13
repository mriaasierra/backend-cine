const { z } = require('zod');

const roomSchema = z.object({
  room_number: z.number().int(),
  total_capacity: z.number().int().positive(),
  room_type: z.enum(['2D', '3D', 'VIP']),
  room_status: z.enum(['Disponible', 'Limpieza', 'Ocupada'])
});

module.exports = roomSchema;