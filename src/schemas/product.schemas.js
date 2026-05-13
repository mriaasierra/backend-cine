const { z } = require('zod');

const productSchema = z.object({
  name: z.string().max(100),
  min_stock: z.number().int().nonnegative(),
  category_id: z.number().int()
});

module.exports = productSchema;