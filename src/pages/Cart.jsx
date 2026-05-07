import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag, Loader2, CheckCircle2 } from 'lucide-react';

const Cart = () => {
	const { state, dispatch } = useApp();
	const [isCheckingOut, setIsCheckingOut] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);

	const subtotal = state.cart.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
	const shipping = subtotal > 500 ? 0 : 15;
	const tax = subtotal * 0.08;
	const total = subtotal + shipping + tax;

	const handleCheckout = () => {
		setIsCheckingOut(true);
		setTimeout(() => {
			setIsCheckingOut(false);
			setShowSuccess(true);
			setTimeout(() => {
				dispatch({ type: 'CLEAR_CART' });
				dispatch({ type: 'NAVIGATE', payload: { page: 'home' } });
			}, 3000);
		}, 2000);
	};

	if (showSuccess) {
		return (
			<div className='min-h-[calc(100vh-80px)] flex items-center justify-center px-6'>
				<Motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className='text-center max-w-sm glass-card p-10 bg-dark-surface/90 border border-primary/20'
				>
					<div className='w-20 h-20 bg-primary/20 flex items-center justify-center mx-auto mb-6 text-primary border border-primary/30'>
						<CheckCircle2 size={40} />
					</div>
					<h2 className='text-3xl font-black text-white mb-2 tracking-tighter uppercase'>Asset Secured</h2>
					<p className='text-slate-400 font-bold mb-8 uppercase text-xs tracking-widest'>Your tactical gear is being deployed. Return to base...</p>
					<div className='w-full bg-dark-border h-1.5 overflow-hidden'>
						<Motion.div
							initial={{ width: 0 }}
							animate={{ width: '100%' }}
							transition={{ duration: 3 }}
							className='bg-primary h-full shadow-[0_0_10px_rgba(255,107,0,0.8)]'
						/>
					</div>
				</Motion.div>
			</div>
		);
	}

	return (
		<div className='max-w-7xl mx-auto px-6 py-12 pt-32'>
			<button 
				onClick={() => dispatch({ type: 'NAVIGATE', payload: { page: 'home' } })}
				className='flex items-center gap-2 text-slate-400 hover:text-primary font-black text-sm mb-10 transition-colors group uppercase tracking-widest'
			>
				<ArrowLeft size={18} className='group-hover:-translate-x-1 transition-transform' />
				Back to Armory
			</button>

			<div className='flex flex-col lg:flex-row gap-12'>
				<div className='flex-1 space-y-8'>
					<header className='flex items-end justify-between border-b border-white/5 pb-6'>
						<div>
							<h1 className='text-4xl font-black text-white tracking-tighter mb-2 uppercase'>Your Loadout</h1>
							<p className='text-primary font-bold uppercase tracking-widest text-sm'>{state.cart.length} gear selected</p>
						</div>
						{state.cart.length > 0 && (
							<button 
								onClick={() => dispatch({ type: 'CLEAR_CART' })}
								className='text-xs font-black text-red-400 hover:text-red-300 transition-colors uppercase tracking-widest'
							>
								Clear Stash
							</button>
						)}
					</header>

					{state.cart.length === 0 ? (
						<div className='glass-card p-20 text-center border-dashed border-2 border-white/10 bg-transparent'>
							<ShoppingBag className='mx-auto text-slate-700 mb-6' size={60} />
							<h3 className='text-xl font-bold text-white mb-8 uppercase tracking-widest'>Your loadout is empty</h3>
							<button 
								className='btn-primary'
								onClick={() => dispatch({ type: 'NAVIGATE', payload: { page: 'home' } })}
							>
								VIEW ARMORY
							</button>
						</div>
					) : (
						<div className='space-y-4'>
							<AnimatePresence mode='popLayout'>
								{state.cart.map((item) => (
									<Motion.div
										key={item.id}
										layout
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, scale: 0.95 }}
										className='glass-card p-6 flex gap-6 items-center bg-dark-surface/50 border-l-2 border-l-primary'
									>
										<img src={item.image} className='w-24 h-24 object-cover border border-white/5 grayscale hover:grayscale-0 transition-all duration-500' />
										<div className='flex-1 min-w-0'>
											<h3 className='text-lg font-bold text-white truncate mb-1 uppercase tracking-wide'>{item.title}</h3>
											<p className='text-[10px] font-bold text-primary mb-4 uppercase tracking-widest'>{item.price.toFixed(2)} CREDITS</p>
											<div className='flex items-center gap-4'>
												<div className='flex items-center gap-3 bg-dark-bg p-1 border border-white/5'>
													<button 
														className='w-8 h-8 flex items-center justify-center hover:bg-white/5 transition-colors text-white'
														onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, delta: -1 } })}
													>
														<Minus size={14} />
													</button>
													<span className='w-4 text-center font-black text-sm text-white'>{item.quantity}</span>
													<button 
														className='w-8 h-8 flex items-center justify-center hover:bg-white/5 transition-colors text-white'
														onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, delta: 1 } })}
													>
														<Plus size={14} />
													</button>
												</div>
												<button 
													className='p-2 text-slate-500 hover:text-red-500 transition-colors'
													onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: item.id })}
												>
													<Trash2 size={18} />
												</button>
											</div>
										</div>
										<div className='text-right'>
											<p className='text-xl font-black text-white'>{(item.price * item.quantity).toFixed(2)}</p>
											<p className='text-[10px] font-black text-slate-500 uppercase tracking-widest'>TOTAL CR</p>
										</div>
									</Motion.div>
								))}
							</AnimatePresence>
						</div>
					)}
				</div>

				<div className='lg:w-96'>
					<div className='glass-card p-8 sticky top-32 border-t-2 border-t-primary'>
						<h2 className='text-xl font-black text-white mb-8 tracking-tighter uppercase'>Operation Costs</h2>
						<div className='space-y-4 mb-10'>
							<div className='flex justify-between text-sm font-bold'>
								<span className='text-slate-400 uppercase tracking-widest text-[10px]'>Gear Subtotal</span>
								<span className='text-white'>{(subtotal).toFixed(2)} CR</span>
							</div>
							<div className='flex justify-between text-sm font-bold'>
								<span className='text-slate-400 uppercase tracking-widest text-[10px]'>Deployment Fee</span>
								<span className={shipping === 0 ? 'text-primary' : 'text-white'}>
									{shipping === 0 ? 'WAIVED' : `${(shipping).toFixed(2)} CR`}
								</span>
							</div>
							<div className='flex justify-between text-sm font-bold'>
								<span className='text-slate-400 uppercase tracking-widest text-[10px]'>Base Tax</span>
								<span className='text-white'>{(tax).toFixed(2)} CR</span>
							</div>
							<div className='pt-6 border-t border-white/5 flex justify-between items-end'>
								<span className='text-primary font-black uppercase tracking-widest text-xs'>Final Value</span>
								<span className='text-3xl font-black text-white'>{(total).toFixed(2)} <span className="text-sm text-primary">CR</span></span>
							</div>
						</div>
						<button 
							className='w-full btn-primary flex items-center justify-center gap-3'
							onClick={handleCheckout}
							disabled={isCheckingOut || state.cart.length === 0}
						>
							{isCheckingOut ? (
								<>
									<Loader2 size={20} className='animate-spin' />
									TRANSMITTING...
								</>
							) : (
								<>
									<ShoppingBag size={20} />
									CONFIRM LOADOUT
								</>
							)}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
