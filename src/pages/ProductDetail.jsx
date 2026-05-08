import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/products';

function ProductDetail() {
	const { products, selectedProductId, navigate, addToCart } = useApp();
	const [quantity, setQuantity] = useState(1);

	const product = products.find((item) => item.id === selectedProductId);

	if (!product) {
		return (
			<div className="page empty-box">
				<h1>Product not found</h1>
				<button className="primary-button" onClick={() => navigate('shop')}>
					Back to Shop
				</button>
			</div>
		);
	}

	function addSelectedQuantity() {
		addToCart(product, quantity);
		navigate('cart');
	}

	return (
		<div className="page detail-page">
			<button className="text-button" onClick={() => navigate('shop')}>
				Back to Shop
			</button>

			<div className="detail-layout">
				<img src={product.image} alt={product.title} className="detail-image" />

				<div className="detail-info">
					<p className="product-category">{product.category}</p>
					<h1>{product.title}</h1>
					<p className="seller">Sold by {product.seller}</p>
					<p className="rating">Rating: {product.rating}</p>
					<p className="price detail-price">{formatPrice(product.price)}</p>
					<p>
						This product is part of Dealio's gaming gear collection. The page shows
						how props, state and context work together in React.
					</p>

					<div className="quantity-row">
						<button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
						<span>{quantity}</span>
						<button onClick={() => setQuantity(quantity + 1)}>+</button>
					</div>

					<button className="primary-button" onClick={addSelectedQuantity}>
						Add {quantity} to Cart
					</button>
				</div>
			</div>
		</div>
	);
}

export default ProductDetail;
