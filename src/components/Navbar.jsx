import { useApp } from '../context/AppContext';
import { LogOut, User } from 'lucide-react';

const Navbar = () => {
	const { state, dispatch } = useApp();

	// Navigation helper: changes the current page in global state.
	const handleNavigate = (page, id = null) => {
		dispatch({ type: 'NAVIGATE', payload: { page, id } });
	};

	return (
		<nav className='absolute top-0 w-full z-[100] h-24 border-b border-white/5 bg-gradient-to-b from-black/80 to-transparent'>
			<div className='max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between gap-8'>
				{/* Logo action: clicking the Dealio mark returns to the home page. */}
				<button
					type='button'
					aria-label='Go to Dealio home'
					className='group shrink-0 cursor-pointer text-left transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-primary/50'
					onClick={() => handleNavigate('home')}
				>
					<span className='flex items-center gap-3'>
						<img
							src='/assets/dealio-logo.svg'
							alt='Dealio'
							className='h-11 w-auto sm:h-12'
						/>
						<span className='hidden lg:block border-l border-primary/30 pl-3'>
							<span className='block text-[10px] font-black uppercase tracking-[0.28em] text-primary group-hover:text-primary-light transition-colors'>
								Gear Up.
							</span>
							<span className='block text-[10px] font-black uppercase tracking-[0.28em] text-slate-300'>
								Queue In.
							</span>
						</span>
					</span>
				</button>

				{/* LINKS */}
				<div className='hidden md:flex items-center gap-10'>
					{['HOME', 'MATCHES', 'FEATURES', 'SHOP'].map((link) => {
						// Active-link logic: highlights the nav item matching currentPage.
						const pageId = link.toLowerCase();
						const isActive = state.currentPage === pageId || (pageId === 'home' && !['matches', 'features', 'shop', 'cart', 'login', 'detail'].includes(state.currentPage));

						return (
							<button 
								key={link}
								onClick={() => handleNavigate(pageId)}
								className={`text-xs font-bold tracking-[0.2em] transition-colors relative group ${isActive ? 'text-primary' : 'text-slate-300 hover:text-primary'}`}
							>
								{link}
								<div className={`absolute -bottom-2 left-0 h-0.5 bg-primary transition-all ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></div>
							</button>
						);
					})}
				</div>

				{/* ACTIONS */}
				<div className='flex items-center gap-6'>
					{state.user ? (
						/* Authenticated state: shows user identity and logout control. */
						<div className='flex items-center gap-4 bg-dark-border/50 px-4 py-2 rounded-none border border-white/5'>
							<div className='hidden sm:block text-right'>
								<p className='text-[10px] font-bold text-primary uppercase tracking-widest'>Operative</p>
								<p className='text-sm font-bold text-white'>{state.user.name}</p>
							</div>
							<button 
								className='p-2 hover:bg-red-500/10 text-slate-300 hover:text-red-400 transition-all'
								onClick={() => dispatch({ type: 'LOGOUT' })}
							>
								<LogOut size={18} />
							</button>
						</div>
					) : (
						/* Guest state: sends unauthenticated users to the login page. */
						<button 
							className='btn-primary flex items-center gap-2'
							onClick={() => handleNavigate('login')}
						>
							<User size={18} />
							<span>JOIN NOW</span>
						</button>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
