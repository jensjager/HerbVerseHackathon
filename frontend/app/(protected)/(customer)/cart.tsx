import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from '@/context/CartContext';

export default function Cart() {
	const { cart, removeFromCart } = useCart();

	const calculateTotal = () => {
		return cart
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2);
	};

	return (
		<View className="flex-1 bg-green-100 p-4">
			{/* Cart Items */}
			{cart.length > 0 ? (
				<FlatList
					data={cart}
					keyExtractor={item => item.id}
					renderItem={({ item }) => (
						<View className="mb-4 p-4 border border-gray-300 rounded-lg bg-white shadow-md">
							<Text className="text-lg font-bold text-green-800">
								{item.name}
							</Text>
							<Text className="text-base text-gray-600 mb-2">
								${item.price.toFixed(2)} x {item.quantity}
							</Text>
							<TouchableOpacity
								className="bg-red-500 rounded-lg p-2"
								onPress={() => removeFromCart(item.id)}
							>
								<Text className="text-white text-center font-bold">Remove</Text>
							</TouchableOpacity>
						</View>
					)}
				/>
			) : (
				<Text className="text-center text-gray-600 text-lg mt-4">
					Your cart is empty.
				</Text>
			)}

			{/* Total Section */}
			{cart.length > 0 && (
				<View className="bg-white p-4 rounded-lg shadow-md mt-4">
					<Text className="text-xl font-bold text-gray-800">
						Total: ${calculateTotal()}
					</Text>
				</View>
			)}

			{/* Checkout Button */}
			{cart.length > 0 && (
				<TouchableOpacity
					className="bg-green-600 rounded-lg p-4 mt-4 shadow-md"
					onPress={() => alert('Proceed to Checkout')}
				>
					<Text className="text-white text-center text-lg font-bold">
						Checkout
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}
