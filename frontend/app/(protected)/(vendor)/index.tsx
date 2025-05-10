import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function VendorDashboard() {
	const router = useRouter();

	return (
		<View className="flex-1 bg-green-100 p-4">
			<Text className="text-3xl font-bold text-gray-800 mb-6 text-center">
				Vendor Dashboard
			</Text>

			{/* Navigation Buttons */}
			<TouchableOpacity
				className="bg-blue-500 p-4 rounded-lg mb-4"
				onPress={() => router.push('/inventory')}
			>
				<Text className="text-white text-center text-lg font-bold">
					Manage Inventory
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="bg-green-500 p-4 rounded-lg mb-4"
				onPress={() => router.push('/add-product')}
			>
				<Text className="text-white text-center text-lg font-bold">
					Add New Product
				</Text>
			</TouchableOpacity>

			<TouchableOpacity
				className="bg-yellow-500 p-4 rounded-lg mb-4"
				onPress={() => router.push('/orders')}
			>
				<Text className="text-white text-center text-lg font-bold">
					View Orders
				</Text>
			</TouchableOpacity>
		</View>
	);
}
