import { useGlobalSearchParams, useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
} from 'react-native';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/api/products';
import { useCart } from '@/context/CartContext';
import { QuantityStepper } from '@/components/QuantityPicker';

export default function ProductDetails() {
	const { id } = useGlobalSearchParams();
	const navigation = useNavigation();
	const router = useRouter();
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

	const handleAddToCart = () => {
		addToCart({
			id: product.id,
			name: product.name,
			price: product.price,
			quantity,
		});
		Alert.alert('Success', `${product.name} added to cart!`);
	};

	return (
		<ScrollView className="flex-1 bg-green-100 p-4">
			{/* Product Image */}
			<Image
				source={{ uri: product.image }}
				className="w-full h-64 rounded-lg mb-4"
			/>

			{/* Product Details */}
			<View className="bg-white p-4 rounded-lg shadow-md mb-6">
				<Text className="text-2xl font-bold text-green-800 mb-2">
					{product.name}
				</Text>
				<Text className="text-lg text-green-600 font-semibold mb-2">
					${product.price.toFixed(2)}
				</Text>
				<Text className="text-sm text-gray-500 mb-2">
					Stock: {product.stock}
				</Text>
				<Text className="text-base text-gray-600">{product.description}</Text>
			</View>

			{/* Quantity Picker */}
			<View className="bg-white p-4 rounded-lg shadow-md mb-6">
				<Text className="text-lg font-bold text-gray-800 mb-2">Quantity:</Text>
				<QuantityStepper
					initial={1}
					min={1}
					max={product.stock || 0}
					step={1}
					onChange={value => setQuantity(value)} // Update quantity state
				/>
			</View>

			{/* Add to Cart Button */}
			<TouchableOpacity
				className="bg-green-600 p-4 rounded-lg shadow-md"
				onPress={handleAddToCart}
			>
				<Text className="text-center text-white font-bold text-lg">
					Add {quantity} to Cart
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
}
