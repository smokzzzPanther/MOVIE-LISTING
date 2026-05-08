/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from 'react';
import { products } from '../data/products';

const AppContext = createContext();

function readSavedValue(key, fallbackValue) {
	try {
		const savedValue = localStorage.getItem(key);
		return savedValue ? JSON.parse(savedValue) : fallbackValue;
	} catch {
		return fallbackValue;
	}
}

function cleanCartItem(item) {
	const price = Number(String(item.price).replace(/[^\d.]/g, ''));

	return {
		id: item.id,
		title: item.title,
		price: Number.isNaN(price) ? 0 : price,
		image: item.image,
		category: item.category,
		quantity: item.quantity || 1,
	};
}

export function AppProvider({ children }) {
	const [user, setUser] = useState(() => readSavedValue('user', null));
	const [cart, setCart] = useState(() => readSavedValue('cart', []).map(cleanCartItem));
	const [currentPage, setCurrentPage] = useState('home');
	const [selectedProductId, setSelectedProductId] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [toast, setToast] = useState('');

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user));
	}, [user]);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart));
	}, [cart]);

	function navigate(page, productId = null) {
		setCurrentPage(page);
		setSelectedProductId(productId);
	}

	function login(email) {
		setUser({ name: 'Student User', email });
		navigate('home');
		showToast('Login successful');
	}

	function logout() {
		setUser(null);
		setCart([]);
		navigate('home');
	}

	function showToast(message) {
		setToast(message);
		setTimeout(() => setToast(''), 2000);
	}

	function addToCart(product, amount = 1) {
		const cartProduct = cleanCartItem({ ...product, quantity: amount });

		setCart((oldCart) => {
			const alreadyInCart = oldCart.find((item) => item.id === cartProduct.id);

			if (alreadyInCart) {
				return oldCart.map((item) =>
					item.id === cartProduct.id
						? { ...item, quantity: item.quantity + amount }
						: item
				);
			}

			return [...oldCart, cartProduct];
		});

		showToast(`${product.title} added to cart`);
	}

	function removeFromCart(productId) {
		setCart((oldCart) => oldCart.filter((item) => item.id !== productId));
	}

	function updateQuantity(productId, change) {
		setCart((oldCart) =>
			oldCart
				.map((item) =>
					item.id === productId
						? { ...item, quantity: item.quantity + change }
						: item
				)
				.filter((item) => item.quantity > 0)
		);
	}

	function clearCart() {
		setCart([]);
	}

	const value = {
		products,
		user,
		cart,
		currentPage,
		selectedProductId,
		searchQuery,
		toast,
		setSearchQuery,
		navigate,
		login,
		logout,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		showToast,
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
	return useContext(AppContext);
}
