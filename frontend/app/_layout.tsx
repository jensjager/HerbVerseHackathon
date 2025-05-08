import { Stack } from 'expo-router';
import './global.css';

const isLoggedIn = true;

export default function RootLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Protected guard={!isLoggedIn}>
				<Stack.Screen name="login" />
			</Stack.Protected>
			<Stack.Protected guard={isLoggedIn}>
				<Stack.Screen name="(auth)" />
			</Stack.Protected>
		</Stack>
	);
}
