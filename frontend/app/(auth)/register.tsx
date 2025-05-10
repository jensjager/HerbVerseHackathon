import * as React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
	const { isLoaded, signUp, setActive } = useSignUp();
	const router = useRouter();

	const [emailAddress, setEmailAddress] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isVendor, setIsVendor] = React.useState(false); // Track if the user is a vendor
	const [pendingVerification, setPendingVerification] = React.useState(false);
	const [code, setCode] = React.useState('');

	// Handle submission of sign-up form
	const onSignUpPress = async () => {
		if (!isLoaded) return;

		try {
			// Start sign-up process with metadata
			await signUp.create({
				emailAddress,
				password,
				unsafeMetadata: {
					role: isVendor ? 'vendor' : 'customer', // Add custom metadata
				},
			});

			// Send verification email
			await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
			setPendingVerification(true);
		} catch (err) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	// Handle verification
	const onVerifyPress = async () => {
		if (!isLoaded) return;

		try {
			const signUpAttempt = await signUp.attemptEmailAddressVerification({
				code,
			});

			if (signUpAttempt.status === 'complete') {
				await setActive({ session: signUpAttempt.createdSessionId });
				router.replace('/');
			} else {
				console.error(JSON.stringify(signUpAttempt, null, 2));
			}
		} catch (err) {
			console.error(JSON.stringify(err, null, 2));
		}
	};

	return (
		<View className="flex-1 justify-center items-center bg-gray-100 p-4">
			{!pendingVerification ? (
				<>
					<Text className="text-2xl font-bold text-gray-800 mb-6">Sign up</Text>
					<TextInput
						className="w-full bg-white p-4 rounded-md border border-gray-300 mb-4"
						autoCapitalize="none"
						value={emailAddress}
						placeholderTextColor="#1f2937"
						placeholder="Enter email"
						onChangeText={email => setEmailAddress(email)}
					/>
					<TextInput
						className="w-full bg-white p-4 rounded-md border border-gray-300 mb-6"
						value={password}
						placeholderTextColor="#1f2937"
						placeholder="Enter password"
						secureTextEntry={true}
						onChangeText={password => setPassword(password)}
					/>

					{/* Role Selection */}
					<View className="w-full flex-row justify-between bg-gray-200 p-2 rounded-md mb-4">
						<TouchableOpacity
							onPress={() => setIsVendor(false)}
							className={`flex-1 p-4 rounded-md ${
								!isVendor ? 'bg-green-500' : 'bg-gray-200'
							}`}
						>
							<Text
								className={`text-center font-semibold ${
									!isVendor ? 'text-white' : 'text-gray-700'
								}`}
							>
								Customer
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => setIsVendor(true)}
							className={`flex-1 p-4 rounded-md ${
								isVendor ? 'bg-green-500' : 'bg-gray-200'
							}`}
						>
							<Text
								className={`text-center font-semibold ${
									isVendor ? 'text-white' : 'text-gray-700'
								}`}
							>
								Vendor
							</Text>
						</TouchableOpacity>
					</View>

					<TouchableOpacity
						onPress={onSignUpPress}
						className="w-full bg-green-700 p-4 rounded-md mb-4"
					>
						<Text className="text-center text-white font-semibold">
							Continue
						</Text>
					</TouchableOpacity>
					<View className="flex-row justify-center items-center space-x-2">
						<Text className="text-gray-600">Already have an account?</Text>
						<TouchableOpacity onPress={() => router.back()}>
							<Text className="text-green-700 font-semibold">Sign in</Text>
						</TouchableOpacity>
					</View>
				</>
			) : (
				<>
					<Text className="text-2xl font-bold text-gray-800 mb-6">
						Verify your email
					</Text>
					<TextInput
						className="w-full bg-white p-4 rounded-md border border-gray-300 mb-4"
						value={code}
						placeholder="Enter your verification code"
						onChangeText={code => setCode(code)}
					/>
					<TouchableOpacity
						onPress={onVerifyPress}
						className="w-full bg-blue-500 p-4 rounded-md mb-4"
					>
						<Text className="text-center text-white font-semibold">Verify</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
}
