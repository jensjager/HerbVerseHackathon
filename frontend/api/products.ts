export interface Product {
	id: string;
	name: string;
	price: number;
	image?: string;
	seller: string;
	description?: string;
	category: string;
	stock: number;
	rating?: number;
	discount?: number;
}

const mockProducts: Product[] = [
	{
		id: '1',
		name: 'Herbal Tea',
		price: 10.99,
		image:
			'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		seller: 'HerbCo',
		description: 'A soothing blend of herbal tea.',
		category: 'Beverages',
		stock: 50,
		rating: 4.5,
		discount: 10,
	},
	{
		id: '2',
		name: 'Aloe Vera Gel',
		price: 15.49,
		image:
			'https://images.pexels.com/photos/15725408/pexels-photo-15725408/free-photo-of-close-up-of-a-succulent.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		seller: 'NatureCare',
		description: 'Pure aloe vera gel for skincare.',
		category: 'Skincare',
		stock: 30,
		rating: 4.8,
	},
	{
		id: '3',
		name: 'Essential Oil',
		price: 8.99,
		image:
			'https://images.pexels.com/photos/932577/pexels-photo-932577.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
		seller: 'AromaWorld',
		description: 'High-quality essential oil for aromatherapy.',
		category: 'Aromatherapy',
		stock: 100,
		rating: 4.2,
	},
];

export const fetchProducts = async (): Promise<Product[]> => {
	// Simulate a network delay
	return new Promise(resolve => {
		setTimeout(() => resolve(mockProducts), 1000);
	});
};
