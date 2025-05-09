import {
	View,
	Text,
	Button,
	FlatList,
	Image,
	TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { fetchProducts, Product } from '@/api/products';

export default function Index() {
	const router = useRouter();
	const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

	useEffect(() => {
		const loadFeaturedProducts = async () => {
			const products = await fetchProducts();
			// Select the first 3 products as featured products
			setFeaturedProducts(products.slice(0, 3));
		};
		loadFeaturedProducts();
	}, []);

	return (
		<View className="flex bg-green-50 p-4">
			{/* Welcome Section */}
			<Text className="text-3xl font-bold text-center text-green-800 mb-4">
				Welcome to HerbVerse
			</Text>
			<Text className="text-lg text-center text-gray-700 mb-6">
				Your gateway to natural wellness
			</Text>

			{/* Featured Products Section */}
			<Text className="text-xl font-bold text-gray-800 mb-4">
				Featured Products
			</Text>
			<FlatList
				data={featuredProducts}
				keyExtractor={item => item.id}
				horizontal
				showsHorizontalScrollIndicator={false}
				renderItem={({ item }) => (
					<TouchableOpacity
						className="mr-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md items-center"
						onPress={() => router.push(`/product/${item.id}`)}
					>
						<Image
							source={{ uri: item.image }}
							className="w-40 h-40 rounded-lg mb-2"
						/>
						<Text className="text-lg font-bold text-gray-800">{item.name}</Text>
						<Text className="text-base text-green-600 font-semibold">
							${item.price.toFixed(2)}
						</Text>
					</TouchableOpacity>
				)}
			/>

			{/* About Section */}
			<View className="mt-8 bg-white p-4 rounded-lg shadow-md">
				<Text className="text-xl font-bold text-gray-800 mb-2">
					About HerbVerse
				</Text>
				<Text className="text-base text-gray-600">
					At HerbVerse, we believe in the power of nature to heal and
					rejuvenate. Explore our wide range of herbal products, skincare
					essentials, and aromatherapy solutions to enhance your well-being.
				</Text>
			</View>
		</View>
	);
}
