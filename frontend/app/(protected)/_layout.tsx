import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { ActivityIndicator, View } from 'react-native';

const isVendor = false;

export default function ProtectedLayout() {
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (!isSignedIn) {
		return <Redirect href="/login" />;
	}

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
