import express from 'express';
import db from '../db';

const router = express.Router();

// Get all orders
router.get('/', async (req, res) => {
	try {
		const { rows } = await db.pool.query('SELECT * FROM orders');
		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch orders' });
	}
});

// Add a new order
router.post('/', async (req, res) => {
	try {
		const { customerName, totalAmount, status, items } = req.body;
		const { rows } = await db.pool.query(
			'INSERT INTO orders (customer_name, total_amount, status) VALUES ($1, $2, $3) RETURNING *',
			[customerName, totalAmount, status],
		);
		const orderId = rows[0].id;

		// Insert order items
		for (const item of items) {
			await db.pool.query(
				'INSERT INTO order_items (order_id, product_name, quantity) VALUES ($1, $2, $3)',
				[orderId, item.name, item.quantity],
			);
		}

		res.status(201).json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to add order' });
	}
});

// Get order details by ID
router.get('/:id', async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const { rows: orderRows } = await db.pool.query(
			'SELECT * FROM orders WHERE id = $1',
			[id],
		);
		if (orderRows.length === 0) {
			return res.status(404).json({ error: 'Order not found' });
		}

		const { rows: itemsRows } = await db.pool.query(
			'SELECT * FROM order_items WHERE order_id = $1',
			[id],
		);
		res.json({ ...orderRows[0], items: itemsRows });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch order details' });
	}
});

export default router;
