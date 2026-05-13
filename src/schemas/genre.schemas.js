const { z } = require('zod');

const genreSchema = z.object({
  name: z.string().max(100)
});

module.exports = genreSchema;