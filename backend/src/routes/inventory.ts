import express, { Request, Response } from 'express';
import db from '../db';

const router = express.Router();

// Get all inventory items
router.get('/', async (req: Request, res: Response): Promise<void> => {
	try {
		const { rows } = await db.pool.query('SELECT * FROM inventory');
		res.json(rows);
	} catch (err) {
		console.error('Error fetching inventory:', err);
		res.status(500).json({ error: 'Failed to fetch inventory' });
	}
});

// Update stock for an inventory item
router.put('/:id', async (req: any, res: any) => {
	try {
		const { id } = req.params;
		const { stock } = req.body;

		// Validate input
		if (typeof stock !== 'number' || stock < 0) {
			return res.status(400).json({ error: 'Invalid stock value' });
		}

		const { rows } = await db.pool.query(
			'UPDATE inventory SET stock = $1 WHERE id = $2 RETURNING *',
			[stock, id],
		);

		if (rows.length === 0) {
			return res.status(404).json({ error: 'Inventory item not found' });
		}

		res.json(rows[0]);
	} catch (err) {
		console.error('Error updating inventory:', err);
		res.status(500).json({ error: 'Failed to update inventory' });
	}
});

export default router;
