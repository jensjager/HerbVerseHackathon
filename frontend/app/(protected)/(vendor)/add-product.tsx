import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default function AddProduct() {
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [stock, setStock] = useState('');
	const [category, setCategory] = useState('');

	const handleAddProduct = () => {
		if (!name || !price || !stock || !category) {
			Alert.alert('Error', 'Please fill in all fields.');
			return;
		}

		// Simulate adding the product
		Alert.alert('Success', `Product "${name}" added successfully!`);
		setName('');
		setPrice('');
		setStock('');
		setCategory('');
	};

	return (
		<View className="flex-1 bg-white p-4">
			<Text className="text-2xl font-bold text-gray-800 mb-4">
				Add New Product
			</Text>

			{/* Product Name Input */}
			<TextInput
				className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4"
				placeholder="Product Name"
				placeholderTextColor="#6b7280"
				value={name}
				onChangeText={setName}
			/>

			{/* Product Price Input */}
			<TextInput
				className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4"
				placeholder="Price"
				placeholderTextColor="#6b7280"
				keyboardType="numeric"
				value={price}
				onChangeText={setPrice}
			/>

			{/* Product Stock Input */}
			<TextInput
				className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4"
				placeholder="Stock"
				placeholderTextColor="#6b7280"
				keyboardType="numeric"
				value={stock}
				onChangeText={setStock}
			/>

			{/* Product Category Input */}
			<TextInput
				className="w-full bg-gray-100 p-4 rounded-lg border border-gray-300 mb-4"
				placeholder="Category"
				placeholderTextColor="#6b7280"
				value={category}
				onChangeText={setCategory}
			/>

			{/* Add Product Button */}
			<TouchableOpacity
				className="bg-green-500 p-4 rounded-lg"
				onPress={handleAddProduct}
			>
				<Text className="text-white text-center text-lg font-bold">
					Add Product
				</Text>
			</TouchableOpacity>
		</View>
	);
}
