import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion as Motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star, Shield, Truck, RotateCcw, Plus, Minus, Loader } from 'lucide-react';

const ProductDetail = () => {
	// Detail state: reads selectedProductId globally and stores desired quantity locally.
	const { state, dispatch, showToast } = useApp();
	const [quantity, setQuantity] = useState(1);

	// Loading guard: shown while products are being loaded into context.
	if (state.isLoadingProducts) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] opacity-50">
				<Loader className="animate-spin text-blue-500 mb-4" size={48} />
				<p className="text-slate-400 font-bold tracking-widest uppercase">Initializing Asset...</p>
			</div>
		);
	}

	// Product lookup: finds the product selected from Armory by selectedProductId.
	const product = state.products.find((p) => p.id === state.selectedProductId);

	// Missing-product guard: sends the user back if the selected product cannot be found.
	if (!product) {
		return (
			<div className='min-h-[calc(100vh-80px)] flex flex-col items-center justify-center gap-8'>
				<h1 className='text-4xl font-black text-white'>Asset Not Found</h1>
				<button
					className='btn-primary'
					onClick={() => dispatch({ type: 'NAVIGATE', payload: { page: 'home' } })}
				>
					Back to Market
				</button>
			</div>
		);
	}

	// Add-to-cart logic: dispatches one cart add per selected quantity.
	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			dispatch({ type: 'ADD_TO_CART', payload: product });
		}
		showToast(`${product.title} allocated to portfolio!`);
	};

	return (
		<div className='max-w-[1400px] mx-auto px-6 py-12 pt-32'>
			{/* Back action: returns from ProductDetail to the armory/home page. */}
			<button
				onClick={() => dispatch({ type: 'NAVIGATE', payload: { page: 'home' } })}
				className='flex items-center gap-2 text-slate-400 hover:text-primary font-black text-sm mb-10 transition-colors group uppercase tracking-widest'
			>
				<ArrowLeft size={18} className='group-hover:-translate-x-1 transition-transform' />
				Back to Armory
			</button>

			<div className='grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24'>
				{/* Product media section: displays the selected product image. */}
				<Motion.div
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					className='relative aspect-square'
				>
					<div className='w-full h-full bg-dark-surface/50 border-l-4 border-primary overflow-hidden p-8'>
						<img
							src={product.image}
							alt={product.title}
							className='w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700'
						/>
					</div>
					<div className='absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-full blur-3xl opacity-20'></div>
				</Motion.div>

				{/* Product purchase section: displays details, price, quantity, and cart action. */}
				<Motion.div
					initial={{ opacity: 0, x: 20 }}
					animate={{ opacity: 1, x: 0 }}
					className='flex flex-col'
				>
					<div className='space-y-4 mb-8'>
						<div className='flex items-center gap-3'>
							<span className='px-4 py-1.5 bg-primary/10 text-primary rounded-none text-[10px] font-black uppercase tracking-widest border border-primary/20'>
								{product.category}
							</span>
							<div className='flex items-center gap-1 text-primary'>
								<Star size={14} className='fill-current' />
								<span className='text-xs font-black text-white ml-1'>{product.rating}</span>
								<span className='text-xs font-bold text-slate-500 ml-1 uppercase tracking-widest'>(500+ LOGS)</span>
							</div>
						</div>

						<h1 className='text-5xl sm:text-6xl font-black text-white tracking-tighter leading-tight uppercase'>
							{product.title}
						</h1>

						<p className='text-slate-400 font-bold text-lg leading-relaxed max-w-xl'>
							The gold standard in tactical hardware. Experience unparalleled performance with the
							<span className='text-white uppercase'> {product.title}</span>. Trusted by over 10k operatives worldwide.
						</p>
					</div>

					<div className='mb-12 py-8 border-y border-white/5'>
						<div className='flex items-baseline gap-4 mb-2'>
							<span className='text-5xl font-black text-white tracking-tighter'>{product.price.toFixed(2)} <span className="text-xl text-primary">CR</span></span>
							<span className='text-xl text-slate-600 font-bold line-through'>{(product.price * 1.2).toFixed(2)} CR</span>
						</div>
						<p className='text-primary font-bold text-sm flex items-center gap-2 uppercase tracking-widest'>
							<Truck size={16} /> Fast Global Deployment Included
						</p>
					</div>

					<div className='space-y-8'>
						<div className='flex items-center gap-8'>
							{/* Quantity controls: clamps the minimum quantity to 1. */}
							<div className='flex items-center gap-4 bg-dark-bg p-2 border border-white/10'>
								<button
									className='w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors text-white'
									onClick={() => setQuantity(Math.max(1, quantity - 1))}
								>
									<Minus size={20} />
								</button>
								<span className='w-8 text-center text-xl font-black text-white'>{quantity}</span>
								<button
									className='w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors text-white'
									onClick={() => setQuantity(quantity + 1)}
								>
									<Plus size={20} />
								</button>
							</div>

							<button
								className='flex-1 btn-primary flex items-center justify-center gap-3 py-5'
								onClick={handleAddToCart}
							>
								<ShoppingCart size={24} />
								<span className='text-lg'>ALLOCATE TO GEAR</span>
							</button>
						</div>

						<div className='grid grid-cols-3 gap-6 pt-10 border-t border-white/5'>
							{/* Trust badges: summarizes warranty, delivery, and return policy. */}
							<div className='space-y-3'>
								<div className='w-12 h-12 bg-dark-surface border border-primary/30 flex items-center justify-center text-primary'>
									<Shield size={24} />
								</div>
								<h4 className='text-xs font-black text-white uppercase tracking-widest'>Protected</h4>
								<p className='text-[10px] text-slate-500 font-bold leading-relaxed uppercase'>2-Year hardware warranty.</p>
							</div>
							<div className='space-y-3'>
								<div className='w-12 h-12 bg-dark-surface border border-primary/30 flex items-center justify-center text-primary'>
									<Truck size={24} />
								</div>
								<h4 className='text-xs font-black text-white uppercase tracking-widest'>Priority</h4>
								<p className='text-[10px] text-slate-500 font-bold leading-relaxed uppercase'>Dispatched from command center.</p>
							</div>
							<div className='space-y-3'>
								<div className='w-12 h-12 bg-dark-surface border border-primary/30 flex items-center justify-center text-primary'>
									<RotateCcw size={24} />
								</div>
								<h4 className='text-xs font-black text-white uppercase tracking-widest'>Flexibility</h4>
								<p className='text-[10px] text-slate-500 font-bold leading-relaxed uppercase'>30-Day returns. No questions.</p>
							</div>
						</div>
					</div>
				</Motion.div>
			</div>
		</div>
	);
};

export default ProductDetail;
