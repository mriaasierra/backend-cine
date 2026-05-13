const { z } = require('zod');

const customerSchema = z.object({
  first_name: z.string().max(100),
  last_name: z.string().max(100),
  cedula: z.string().max(20),
  phone: z.string().max(20).optional(),
  email: z.string().email().max(100).optional()
});

module.exports = customerSchema;