import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { fetchInventory, InventoryItem } from '@/api/inventory';

export default function Inventory() {
	const [inventory, setInventory] = useState<InventoryItem[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadInventory = async () => {
			const data = await fetchInventory();
			setInventory(data);
			setLoading(false);
		};
		loadInventory();
	}, []);

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<Text className="text-lg text-gray-500">Loading inventory...</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-green-100 p-4">
			<Text className="text-2xl font-bold text-gray-800 mb-4">Inventory</Text>
			<FlatList
				data={inventory}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<View className="mb-4 p-4 border border-gray-300 rounded-lg bg-green-50">
						<Text className="text-lg font-bold text-gray-800">{item.name}</Text>
						<Text className="text-base text-gray-600">
							Price: ${item.price.toFixed(2)}
						</Text>
						<Text className="text-base text-gray-600">
							Stock: {item.stock} units
						</Text>
						<Text className="text-base text-gray-600">
							Category: {item.category}
						</Text>
						<TouchableOpacity
							className="bg-green-500 rounded-lg p-2 mt-2"
							onPress={() => alert(`Edit ${item.name}`)}
						>
							<Text className="text-white text-center">Edit</Text>
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}
