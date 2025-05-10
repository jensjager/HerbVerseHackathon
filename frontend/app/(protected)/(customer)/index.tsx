import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	ScrollView,
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
		<ScrollView className="flex bg-green-100 p-4 h-full">
			{/* Welcome Section */}
			<View className="mb-6">
				<Text className="text-4xl font-bold text-center text-green-800 mb-2">
					Welcome to HerbVerse
				</Text>
				<Text className="text-lg text-center text-gray-700">
					Your gateway to natural wellness
				</Text>
			</View>

			{/* Featured Products Section */}
			<View className="mb-8">
				<Text className="text-2xl font-bold text-gray-800 mb-4">
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
							<Text className="text-lg font-bold text-gray-800">
								{item.name}
							</Text>
							<Text className="text-base text-green-600 font-semibold">
								${item.price.toFixed(2)}
							</Text>
						</TouchableOpacity>
					)}
				/>
			</View>

			{/* About Section */}
			<View className="bg-green-800 p-6 rounded-lg shadow-md mb-8">
				<Text className="text-3xl font-bold text-white mb-4">
					About HerbVerse
				</Text>
				<Text className="text-base text-white leading-6">
					At HerbVerse, we believe in the power of nature to heal and
					rejuvenate. Explore our wide range of herbal products, skincare
					essentials, and aromatherapy solutions to enhance your well-being.
				</Text>
				<Image
					source={{
						uri: 'https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
					}}
					className="w-full h-40 rounded-lg mt-4"
				/>
			</View>

			{/* Call to Action Section */}
			<View className="bg-white p-6 rounded-lg shadow-md">
				<Text className="text-2xl font-bold text-gray-800 mb-4 text-center">
					Join the HerbVerse Community
				</Text>
				<Text className="text-base text-gray-600 text-center mb-6">
					Discover the best herbal products and take the first step toward a
					healthier, more natural lifestyle.
				</Text>
				<TouchableOpacity
					className="bg-green-600 p-4 rounded-lg"
					onPress={() => router.push('/search')}
				>
					<Text className="text-center text-white font-bold text-lg">
						Shop Now
					</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}
