import { Redirect, Stack, useRouter } from 'expo-router';
import { useAuth, useUser } from '@clerk/clerk-expo';
import { ActivityIndicator, View } from 'react-native';
import { useEffect } from 'react';

export default function ProtectedLayout() {
	const { isSignedIn, isLoaded } = useAuth();
	const { user } = useUser();
	const router = useRouter();

	useEffect(() => {
		if (user?.unsafeMetadata?.role) {
			router.replace('/profile');
		}
	}, [user?.unsafeMetadata?.role]);

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

	const isVendor = user?.unsafeMetadata?.role === 'vendor';

	return (
		<Stack
			key={isVendor ? 'vendor' : 'customer'}
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
