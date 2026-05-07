/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';

import { products as localProducts } from '../data/products';

const AppContext = createContext();

const initialState = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	cart: JSON.parse(localStorage.getItem('cart')) || [],
	currentPage: 'home',
	selectedProductId: null,
	searchQuery: '',
	toast: null,
	products: [],
	isLoadingProducts: true,
	error: null,
};

function appReducer(state, action) {
	switch (action.type) {
		case 'SET_PRODUCTS':
			return { ...state, products: action.payload, isLoadingProducts: false };
		case 'SET_PRODUCTS_ERROR':
			return { ...state, error: action.payload, isLoadingProducts: false };
		case 'LOGIN':
			return { ...state, user: action.payload, currentPage: 'home' };
		case 'LOGOUT':
			return { ...state, user: null, cart: [], currentPage: 'home' };
		case 'NAVIGATE':
			return { ...state, currentPage: action.payload.page, selectedProductId: action.payload.id || null };
		case 'ADD_TO_CART': {
			const existingItem = state.cart.find((item) => item.id === action.payload.id);
			if (existingItem) {
				return {
					...state,
					cart: state.cart.map((item) =>
						item.id === action.payload.id
							? { ...item, quantity: (item.quantity || 1) + 1 }
							: item
					),
				};
			}
			return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
		}
		case 'REMOVE_FROM_CART':
			return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
		case 'UPDATE_QUANTITY':
			return {
				...state,
				cart: state.cart
					.map((item) =>
						item.id === action.payload.id
							? { ...item, quantity: Math.max(0, (item.quantity || 1) + action.payload.delta) }
							: item
					)
					.filter((item) => item.quantity > 0),
			};
		case 'CLEAR_CART':
			return { ...state, cart: [] };
		case 'SET_SEARCH':
			return { ...state, searchQuery: action.payload };
		case 'SET_TOAST':
			return { ...state, toast: action.payload };
		default:
			return state;
	}
}

export function AppProvider({ children }) {
	const [state, dispatch] = useReducer(appReducer, initialState);

	const showToast = (msg) => {
		dispatch({ type: 'SET_TOAST', payload: msg });
		setTimeout(() => dispatch({ type: 'SET_TOAST', payload: null }), 3000);
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				// Simulate network latency (1.5s)
				await new Promise((resolve) => setTimeout(resolve, 1500));
				dispatch({ type: 'SET_PRODUCTS', payload: localProducts });
			} catch {
				dispatch({ type: 'SET_PRODUCTS_ERROR', payload: 'Failed to fetch products' });
			}
		};
		fetchProducts();
	}, []);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(state.user));
	}, [state.user]);

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(state.cart));
	}, [state.cart]);

	return (
		<AppContext.Provider value={{ state, dispatch, showToast }}>
			{children}
		</AppContext.Provider>
	);
}


export function useApp() {
	return useContext(AppContext);
}
