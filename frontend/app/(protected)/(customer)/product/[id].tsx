import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Button, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/api/products';
import { useCart } from '@/context/CartContext';
import { QuantityStepper } from '@/components/QuantityPicker';

export default function ProductDetails() {
	const { id } = useGlobalSearchParams();
	const navigation = useNavigation();
	const [product, setProduct] = useState<Product | null>(null);
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1); // Track selected quantity

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
			<View className="flex-row justify-between items-center mb-4">
				<Text className="text-2xl font-bold text-gray-800 mb-2">
					{product.name}
				</Text>
				<Text>Stock: {product.stock}</Text>
			</View>
			<Text className="text-lg text-green-600 font-semibold mb-4">
				${product.price.toFixed(2)}
			</Text>
			<Text className="text-base text-gray-600 mb-4">
				{product.description}
			</Text>

			{/* Quantity Picker */}
			<View className="mb-4">
				<Text className="text-lg font-bold mb-2">Quantity:</Text>
				<QuantityStepper
					initial={1}
					min={1}
					max={product.stock || 0}
					step={1}
					onChange={value => setQuantity(value)} // Update quantity state
				/>
			</View>

			<Button
				title="Add to Cart"
				onPress={() =>
					addToCart({
						id: product.id,
						name: product.name,
						price: product.price,
						quantity,
					})
				}
				color="#10B981"
			/>
		</ScrollView>
	);
}
