import React from 'react';
import { View, Text, Button } from 'react-native';
import { SignOutButton } from '@/components/SignOutButton';
import { useUser } from '@clerk/clerk-expo';

export default function Profile() {
	const { user } = useUser();

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
					{String(user?.unsafeMetadata?.role || 'N/A')}
				</Text>
			</View>
			<View className="space-y-2">
				<SignOutButton />
			</View>
		</View>
	);
}
