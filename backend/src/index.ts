import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './db';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import inventoryRoutes from './routes/inventory';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Test PostgreSQL Connection
db.pool
	.connect()
	.then(() => console.log('✅ Connected to PostgreSQL'))
	.catch((err: any) => console.error('❌ PostgreSQL connection error:', err));

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/inventory', inventoryRoutes);

// Start Server
app.listen(PORT, () => {
	console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
