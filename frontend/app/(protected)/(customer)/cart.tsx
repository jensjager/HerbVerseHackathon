import React from 'react';
import { View, Text, FlatList, Button, TouchableOpacity } from 'react-native';
import { useCart } from '@/context/CartContext';

export default function Cart() {
	const { cart, removeFromCart } = useCart();

	const calculateTotal = () => {
		return cart
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2);
	};

	return (
		<View className="flex-1 bg-white p-4">
			{/* Cart Items */}
			<FlatList
				data={cart}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<View className="mb-4 p-4 border border-gray-300 rounded-lg">
						<Text className="text-lg font-bold text-gray-800">{item.name}</Text>
						<Text className="text-base text-gray-600 mb-2">
							${item.price.toFixed(2)} x {item.quantity}
						</Text>
						<TouchableOpacity
							className="bg-red-500 rounded-lg p-2"
							onPress={() => removeFromCart(item.id)}
						>
							<Text className="text-white text-center">Remove</Text>
						</TouchableOpacity>
					</View>
				)}
			/>

			{/* Total Section */}
			<Text className="text-xl font-bold text-gray-800 mt-4">
				Total: ${calculateTotal()}
			</Text>

			{/* Checkout Button */}
			<TouchableOpacity
				className="bg-green-500 rounded-lg p-4 mt-4"
				onPress={() => alert('Proceed to Checkout')}
			>
				<Text className="text-white text-center text-lg font-bold">
					Checkout
				</Text>
			</TouchableOpacity>
		</View>
	);
}
