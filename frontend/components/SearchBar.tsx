import { View, TextInput } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

interface Props {
	placeholder: string;
	value?: string;
	onChangeText?: (text: string) => void;
	onPress?: () => void;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress }: Props) => {
	return (
		<View className="flex-row items-center bg-dark-200 rounded-lg px-5 py-4 border-solid border-gray-300 border-2">
			<MaterialCommunityIcons name="magnify" size={24} color="black" />
			<TextInput
				onPress={onPress}
				placeholder={placeholder}
				placeholderTextColor="#1f2937"
				value={value}
				onChangeText={onChangeText}
				className="flex-1 ml-2 text-gray-800"
			/>
		</View>
	);
};

export default SearchBar;
