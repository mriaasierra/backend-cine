import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

// Importación de rutas 
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import movieRoutes from './routes/movieRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import roomRoutes from './routes/roomRoutes.js';
import screeningRoutes from './routes/screeningRoutes.js';
import seatRoutes from './routes/seatRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import customerRoutes from './routes/customerRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import movementRoutes from './routes/movementRoutes.js';

const app = express();

// --- MIDDLEWARES GLOBALES ---
app.use(cors()); // Permite peticiones desde el frontend
app.use(morgan('dev')); // Registro de peticiones en consola para depuración
app.use(express.json()); // Habilita la lectura de cuerpos JSON en las peticiones

// --- DEFINICIÓN DE RUTAS (API ENDPOINTS) ---

// Módulo de Seguridad y Usuarios
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Módulo de Cine y Cartelera
app.use('/api/movies', movieRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/screenings', screeningRoutes);
app.use('/api/seats', seatRoutes);

// Módulo de Ventas y Clientes
app.use('/api/bookings', bookingRoutes);
app.use('/api/customers', customerRoutes);

// Módulo de Suministros e Inventario 
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/movements', movementRoutes);

// --- MANEJO DE RUTAS NO ENCONTRADAS ---
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada en el sistema del cine" });
});

// --- CONFIGURACIÓN DEL PUERTO ---
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidoren: http://localhost:${PORT}`);
  console.log(`Proyecto Cine`);
});

export default app;