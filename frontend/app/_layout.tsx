import { Slot } from 'expo-router';
import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { CartProvider } from '@/context/CartContext';
import './global.css';

export default function RootLayout() {
	return (
		<ClerkProvider tokenCache={tokenCache}>
			<CartProvider>
				<Slot />
			</CartProvider>
		</ClerkProvider>
	);
}
