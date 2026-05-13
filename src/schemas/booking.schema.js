const { z } = require('zod');

const bookingSchema = z.object({
  customer_id: z.number().int(),
  booking_status: z.enum(['Confirmada', 'Cancelada']).default('Confirmada'),
  screening_id: z.number().int(),
  user_id: z.number().int()
});

module.exports = bookingSchema;