import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';

const initialCart = [
	{ id: '1', name: 'Herbal Tea', price: 10.99, quantity: 1 },
	{ id: '2', name: 'Aloe Vera Gel', price: 15.49, quantity: 2 },
];

export default function Cart() {
	const [cart, setCart] = useState(initialCart);

	const removeFromCart = (id: string) => {
		setCart(cart.filter(item => item.id !== id));
	};

	const calculateTotal = () => {
		return cart
			.reduce((total, item) => total + item.price * item.quantity, 0)
			.toFixed(2);
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={cart}
				keyExtractor={item => item.id}
				renderItem={({ item }) => (
					<View style={styles.cartItem}>
						<Text style={styles.itemName}>{item.name}</Text>
						<Text style={styles.itemPrice}>
							${item.price.toFixed(2)} x {item.quantity}
						</Text>
						<Button title="Remove" onPress={() => removeFromCart(item.id)} />
					</View>
				)}
			/>
			<Text style={styles.total}>Total: ${calculateTotal()}</Text>
			<Button title="Checkout" onPress={() => alert('Proceed to Checkout')} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16, backgroundColor: '#fff' },
	cartItem: {
		marginBottom: 16,
		padding: 16,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 8,
	},
	itemName: { fontSize: 18, fontWeight: 'bold' },
	itemPrice: { fontSize: 16, color: '#555', marginBottom: 8 },
	total: { fontSize: 20, fontWeight: 'bold', marginVertical: 16 },
});
