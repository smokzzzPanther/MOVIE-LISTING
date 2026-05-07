import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Sidebar from './Sidebar';
import ProductCard from './ProductCard';
import { priceRanges } from '../data/products';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Loader } from 'lucide-react';

const Armory = () => {
	// Armory state: stores selected filters, selected sort mode, and how many cards are visible.
	const { state, dispatch, showToast } = useApp();
	const [selectedCategory, setSelectedCategory] = useState('All');
	const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
	const [sortBy, setSortBy] = useState('Newest');
	const [visibleCount, setVisibleCount] = useState(6);

	// Product filtering and sorting logic: search/category/price filters run first, then sort order is applied.
	const filteredProducts = useMemo(() => {
		let result = state.products.filter((product) => {
			const matchesSearch = product.title
				.toLowerCase()
				.includes(state.searchQuery.toLowerCase());
			const matchesCategory =
				selectedCategory === 'All' || product.category === selectedCategory;
			const matchesPrice =
				product.price >= selectedPriceRange.min &&
				product.price <= selectedPriceRange.max;

			return matchesSearch && matchesCategory && matchesPrice;
		});

		if (sortBy === 'Price: Low to High') {
			result.sort((a, b) => a.price - b.price);
		} else if (sortBy === 'Price: High to Low') {
			result.sort((a, b) => b.price - a.price);
		} else if (sortBy === 'Rating') {
			result.sort((a, b) => b.rating - a.rating);
		}

		return result;
	}, [state.products, state.searchQuery, selectedCategory, selectedPriceRange, sortBy]);

	// Pagination logic: only renders the first visibleCount products until "Load More" is clicked.
	const visibleProducts = filteredProducts.slice(0, visibleCount);

	return (
		<section className='relative z-10 max-w-[1400px] mx-auto px-6 py-20 border-t border-white/5'>
            <div className="text-center mb-16">
                <h2 className="text-5xl font-black text-white tracking-tighter uppercase mb-4">Tactical <span className="text-primary">Armory</span></h2>
                <p className="text-slate-400 font-bold max-w-2xl mx-auto">Equip yourself with the best hardware and assets to secure your victory. Official Sponsors & Gear.</p>
            </div>

            <div className='flex flex-col lg:flex-row gap-8'>
                <Sidebar
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    selectedPriceRange={selectedPriceRange}
                    setSelectedPriceRange={setSelectedPriceRange}
                />

                <main className='flex-1'>
                    <header className='flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12'>
                        <div>
                            <p className='text-primary font-bold uppercase tracking-widest text-sm'>
                                {filteredProducts.length} ASSETS READY
                            </p>
                        </div>

                        <div className='flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide'>
                            {/* Sort controls: updates sortBy, which drives the useMemo sorting logic above. */}
                            {['Newest', 'Price: Low to High', 'Price: High to Low', 'Rating'].map((sort) => (
                                <button
                                    key={sort}
                                    onClick={() => setSortBy(sort)}
                                    className={`
                                        whitespace-nowrap px-4 py-2 border text-xs font-black transition-all uppercase tracking-widest
                                        ${
                                            sortBy === sort
                                                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-dark-surface/50 border-dark-border text-slate-400 hover:border-primary/50 hover:text-primary'
                                        }
                                    `}>
                                    {sort}
                                </button>
                            ))}
                        </div>
                    </header>

                    {state.isLoadingProducts ? (
                        <div className="flex flex-col items-center justify-center py-20 opacity-50">
                            <Loader className="animate-spin text-primary mb-4" size={48} />
                            <p className="text-slate-400 font-bold tracking-widest uppercase">Initializing Assets...</p>
                        </div>
                    ) : (
                        <>
                            <AnimatePresence mode='popLayout'>
                                <Motion.div 
                                    layout
                                    className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8'
                                >
                                    {visibleProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            onClick={() => dispatch({ type: 'NAVIGATE', payload: { page: 'detail', id: product.id } })}
                                            onAddToCart={(p) => {
                                                // Add-to-cart action: stores the product globally and shows a toast.
                                                dispatch({ type: 'ADD_TO_CART', payload: p });
                                                showToast(`${p.title} added to armory stash!`);
                                            }}
                                        />
                                    ))}
                                </Motion.div>
                            </AnimatePresence>

                            {visibleCount < filteredProducts.length && (
                                <div className="mt-16 flex justify-center">
                                    {/* Load-more action: reveals the next batch of product cards. */}
                                    <button 
                                        className="btn-primary"
                                        onClick={() => setVisibleCount(prev => prev + 6)}
                                    >
                                        LOAD MORE GEAR
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
		</section>
	);
};

export default Armory;
