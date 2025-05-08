import { Stack } from 'expo-router';

const isVendor = false;

export default function AuthLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Protected guard={!isVendor}>
				<Stack.Screen name="(customer)" />
			</Stack.Protected>
			<Stack.Protected guard={isVendor}>
				<Stack.Screen name="(vendor)" />
			</Stack.Protected>
		</Stack>
	);
}
