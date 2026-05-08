import { formatPrice } from '../data/products';

function ProductCard({ product, onViewDetails, onAddToCart }) {
	return (
		<div className="product-card">
			<img src={product.image} alt={product.title} className="product-image" />

			<div className="product-info">
				<p className="product-category">{product.category}</p>
				<h3>{product.title}</h3>
				<p className="seller">Sold by {product.seller}</p>
				<p className="rating">Rating: {product.rating}</p>
				<p className="price">{formatPrice(product.price)}</p>
			</div>

			<div className="product-actions">
				<button className="outline-button" onClick={onViewDetails}>
					Details
				</button>
				<button className="primary-button" onClick={onAddToCart}>
					Add to Cart
				</button>
			</div>
		</div>
	);
}

export default ProductCard;
