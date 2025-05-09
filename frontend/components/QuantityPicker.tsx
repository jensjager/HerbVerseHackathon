import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

type QuantityStepperProps = {
	initial: number;
	min: number;
	max: number;
	step: number;
	onChange?: (value: number) => void;
	name?: string;
};

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
	initial = 1,
	min = 0,
	max = Number.MAX_SAFE_INTEGER,
	step = 1,
	onChange,
	name,
}) => {
	const [count, setCount] = useState(initial);

	useEffect(() => {
		let newCount = count;
		if (newCount < min) newCount = min;
		if (newCount > max) newCount = max;
		if (newCount !== count) {
			setCount(newCount);
		}
	}, [count, min, max]);

	useEffect(() => {
		if (typeof onChange === 'function') {
			onChange(count);
		}
	}, [count, onChange]);

	const adjust = (delta: number) => () => {
		setCount(prev => Math.min(Math.max(prev + delta, min), max));
	};

	const handleInput = (text: string) => {
		const value = parseInt(text, 10);
		if (!isNaN(value)) {
			setCount(Math.min(Math.max(value, min), max));
		} else {
			setCount(min);
		}
	};

	return (
		<View className="flex flex-row items-center space-x-2">
			<TouchableOpacity
				className={`px-4 py-2 rounded ${
					count <= min ? 'bg-gray-300' : 'bg-gray-200'
				}`}
				onPress={adjust(-step)}
				disabled={count <= min}
				accessibilityLabel="Decrease quantity"
			>
				<Text className="text-lg font-bold">–</Text>
			</TouchableOpacity>
			<TextInput
				className="w-16 h-10 text-center border border-gray-300 rounded"
				value={String(count)}
				onChangeText={handleInput}
				keyboardType="number-pad"
				textAlign="center"
				accessibilityLabel={name}
			/>
			<TouchableOpacity
				className={`px-4 py-2 rounded ${
					count >= max ? 'bg-gray-300' : 'bg-gray-200'
				}`}
				onPress={adjust(step)}
				disabled={count >= max}
				accessibilityLabel="Increase quantity"
			>
				<Text className="text-lg font-bold">+</Text>
			</TouchableOpacity>
		</View>
	);
};
