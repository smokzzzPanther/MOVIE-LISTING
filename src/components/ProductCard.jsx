import { Star, ShoppingCart } from 'lucide-react';
import { motion as Motion } from 'framer-motion';

const ProductCard = ({ product, onClick, onAddToCart }) => {
	// Cart button handler: prevents card navigation and adds only this product to cart.
	const handleAddToCart = (e) => {
		e.stopPropagation();
		if (onAddToCart) {
			onAddToCart(product);
		}
	};

	return (
		/* Card click: opens ProductDetail through the onClick handler passed by Armory. */
		<Motion.div
			layout
			whileHover={{ y: -5 }}
			onClick={onClick}
			className='glass-card group p-4 cursor-pointer flex flex-col bg-dark-surface/90 border border-dark-border hover:border-primary transition-all duration-300'
		>
			<div className='relative aspect-[4/5] rounded-none overflow-hidden bg-black mb-6 border border-dark-border'>
				{/* Product image section: shows the product preview and rating badge. */}
				<img 
					src={product.image} 
					alt={product.title} 
					className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0'
				/>
				<div className='absolute top-3 left-3'>
					<div className='px-3 py-1 bg-black/80 backdrop-blur-md flex items-center gap-1 border border-primary/20'>
						<Star size={12} className='fill-primary text-primary' />
						<span className='text-[10px] font-black text-white'>{product.rating}</span>
					</div>
				</div>
			</div>

			<div className='flex flex-col flex-1'>
				{/* Product info section: shows category, seller, title, price, and cart action. */}
				<div className='flex items-center justify-between mb-2 px-1'>
					<span className='text-[10px] font-black text-primary uppercase tracking-widest'>{product.category}</span>
					<span className='text-[10px] font-bold text-slate-500 uppercase'>{product.seller}</span>
				</div>

				<h3 className='text-md font-bold text-white line-clamp-2 mb-4 group-hover:text-primary transition-colors px-1 uppercase tracking-wide'>
					{product.title}
				</h3>

				<div className='mt-auto flex items-center justify-between bg-black/40 p-3 border border-white/5'>
					<div className='flex flex-col'>
						<span className='text-[10px] font-bold text-slate-500 uppercase tracking-widest'>Credits</span>
						<span className='text-lg font-black text-white'>${product.price.toFixed(2)}</span>
					</div>
					<button 
						onClick={handleAddToCart}
						className='w-10 h-10 bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95'
					>
						<ShoppingCart size={18} />
					</button>
				</div>
			</div>
		</Motion.div>
	);
};


export default ProductCard;
