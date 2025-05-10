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
			<Tabs.Screen name="product/[id]" options={{ href: null }} />
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
				name="search"
				options={{
					title: 'Search',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="magnify" size={24} color={color} />
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
				name="cart"
				options={{
					title: 'Cart',
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons name="cart" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
