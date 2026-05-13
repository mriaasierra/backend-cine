const { z } = require('zod');

const movieSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").max(255),
  director: z.string().max(100),
  duration: z.string().max(50),
  poster_url: z.string().url("Debe ser una URL válida").max(255),
  status: z.enum(['Activa', 'Desactiva']),
  genre_id: z.number().int()
});

module.exports = movieSchema;