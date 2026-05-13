// 1. IMPORTACIÓN DE MÓDULOS
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// 2. CONFIGURACIÓN DE VARIABLES DE ENTORNO
dotenv.config();

// 3. IMPORTACIÓN DE RUTAS
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const genreRoutes = require('./routes/genreRoutes');
const roomRoutes = require('./routes/roomRoutes');
const screeningRoutes = require('./routes/screeningRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const seatRoutes = require('./routes/seatRoutes');
const customerRoutes = require('./routes/customerRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const movementRoutes = require('./routes/movementRoutes');

// 4. INICIALIZACIÓN DE LA APP
const app = express();

// 5. MIDDLEWARES GLOBALES
app.use(cors()); // Permite peticiones desde el frontend
app.use(express.json()); // Permite procesar cuerpos JSON

// 6. REGISTRO DE RUTAS 

// Autenticación y Usuarios (Login/Registro)
app.use('/api/auth', authRoutes);

// Gestión de Películas y Géneros
app.use('/api/movies', movieRoutes);
app.use('/api/genres', genreRoutes);

// Infraestructura y Funciones del Cine
app.use('/api/rooms', roomRoutes);
app.use('/api/screenings', screeningRoutes);

// Ventas, Clientes y Asignación de Asientos
app.use('/api/bookings', bookingRoutes);
app.use('/api/seats', seatRoutes);
app.use('/api/customers', customerRoutes);

// Gestión de Inventario (Productos/Categorías) y Movimientos (Kardex)
app.use('/api/inventory', inventoryRoutes);
app.use('/api/movements', movementRoutes);

// 7. MANEJO DE RUTAS NO ENCONTRADAS (404)
app.use((req, res) => {
    res.status(404).json({ 
        message: "Error 404: La ruta solicitada no existe en el servidor." 
    });
});

// 8. MANEJO DE ERRORES GLOBAL 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
        message: "Ha ocurrido un error interno en el servidor." 
    });
});