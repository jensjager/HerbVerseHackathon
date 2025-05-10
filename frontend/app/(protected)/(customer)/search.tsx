import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { fetchProducts, Product } from '@/api/products';
import SearchBar from '@/components/SearchBar';

export default function Search() {
	const router = useRouter();
	const [products, setProducts] = useState<Product[]>([]);
	const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
	const [searchQuery, setSearchQuery] = useState('');

	useEffect(() => {
		const loadProducts = async () => {
			const data = await fetchProducts();
			setProducts(data);
		};
		loadProducts();
	}, []);

	// Filter products based on the search query
	useEffect(() => {
		if (searchQuery.trim() === '') {
			setFilteredProducts([]); // Show no products if search query is empty
		} else {
			const lowerCaseQuery = searchQuery.toLowerCase();
			const filtered = products.filter(
				product =>
					product.name.toLowerCase().includes(lowerCaseQuery) ||
					product.seller.toLowerCase().includes(lowerCaseQuery) ||
					(product.description &&
						product.description.toLowerCase().includes(lowerCaseQuery)) ||
					(product.category &&
						product.category.toLowerCase().includes(lowerCaseQuery)),
			);
			setFilteredProducts(filtered);
		}
	}, [searchQuery, products]);

	return (
		<View className="flex-1 bg-green-100 p-4">
			{/* Search Bar */}
			<SearchBar
				placeholder="Search products..."
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>

			{/* No Results Message */}
			{filteredProducts.length === 0 && searchQuery.trim() !== '' ? (
				<Text className="text-center text-gray-500 mt-4">
					No products found.
				</Text>
			) : (
				<FlatList
					className="mt-4"
					data={filteredProducts}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md"
							onPress={() => router.push(`/product/${item.id}`)}
						>
							{/* Product Image */}
							<Image
								source={{ uri: item.image }}
								className="w-full h-40 mb-2 rounded-lg"
							/>

							{/* Product Name */}
							<Text className="text-lg font-bold text-green-800">
								{item.name}
							</Text>

							{/* Product Price */}
							<Text className="text-base text-green-600 font-semibold">
								${item.price.toFixed(2)}
							</Text>

							{/* Product Seller */}
							<Text className="text-sm text-gray-500 mt-1">
								Seller: {item.seller}
							</Text>

							{/* View Details Button */}
							<TouchableOpacity
								className="mt-4 bg-green-600 p-2 rounded-md"
								onPress={() => router.push(`/product/${item.id}`)}
							>
								<Text className="text-center text-white font-bold">
									View Details
								</Text>
							</TouchableOpacity>
						</TouchableOpacity>
					)}
				/>
			)}
		</View>
	);
}
