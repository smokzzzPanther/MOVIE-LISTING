import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { priceRanges } from '../data/products';
import ProductCard from './ProductCard';
import Sidebar from './Sidebar';

function Armory() {
	const { products, searchQuery, setSearchQuery, navigate, addToCart } = useApp();
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
	const [sortBy, setSortBy] = useState('default');

	const filteredProducts = useMemo(() => {
		let result = products.filter((product) => {
			const matchesSearch = product.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === 'All' || product.category === selectedCategory;
			const matchesPrice =
				product.price >= selectedPriceRange.min &&
				product.price <= selectedPriceRange.max;

			return matchesSearch && matchesCategory && matchesPrice;
		});

		if (sortBy === 'low') {
			result = [...result].sort((a, b) => a.price - b.price);
		}

		if (sortBy === 'high') {
			result = [...result].sort((a, b) => b.price - a.price);
		}

		return result;
	}, [products, searchQuery, selectedCategory, selectedPriceRange, sortBy]);

	return (
		<section className="shop-section">
			<div className="section-heading">
				<p className="small-title">Products</p>
				<h2>Gaming Gear Shop</h2>
				<p>Search, filter and add products to the cart.</p>
			</div>

			<div className="shop-layout">
				<Sidebar
					selectedCategory={selectedCategory}
					setSelectedCategory={setSelectedCategory}
					selectedPriceRange={selectedPriceRange}
					setSelectedPriceRange={setSelectedPriceRange}
				/>

				<div className="products-area">
					<div className="shop-toolbar">
						<input
							type="text"
							placeholder="Search products..."
							value={searchQuery}
							onChange={(event) => setSearchQuery(event.target.value)}
						/>

						<select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
							<option value="default">Default Order</option>
							<option value="low">Price: Low to High</option>
							<option value="high">Price: High to Low</option>
						</select>
					</div>

					<p className="result-count">{filteredProducts.length} products found</p>

					<div className="product-grid">
						{filteredProducts.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								onViewDetails={() => navigate('detail', product.id)}
								onAddToCart={() => addToCart(product)}
							/>
						))}
					</div>

					{filteredProducts.length === 0 && (
						<p className="empty-text">No products matched your search.</p>
					)}
				</div>
			</div>
		</section>
	);
}

export default Armory;
