export interface Order {
	id: string;
	customerName: string;
	totalAmount: number;
	items: { name: string; quantity: number }[];
	status: 'Pending' | 'Shipped' | 'Delivered';
	date: string;
}

const mockOrders: Order[] = [
	{
		id: '1',
		customerName: 'John Doe',
		totalAmount: 45.99,
		items: [
			{ name: 'Herbal Tea', quantity: 2 },
			{ name: 'Aloe Vera Gel', quantity: 1 },
		],
		status: 'Pending',
		date: '2025-05-08',
	},
	{
		id: '2',
		customerName: 'Jane Smith',
		totalAmount: 25.49,
		items: [{ name: 'Essential Oil', quantity: 3 }],
		status: 'Shipped',
		date: '2025-05-07',
	},
	{
		id: '3',
		customerName: 'Alice Johnson',
		totalAmount: 15.99,
		items: [{ name: 'Herbal Tea', quantity: 1 }],
		status: 'Delivered',
		date: '2025-05-06',
	},
];

export const fetchOrders = async (): Promise<Order[]> => {
	// Simulate a network delay
	return new Promise(resolve => {
		setTimeout(() => resolve(mockOrders), 1000);
	});
};
