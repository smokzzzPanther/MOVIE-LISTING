import { useApp } from '../context/AppContext';

function Hero() {
	const { navigate } = useApp();

	return (
		<section className="hero">
			<div className="hero-text">
				<p className="small-title">Gaming Deals Store</p>
				<h1>Buy gaming gear without confusion.</h1>
				<p>
					Dealio is a simple React shopping website for keyboards, mice, headsets,
					mousepads and monitors.
				</p>

				<div className="hero-buttons">
					<button className="primary-button" onClick={() => navigate('shop')}>
						Shop Now
					</button>
					<button className="outline-button" onClick={() => navigate('matches')}>
						View Matches
					</button>
				</div>
			</div>

			<img src="/assets/hero.png" alt="Gaming setup" className="hero-image" />
		</section>
	);
}

export default Hero;
