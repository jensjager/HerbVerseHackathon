import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
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
		<View className="flex-1 p-6 bg-green-100">
			{/* Profile Details */}
			<View className="bg-white p-6 rounded-lg shadow-md mb-6">
				<View className="flex-row justify-between mb-4">
					<Text className="text-lg font-bold text-gray-800">Username:</Text>
					<Text className="text-lg text-gray-600">
						{user?.username || 'N/A'}
					</Text>
				</View>
				<View className="flex-row justify-between mb-4">
					<Text className="text-lg font-bold text-gray-800">Email:</Text>
					<Text className="text-lg text-gray-600">
						{user?.primaryEmailAddress?.emailAddress || 'N/A'}
					</Text>
				</View>
				<View className="flex-row justify-between mb-4">
					<Text className="text-lg font-bold text-gray-800">Type:</Text>
					<Text className="text-lg text-gray-600">
						{String(user?.unsafeMetadata?.role || 'customer')}
					</Text>
				</View>
			</View>

			{/* Action Buttons */}
			<View className="space-y-4 flex gap-6 items-end">
				<TouchableOpacity
					className="bg-green-600 p-4 rounded-lg shadow-md w-full"
					onPress={toggleRole}
				>
					<Text className="text-center text-white font-bold text-lg">
						Switch Role
					</Text>
				</TouchableOpacity>
				<SignOutButton />
			</View>
		</View>
	);
}
