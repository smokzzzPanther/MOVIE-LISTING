import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Matches from './pages/Matches';
import Features from './pages/Features';

function AppContent() {
	const { currentPage, toast } = useApp();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [currentPage]);

	function showPage() {
		if (currentPage === 'shop') return <Shop />;
		if (currentPage === 'cart') return <Cart />;
		if (currentPage === 'login') return <Login />;
		if (currentPage === 'detail') return <ProductDetail />;
		if (currentPage === 'matches') return <Matches />;
		if (currentPage === 'features') return <Features />;
		return <Home />;
	}

	return (
		<>
			<Navbar />
			<main>{showPage()}</main>
			{toast && <div className="toast">{toast}</div>}
		</>
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
