import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import suppliersRoutes from './routes/supplierRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

//-------------- RUTAS --------------//
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/suppliers', suppliersRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
