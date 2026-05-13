const { z } = require('zod');

const categorySchema = z.object({
  name: z.string().max(100)
});

module.exports = categorySchema;