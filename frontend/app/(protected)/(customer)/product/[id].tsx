import { useGlobalSearchParams } from 'expo-router';
import { useNavigation, StackActions } from '@react-navigation/native';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/api/products';

export default function ProductDetails() {
	const { id } = useGlobalSearchParams();
	const navigation = useNavigation(); // Use navigation to set header options
	const [product, setProduct] = useState<Product | null>(null);

	useEffect(() => {
		const loadProduct = async () => {
			const products = await fetchProducts();
			const selectedProduct = products.find(p => p.id === id);
			setProduct(selectedProduct || null);

			// Dynamically set the header title
			if (selectedProduct) {
				navigation.setOptions({ title: selectedProduct.name });
			}
		};
		loadProduct();
	}, [id, navigation]);

	if (!product) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<Text className="text-lg text-gray-500">Loading product...</Text>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-white p-4">
			<Image
				source={{ uri: product.image }}
				className="w-full h-64 rounded-lg mb-4"
			/>
			<Text className="text-2xl font-bold text-gray-800 mb-2">
				{product.name}
			</Text>
			<Text className="text-lg text-green-600 font-semibold mb-4">
				${product.price.toFixed(2)}
			</Text>
			<Text className="text-base text-gray-600 mb-4">
				{product.description}
			</Text>
			<View className="flex-row justify-between items-center mb-4">
				<Text className="text-sm text-gray-500">Seller: {product.seller}</Text>
				<Text className="text-sm text-gray-500">
					Category: {product.category}
				</Text>
			</View>
			{product.stock !== undefined && (
				<Text
					className={`text-sm font-semibold ${
						product.stock > 0 ? 'text-green-500' : 'text-red-500'
					} mb-4`}
				>
					{product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
				</Text>
			)}
			{product.rating !== undefined && (
				<Text className="text-sm text-gray-500 mb-4">
					Rating: {product.rating} / 5
				</Text>
			)}
			{product.discount !== undefined && product.discount > 0 && (
				<Text className="text-sm text-red-500 mb-4">
					Discount: {product.discount}%
				</Text>
			)}
			<Button
				title="Go Back"
				onPress={() => {
					if (navigation.canGoBack()) {
						navigation.goBack(); // Go back if possible
					} else {
						navigation.dispatch(StackActions.replace('search')); // Navigate to Search if no back stack
					}
				}}
				color="#10B981"
			/>
		</ScrollView>
	);
}
