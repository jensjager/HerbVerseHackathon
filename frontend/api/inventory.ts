export interface InventoryItem {
	id: string;
	name: string;
	price: number;
	stock: number;
	category: string;
}

const mockInventory: InventoryItem[] = [
	{
		id: '1',
		name: 'Herbal Tea',
		price: 10.99,
		stock: 50,
		category: 'Beverages',
	},
	{
		id: '2',
		name: 'Aloe Vera Gel',
		price: 15.49,
		stock: 30,
		category: 'Skincare',
	},
	{
		id: '3',
		name: 'Essential Oil',
		price: 8.99,
		stock: 100,
		category: 'Aromatherapy',
	},
	{
		id: '4',
		name: 'Lavender Soap',
		price: 5.99,
		stock: 20,
		category: 'Bath & Body',
	},
	{
		id: '5',
		name: 'Chamomile Tea',
		price: 12.99,
		stock: 40,
		category: 'Beverages',
	},
];

export const fetchInventory = async (): Promise<InventoryItem[]> => {
	// Simulate a network delay
	return new Promise(resolve => {
		setTimeout(() => resolve(mockInventory), 1000);
	});
};
