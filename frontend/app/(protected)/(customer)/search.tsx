import React, { useState } from 'react';
import {
	View,
	Text,
	FlatList,
	Image,
	Button,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';

const products = [
	{
		id: '1',
		name: 'Herbal Tea',
		price: 10.99,
		image: 'https://via.placeholder.com/150',
	},
	{
		id: '2',
		name: 'Aloe Vera Gel',
		price: 15.49,
		image: 'https://via.placeholder.com/150',
	},
	{
		id: '3',
		name: 'Essential Oil',
		price: 8.99,
		image: 'https://via.placeholder.com/150',
	},
];

export default function Search() {
	const router = useRouter();

	return (
		<View style={styles.container}>
			<FlatList
				data={products}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.productCard}
						onPress={() => router.push(`/product/${item.id}`)}
					>
						<Image source={{ uri: item.image }} style={styles.productImage} />
						<Text style={styles.productName}>{item.name}</Text>
						<Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
						<Button
							title="View Details"
							onPress={() => router.push(`/product/${item.id}`)}
						/>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: '#fff' },
	productCard: {
		marginBottom: 16,
		padding: 16,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
	},
	productImage: { width: '100%', height: 150, marginBottom: 8 },
	productName: { fontSize: 18, fontWeight: 'bold' },
	productPrice: { fontSize: 16, color: '#555', marginBottom: 8 },
});
