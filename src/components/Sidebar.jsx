import { categories, priceRanges } from '../data/products';

function Sidebar({
	selectedCategory,
	setSelectedCategory,
	selectedPriceRange,
	setSelectedPriceRange,
}) {
	return (
		<aside className="filters">
			<h2>Filters</h2>

			<label>Category</label>
			<select
				value={selectedCategory}
				onChange={(event) => setSelectedCategory(event.target.value)}
			>
				{categories.map((category) => (
					<option key={category} value={category}>
						{category}
					</option>
				))}
			</select>

			<label>Price Range</label>
			<select
				value={selectedPriceRange.label}
				onChange={(event) => {
					const selectedRange = priceRanges.find(
						(range) => range.label === event.target.value
					);
					setSelectedPriceRange(selectedRange);
				}}
			>
				{priceRanges.map((range) => (
					<option key={range.label} value={range.label}>
						{range.label}
					</option>
				))}
			</select>
		</aside>
	);
}

export default Sidebar;
