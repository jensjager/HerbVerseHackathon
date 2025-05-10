import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { fetchOrders, Order } from '@/api/orders';

export default function Orders() {
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const loadOrders = async () => {
			const data = await fetchOrders();
			setOrders(data);
			setLoading(false);
		};
		loadOrders();
	}, []);

	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-white">
				<Text className="text-lg text-gray-500">Loading orders...</Text>
			</View>
		);
	}

	return (
		<View className="flex-1 bg-green-100 p-4 ">
			<Text className="text-2xl font-bold text-gray-800 mb-4">Orders</Text>
			<FlatList
				data={orders}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<View className="mb-4 p-4 border border-gray-300 rounded-lg bg-green-50">
						<Text className="text-lg font-bold text-gray-800">
							Order #{item.id}
						</Text>
						<Text className="text-base text-gray-600">
							Customer: {item.customerName}
						</Text>
						<Text className="text-base text-gray-600">
							Total: ${item.totalAmount.toFixed(2)}
						</Text>
						{/* Fixed Status Field */}
						<Text className="text-base text-gray-600">
							Status:{' '}
							<Text
								className={
									item.status === 'Pending'
										? 'text-yellow-500'
										: item.status === 'Shipped'
										? 'text-blue-500'
										: 'text-green-500'
								}
							>
								{item.status}
							</Text>
						</Text>
						<Text className="text-base text-gray-600">Date: {item.date}</Text>
						<Text className="text-base text-gray-600 mt-2">Items:</Text>
						{item.items.map((orderItem, index) => (
							<Text key={index} className="text-sm text-gray-500 ml-2">
								- {orderItem.name} x {orderItem.quantity}
							</Text>
						))}
					</View>
				)}
			/>
		</View>
	);
}
