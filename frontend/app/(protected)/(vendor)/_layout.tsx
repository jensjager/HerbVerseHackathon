import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function CustomerLayout() {
	return (
		<Tabs
			screenOptions={{
				headerStyle: {
					backgroundColor: '#2da51f',
				},
				headerTintColor: '#fff',
				tabBarStyle: {
					backgroundColor: '#2da51f',
				},
				tabBarActiveTintColor: '#fff',
				tabBarInactiveTintColor: '#042d00',
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
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="home" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="inventory"
				options={{
					title: 'Inventory',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name="package-variant"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="add-product"
				options={{
					title: 'Add Product',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="plus-thick" size={24} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profile',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="account" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="orders"
				options={{
					title: 'Orders',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="receipt" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
