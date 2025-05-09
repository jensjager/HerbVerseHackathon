import { View, Text, Button } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { useRouter } from 'expo-router';

export default function Index() {
	const router = useRouter();

	return (
		<View className="flex-1 bg-green-50 p-4">
			<Text className="text-3xl font-bold text-center text-green-800 mb-4">
				Welcome to HerbVerse
			</Text>
			<Text className="text-lg text-center text-gray-700 mb-6">
				Your gateway to natural wellness
			</Text>
			<View className="space-y-4">
				<Button
					title="View Cart"
					onPress={() => router.push('/cart')}
					color="#10B981"
				/>
			</View>
		</View>
	);
}
