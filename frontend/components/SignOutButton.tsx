import { useClerk } from '@clerk/clerk-expo';
import * as Linking from 'expo-linking';
import { Text, TouchableOpacity } from 'react-native';

export const SignOutButton = () => {
	// Use `useClerk()` to access the `signOut()` function
	const { signOut } = useClerk();
	const handleSignOut = async () => {
		try {
			await signOut();
			Linking.openURL(Linking.createURL('/login'));
		} catch (err) {
			console.error(JSON.stringify(err, null, 2));
		}
	};
	return (
		<TouchableOpacity
			onPress={handleSignOut}
			className="bg-red-500 p-2 rounded-md"
		>
			<Text>Sign out</Text>
		</TouchableOpacity>
	);
};
