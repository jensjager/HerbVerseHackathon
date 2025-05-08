import { Tabs } from 'expo-router';

export default function CustomerLayout() {
	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor: '#f4511e',
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
				},
			}}
		>
			<Tabs.Screen name="cart" />
			<Tabs.Screen name="index" />
			<Tabs.Screen name="products" />
		</Tabs>
	);
}
