const { z } = require('zod');

const screeningSchema = z.object({
  date_time: z.coerce.date(), 
  movie_id: z.number().int(),
  room_id: z.number().int()
});

module.exports = screeningSchema;