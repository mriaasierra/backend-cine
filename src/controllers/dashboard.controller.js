import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  password: '123456789',
  database: 'Proyecto_cine',
  port: 5432,
});

export const getStats = async (req, res) => {
  try {
    // 1. Conteo REAL de Reservas Activas
    const bookingsResult = await pool.query("SELECT COUNT(*) FROM bookings WHERE booking_status = 'Confirmada';");
    const activeBookings = parseInt(bookingsResult.rows[0].count, 10) || 0;
    
    // 2. Conteo REAL de Películas en Cartelera
    const moviesResult = await pool.query("SELECT COUNT(*) FROM movies WHERE status = 'Activa';");
    const moviesPlaying = parseInt(moviesResult.rows[0].count, 10) || 0;
    
    // 3. Conteo REAL de Salas Disponibles
    const roomsResult = await pool.query("SELECT COUNT(*) FROM rooms WHERE room_status = 'Disponible';");
    const availableRooms = parseInt(roomsResult.rows[0].count, 10) || 0;
    
    // 4. Ventas del Día
    const baseTicketPrice = 8.50;
    const todaySales = activeBookings > 0 ? (activeBookings * baseTicketPrice) : 0;

    // 5. Alertas de Stock
    let lowStockProducts = [];
    try {
      const stockResult = await pool.query(`
        SELECT 
          product_id as id, 
          name, 
          current_stock, 
          min_stock 
        FROM products 
        WHERE CAST(current_stock AS INTEGER) <= CAST(min_stock AS INTEGER);
      `);
      lowStockProducts = stockResult.rows;
    } catch (e) {
      console.log("Error detallado en stock:", e.message);
      lowStockProducts = [];
    }
    
    // 6. Últimas 5 reservas reales (PROTEGER CONTRA VALORES NULL)
    let recentBookingsList = [];
    try {
      const recentBookings = await pool.query(`
        SELECT 
          b.booking_id as id, 
          COALESCE(NULLIF(TRIM(c.first_name || ' ' || c.last_name), ''), 'Cliente Temporal / S.N.') as client, 
          COALESCE(m.title, 'Película No Asignada') as movie, 
          COALESCE(b.booking_status, 'Confirmada') as status
        FROM bookings b
        LEFT JOIN customers c ON b.customer_id = c.customer_id
        LEFT JOIN screenings s ON b.screening_id = s.screening_id
        LEFT JOIN movies m ON s.movie_id = m.movie_id
        ORDER BY b.created_at DESC
        LIMIT 5;
      `);
      recentBookingsList = recentBookings.rows;
    } catch (e) {
      console.log("Aviso: Error en subconsulta de filas recientes:", e.message);
    }

    // Respuesta 100% compatible con las propiedades en inglés del Frontend
    res.status(200).json({
      success: true,
      activeBookings,
      moviesPlaying, 
      availableRooms,
      todaySales,
      recentBookings: recentBookingsList,
      lowStockProducts
    });

  } catch (error) {
    console.error('Error crítico en el controlador del dashboard:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor al procesar el dashboard',
      error: error.message
    });
  }
};