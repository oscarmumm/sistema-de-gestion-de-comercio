import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import supplierRoutes from './routes/supplierRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import brandRoutes from './routes/brandRoutes.js';
import productRoutes from './routes/productRoutes.js';
import paymentMethodRoutes from './routes/paymentMethodRoutes.js';
import authRoutes from './routes/authRoutes.js';
import saleRoutes from './routes/saleRoutes.js';
import stockEntriesRoutes from './routes/stockEntriesRoutes.js';

dotenv.config();

const app = express();

app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
);

app.use(express.json());

//-------------- RUTAS --------------//
app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});
app.use('/api/users', userRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/suppliers', supplierRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment-methods', paymentMethodRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/product-entry', stockEntriesRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
