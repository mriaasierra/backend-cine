const { z } = require('zod');

const seatAssignmentSchema = z.object({
  seat_number: z.string().max(10),
  booking_id: z.number().int()
});

module.exports = seatAssignmentSchema;