import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@clerk/clerk-expo';
import { ActivityIndicator, View } from 'react-native';

export default function AuthLayout() {
	const { isSignedIn, isLoaded } = useAuth();

	if (!isLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator />
			</View>
		);
	}

	if (isSignedIn) {
		return <Redirect href={'/'} />;
	}

	return (
		<Stack>
			<Stack.Screen
				name="login"
				options={{ headerShown: false, title: 'Sign in' }}
			/>
			<Stack.Screen
				name="register"
				options={{ headerShown: false, title: 'Sign up' }}
			/>
		</Stack>
	);
}
