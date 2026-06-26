import Booking from '../models/booking.model.js';

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.findAll();
        
        // REVISIÓN EN CONSOLA: Esto nos dirá en la terminal cómo se llaman tus columnas en Postgres
        if (bookings && bookings.length > 0) {
            console.log("=== CAMPOS DE LA RESERVA (PRUEBA DE BASE DE DATOS) ===");
            console.log(bookings[0]);
            console.log("=====================================================");
        } else {
            console.log("No hay reservas actuales en la base de datos.");
        }
        
        // Devolvemos los datos exactamente como estaban para no romper el front
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createBooking = async (req, res) => {
    try {
        const newBooking = await Booking.create(req.body);
        res.status(201).json(newBooking);
    } catch (error) {
        // Manejo de error de llave foránea en PostgreSQL (muy común en Sistemas)
        if (error.code === '23503') {
            return res.status(400).json({ 
                message: "Error de referencia: Verifique que el cliente, la función y el usuario existan" 
            });
        }
        res.status(500).json({ error: error.message });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const updated = await Booking.updateStatus(req.params.id, 'Cancelada');
        if (!updated) return res.status(404).json({ message: "Reserva no encontrada" });
        res.json({ message: "Reserva cancelada", data: updated });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};