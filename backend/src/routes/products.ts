import express from 'express';
import db from '../db';

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
	try {
		const { rows } = await db.pool.query('SELECT * FROM products');
		res.json(rows);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch products' });
	}
});

// Get a single product by ID
router.get('/:id', async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const { rows } = await db.pool.query(
			'SELECT * FROM products WHERE id = $1',
			[id],
		);
		if (rows.length === 0) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to fetch product' });
	}
});

// Add a new product
router.post('/', async (req, res) => {
	try {
		const {
			name,
			price,
			image,
			seller,
			description,
			category,
			stock,
			rating,
			discount,
		} = req.body;
		const { rows } = await db.pool.query(
			'INSERT INTO products (name, price, image, seller, description, category, stock, rating, discount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
			[
				name,
				price,
				image,
				seller,
				description,
				category,
				stock,
				rating,
				discount,
			],
		);
		res.status(201).json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to add product' });
	}
});

// Update a product
router.put('/:id', async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const {
			name,
			price,
			image,
			seller,
			description,
			category,
			stock,
			rating,
			discount,
		} = req.body;
		const { rows } = await db.pool.query(
			'UPDATE products SET name = $1, price = $2, image = $3, seller = $4, description = $5, category = $6, stock = $7, rating = $8, discount = $9 WHERE id = $10 RETURNING *',
			[
				name,
				price,
				image,
				seller,
				description,
				category,
				stock,
				rating,
				discount,
				id,
			],
		);
		if (rows.length === 0) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.json(rows[0]);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to update product' });
	}
});

// Delete a product
router.delete('/:id', async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const { rowCount } = await db.pool.query(
			'DELETE FROM products WHERE id = $1',
			[id],
		);
		if (rowCount === 0) {
			return res.status(404).json({ error: 'Product not found' });
		}
		res.status(204).send();
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Failed to delete product' });
	}
});

export default router;
