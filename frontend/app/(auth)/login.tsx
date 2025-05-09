import { useSignIn } from '@clerk/clerk-expo';
import { Link, Redirect, useRouter } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import React from 'react';

export default function Page() {
	const { signIn, setActive, isLoaded } = useSignIn();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = React.useState('');
	const [password, setPassword] = React.useState('');

	// Handle the submission of the sign-in form
	const onSignInPress = async () => {
		if (!isLoaded) return;

		try {
			const signInAttempt = await signIn.create({
				identifier: emailAddress,
				password,
			});

			if (signInAttempt.status === 'complete') {
				await setActive({ session: signInAttempt.createdSessionId });
				router.replace('/');
			} else {
				console.error(JSON.stringify(signInAttempt, null, 2));
			}
		} catch (err) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<View className="flex-1 justify-center items-center bg-gray-100 p-4">
			<Text className="text-2xl font-bold text-gray-800 mb-6">Sign In</Text>
			<TextInput
				className="w-full bg-white p-4 rounded-md border border-gray-300 mb-4"
				autoCapitalize="none"
				value={emailAddress}
				placeholderTextColor="#1f2937"
				placeholder="Enter email"
				onChangeText={setEmailAddress}
			/>
			<TextInput
				className="w-full bg-white p-4 rounded-md border border-gray-300 mb-6"
				value={password}
				placeholderTextColor="#1f2937"
				placeholder="Enter password"
				secureTextEntry={true}
				onChangeText={setPassword}
			/>
			<TouchableOpacity
				onPress={onSignInPress}
				className="w-full bg-blue-500 p-4 rounded-md mb-4"
			>
				<Text className="text-center text-white font-semibold">Continue</Text>
			</TouchableOpacity>
			<View className="flex-row justify-center items-center space-x-2">
				<Text className="text-gray-600">Don't have an account?</Text>
				<TouchableOpacity onPress={() => router.navigate('/register')}>
					<Text className="text-blue-500 font-semibold">Sign up</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
