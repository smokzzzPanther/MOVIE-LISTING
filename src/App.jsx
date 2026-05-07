import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Matches from './pages/Matches';
import Features from './pages/Features';
import Shop from './pages/Shop';
import Background3D from './components/Background3D';
import { motion as Motion, AnimatePresence } from 'framer-motion';

function AppContent() {
	const { state } = useApp();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [state.currentPage]);

	const renderPage = () => {
		switch (state.currentPage) {
			case 'login':
				return <Login />;
			case 'cart':
				return <Cart />;
			case 'detail':
				return <ProductDetail />;
			case 'matches':
				return <Matches />;
			case 'features':
				return <Features />;
			case 'shop':
				return <Shop />;
			case 'home':
			default:
				return <Home />;
		}
	};

	return (
		<div className='relative min-h-screen selection:bg-primary/30 selection:text-white'>
			<Background3D />
			<Navbar />
			
			<Motion.main 
				key={state.currentPage}
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -20 }}
				transition={{ duration: 0.5, ease: 'easeOut' }}
				className='relative z-10'
			>
				{renderPage()}
			</Motion.main>

			<AnimatePresence>
				{state.toast && (
					<Motion.div
						initial={{ opacity: 0, y: 50, x: '-50%' }}
						animate={{ opacity: 1, y: 0, x: '-50%' }}
						exit={{ opacity: 0, y: 20, x: '-50%' }}
						className='fixed bottom-10 left-1/2 z-[100] px-6 py-4 bg-dark-surface border border-primary text-white shadow-[0_0_20px_rgba(255,107,0,0.2)] flex items-center gap-3 font-black tracking-widest uppercase text-sm'
					>
						<span className='text-primary'>✓</span>
						{state.toast}
					</Motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

function App() {
	return (
		<AppProvider>
			<AppContent />
		</AppProvider>
	);
}

export default App;
