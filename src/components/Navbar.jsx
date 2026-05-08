import { useApp } from '../context/AppContext';

const navLinks = [
	{ label: 'Home', page: 'home' },
	{ label: 'Shop', page: 'shop' },
	{ label: 'Matches', page: 'matches' },
	{ label: 'Features', page: 'features' },
];

function Navbar() {
	const { cart, currentPage, user, navigate, logout } = useApp();

	const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

	return (
		<header className="navbar">
			<button className="logo-button" onClick={() => navigate('home')}>
				<img src="/assets/dealio-logo.svg" alt="Dealio" className="logo" />
			</button>

			<nav className="nav-links">
				{navLinks.map((link) => (
					<button
						key={link.page}
						className={currentPage === link.page ? 'nav-link active' : 'nav-link'}
						onClick={() => navigate(link.page)}
					>
						{link.label}
					</button>
				))}
			</nav>

			<div className="nav-actions">
				<button className="cart-button" onClick={() => navigate('cart')}>
					Cart ({cartCount})
				</button>

				{user ? (
					<button className="outline-button" onClick={logout}>
						Logout
					</button>
				) : (
					<button className="primary-button" onClick={() => navigate('login')}>
						Login
					</button>
				)}
			</div>
		</header>
	);
}

export default Navbar;
