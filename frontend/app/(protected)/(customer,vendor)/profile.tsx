import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton';
import { useUser } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';

export default function Profile() {
	const { user } = useUser();
	const router = useRouter();

	const toggleRole = async () => {
		try {
			const currentRole = user?.unsafeMetadata?.role || 'customer';
			const newRole = currentRole === 'customer' ? 'vendor' : 'customer';

			// Update the role in unsafe metadata
			await user?.update({
				unsafeMetadata: { role: newRole },
			});

			Alert.alert('Success', `Role switched to ${newRole}`);
		} catch (error) {
			console.error('Failed to update role:', error);
			Alert.alert('Error', 'Failed to switch role. Please try again.');
		}
	};

	return (
		<View className="flex-1 p-4 bg-white">
			<Text className="text-2xl font-bold mb-4 text-center">Profile</Text>
			<View className="flex-row justify-between mb-2">
				<Text className="text-lg font-bold">Username:</Text>
				<Text className="text-lg text-gray-600">{user?.username || 'N/A'}</Text>
			</View>
			<View className="flex-row justify-between mb-4">
				<Text className="text-lg font-bold">Email:</Text>
				<Text className="text-lg text-gray-600">
					{user?.primaryEmailAddress?.emailAddress || 'N/A'}
				</Text>
			</View>
			<View className="flex-row justify-between mb-4">
				<Text className="text-lg font-bold">Type:</Text>
				<Text className="text-lg text-gray-600">
					{String(user?.unsafeMetadata?.role || 'customer')}
				</Text>
			</View>
			<View className="space-y-4">
				<Button title="Switch Role" onPress={toggleRole} color="#3B82F6" />
				<SignOutButton />
			</View>
		</View>
	);
}
