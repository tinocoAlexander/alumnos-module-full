import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import alumnoRoutes from './routes/alumno.routes';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend API for Alumnos Module');
});

// Montar rutas
app.use('/api/alumnos', alumnoRoutes);

const PORT = process.env.PORT || 3000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
