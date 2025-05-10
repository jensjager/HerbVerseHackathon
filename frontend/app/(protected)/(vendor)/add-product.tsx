import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '@clerk/clerk-expo';

export default function AddProduct() {
	const { user } = useUser();

	if (!user) {
		return (
			<View className="flex-1 bg-green-100 p-4 justify-center items-center">
				<Text className="text-2xl font-bold text-gray-800 mb-4">
					Error Loading User
				</Text>
			</View>
		);
	}

	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [stock, setStock] = useState('');
	const [category, setCategory] = useState('');

	const handleAddProduct = async () => {
		if (!name || !price || !stock || !category) {
			Alert.alert('Error', 'Please fill in all fields.');
			return;
		}

		const product = {
			name,
			seller: user.username as string,
			price: parseFloat(price),
			stock: parseInt(stock),
			category,
		};

		try {
			Alert.alert('Success', `Product "${name}" added successfully!`);
			setName('');
			setPrice('');
			setStock('');
			setCategory('');
		} catch (error) {
			Alert.alert('Error', 'Failed to add product. Please try again.');
		}
	};

	return (
		<View className="flex-1 bg-green-100 p-4 pt-12">
			<Text className="text-2xl font-bold text-gray-600 mb-6">
				Add New Product
			</Text>
			{/* Product Name Input */}
			<TextInput
				className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
				placeholder="Product Name"
				placeholderTextColor="#6b7280"
				value={name}
				onChangeText={setName}
			/>

			{/* Product Price Input */}
			<TextInput
				className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
				placeholder="Price"
				placeholderTextColor="#6b7280"
				keyboardType="numeric"
				value={price}
				onChangeText={setPrice}
			/>

			{/* Product Stock Input */}
			<TextInput
				className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
				placeholder="Stock"
				placeholderTextColor="#6b7280"
				keyboardType="numeric"
				value={stock}
				onChangeText={setStock}
			/>

			{/* Product Category Input */}
			<TextInput
				className="w-full bg-white p-4 rounded-lg border border-gray-300 mb-4"
				placeholder="Category"
				placeholderTextColor="#6b7280"
				value={category}
				onChangeText={setCategory}
			/>

			{/* Add Product Button */}
			<TouchableOpacity
				className="bg-green-600 p-4 rounded-lg shadow-md"
				onPress={handleAddProduct}
			>
				<Text className="text-white text-center text-lg font-bold">
					Add Product
				</Text>
			</TouchableOpacity>
		</View>
	);
}
