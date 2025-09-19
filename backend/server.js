import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentMethodRoutes from './routes/paymentMethodRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

//-------------- RUTAS --------------//
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});
app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/categories', categoryRoutes);
app.use('/brands', brandRoutes);
app.use('/products', productRoutes);
app.use('/payment-methods', paymentMethodRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
