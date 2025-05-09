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
			<Tabs.Screen name="product/[id]" options={{ href: null }} />
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
				name="search"
				options={{
					title: 'Search',
					tabBarIcon: () => (
						<MaterialCommunityIcons name="magnify" size={24} color="black" />
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
				name="cart"
				options={{
					title: 'Cart',
					tabBarIcon: () => (
						<MaterialCommunityIcons name="cart" size={24} color="black" />
					),
				}}
			/>
		</Tabs>
	);
}
