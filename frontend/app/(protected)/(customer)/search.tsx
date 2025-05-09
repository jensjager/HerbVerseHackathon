import React, { useEffect, useState } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	Button,
	TouchableOpacity,
} from 'react-native';
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
			// Do not set filteredProducts initially
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
		<View className="flex-1 bg-white p-4">
			<SearchBar
				placeholder="Search products..."
				value={searchQuery}
				onChangeText={setSearchQuery}
			/>
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
							className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-100"
							onPress={() => router.push(`/product/${item.id}`)}
						>
							<Image
								source={{ uri: item.image }}
								className="w-full h-40 mb-2 rounded-lg"
							/>
							<Text className="text-lg font-bold text-gray-800">
								{item.name}
							</Text>
							<Text className="text-base text-gray-600">
								${item.price.toFixed(2)}
							</Text>
							<Text className="text-sm text-gray-500 mt-1">{item.seller}</Text>
							<Button
								title="View Details"
								onPress={() => router.push(`/product/${item.id}`)}
							/>
						</TouchableOpacity>
					)}
				/>
			)}
		</View>
	);
}
