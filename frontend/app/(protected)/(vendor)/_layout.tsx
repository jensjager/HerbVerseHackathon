import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
			<Tabs.Screen name="settings" options={{ href: null }} />
			<Tabs.Screen
				name="index"
				options={{
					title: 'Home',
					tabBarIcon: () => (
						<MaterialCommunityIcons name="home" size={24} color="black" />
					),
				}}
			/>
			<Tabs.Screen
				name="inventory"
				options={{
					title: 'Inventory',
					tabBarIcon: () => (
						<MaterialCommunityIcons
							name="package-variant"
							size={24}
							color="black"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="add-product"
				options={{
					title: 'Add Product',
					tabBarIcon: () => (
						<MaterialCommunityIcons name="plus-thick" size={24} color="black" />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: () => (
						<MaterialCommunityIcons name="account" size={24} color="black" />
					),
				}}
			/>
			<Tabs.Screen
				name="orders"
				options={{
					title: 'Orders',
					tabBarIcon: () => (
						<MaterialCommunityIcons name="receipt" size={24} color="black" />
					),
				}}
			/>
		</Tabs>
	);
}
