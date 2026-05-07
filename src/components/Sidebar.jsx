import { categories, priceRanges } from '../data/products';
import { Filter, ChevronRight } from 'lucide-react';

const Sidebar = ({ selectedCategory, setSelectedCategory, selectedPriceRange, setSelectedPriceRange }) => {
	return (
		<aside className='w-80 p-8 hidden lg:block sticky top-24 h-[calc(100vh-96px)] overflow-y-auto border-r border-white/5 bg-dark-surface/50 backdrop-blur-md'>
			<div className='flex items-center gap-2 mb-10'>
				<Filter className='text-primary' size={20} />
				<h2 className='text-xl font-black text-white tracking-tight uppercase'>Refine Specs</h2>
			</div>

			<div className='space-y-10'>
				<div className='space-y-4'>
					<h3 className='text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2'>Category</h3>
					<div className='space-y-1'>
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`
									w-full flex items-center justify-between px-4 py-3 rounded-none border-l-2 text-sm font-bold transition-all uppercase tracking-wide
									${
										selectedCategory === category
											? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/5'
											: 'border-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border-slate-500'
									}
								`}>
								<span>{category}</span>
								{selectedCategory === category && <ChevronRight className="text-primary" size={14} />}
							</button>
						))}
					</div>
				</div>

				<div className='space-y-4'>
					<h3 className='text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-2'>Investment Range</h3>
					<div className='space-y-1'>
						{priceRanges.map((range) => (
							<button
								key={range.label}
								onClick={() => setSelectedPriceRange(range)}
								className={`
									w-full flex items-center justify-between px-4 py-3 rounded-none border-l-2 text-sm font-bold transition-all uppercase tracking-wide
									${
										selectedPriceRange?.label === range.label
											? 'bg-primary/10 border-primary text-white shadow-lg shadow-primary/5'
											: 'border-transparent text-slate-400 hover:text-white hover:bg-white/5 hover:border-slate-500'
									}
								`}>
								<span>{range.label}</span>
								{selectedPriceRange?.label === range.label && <ChevronRight className="text-primary" size={14} />}
							</button>
						))}
					</div>
				</div>
			</div>
		</aside>
	);
};

export default Sidebar;
