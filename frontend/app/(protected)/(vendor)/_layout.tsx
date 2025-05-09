import { Tabs } from 'expo-router';

export default function VendorLayout() {
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					display: 'none',
				},
			}}
		></Tabs>
	);
}
