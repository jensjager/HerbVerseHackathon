import { Redirect, Stack } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { ActivityIndicator, View } from 'react-native';

const isVendor = false;

export default function ProtectedLayout() {
	const { isSignedIn, isLoaded } = useAuth();
	const { user } = useUser();

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

	const isVendor = user?.publicMetadata?.role === 'vendor';

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
