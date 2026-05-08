import { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../data/products';

function Cart() {
	const { cart, navigate, updateQuantity, removeFromCart, clearCart, showToast } = useApp();

	const subtotal = useMemo(() => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	}, [cart]);

	const deliveryCharge = subtotal > 5000 || subtotal === 0 ? 0 : 99;
	const grandTotal = subtotal + deliveryCharge;

	function checkout() {
		clearCart();
		showToast('Order placed successfully');
		navigate('home');
	}

	return (
		<div className="page cart-page">
			<div className="page-heading">
				<p className="small-title">Shopping Cart</p>
				<h1>Your Cart</h1>
				<p>These are the products you have selected.</p>
			</div>

			{cart.length === 0 ? (
				<div className="empty-box">
					<h2>Your cart is empty.</h2>
					<p>Add products from the shop and they will appear here.</p>
					<button className="primary-button" onClick={() => navigate('shop')}>
						Go to Shop
					</button>
				</div>
			) : (
				<div className="cart-layout">
					<div className="cart-items">
						{cart.map((item) => (
							<div className="cart-item" key={item.id}>
								<img src={item.image} alt={item.title} />

								<div className="cart-details">
									<h3>{item.title}</h3>
									<p>{formatPrice(item.price)}</p>

									<div className="quantity-row">
										<button onClick={() => updateQuantity(item.id, -1)}>-</button>
										<span>{item.quantity}</span>
										<button onClick={() => updateQuantity(item.id, 1)}>+</button>
									</div>
								</div>

								<div className="cart-side">
									<strong>{formatPrice(item.price * item.quantity)}</strong>
									<button className="text-button" onClick={() => removeFromCart(item.id)}>
										Remove
									</button>
								</div>
							</div>
						))}
					</div>

					<aside className="cart-summary">
						<h2>Bill Summary</h2>
						<div className="summary-row">
							<span>Subtotal</span>
							<strong>{formatPrice(subtotal)}</strong>
						</div>
						<div className="summary-row">
							<span>Delivery</span>
							<strong>{deliveryCharge === 0 ? 'Free' : formatPrice(deliveryCharge)}</strong>
						</div>
						<div className="summary-row total-row">
							<span>Total</span>
							<strong>{formatPrice(grandTotal)}</strong>
						</div>

						<button className="primary-button full-width" onClick={checkout}>
							Checkout
						</button>
						<button className="outline-button full-width" onClick={clearCart}>
							Clear Cart
						</button>
					</aside>
				</div>
			)}
		</div>
	);
}

export default Cart;
