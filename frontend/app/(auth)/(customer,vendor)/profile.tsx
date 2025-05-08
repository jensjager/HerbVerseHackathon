import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Profile() {
	const handleEditProfile = () => {
		alert('Edit Profile clicked!');
	};

	const handleLogout = () => {
		alert('Logged out!');
	};

	return (
		<View className="flex-1 p-4 bg-white">
			<Text className="text-2xl font-bold mb-4 text-center">Profile</Text>
			<View className="flex-row justify-between mb-2">
				<Text className="text-lg font-bold">Name:</Text>
				<Text className="text-lg text-gray-600">John Doe</Text>
			</View>
			<View className="flex-row justify-between mb-4">
				<Text className="text-lg font-bold">Email:</Text>
				<Text className="text-lg text-gray-600">johndoe@example.com</Text>
			</View>
			<View className="space-y-2">
				<Button title="Edit Profile" onPress={handleEditProfile} />
				<Button title="Logout" onPress={handleLogout} color="red" />
			</View>
		</View>
	);
}
