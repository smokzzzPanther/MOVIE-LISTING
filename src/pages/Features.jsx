const features = [
	{
		title: 'Simple Product Listing',
		text: 'Products are stored in one data file and displayed using reusable cards.',
	},
	{
		title: 'Cart with Quantity',
		text: 'The cart uses context so every page can add, remove and update products.',
	},
	{
		title: 'Search and Filters',
		text: 'useMemo filters products only when the search, category or price changes.',
	},
];

function Features() {
	return (
		<div className="page">
			<div className="page-heading">
				<p className="small-title">Features</p>
				<h1>What This Project Shows</h1>
				<p>These are the main React concepts used in the website.</p>
			</div>

			<div className="feature-grid">
				{features.map((feature) => (
					<div className="simple-card" key={feature.title}>
						<h2>{feature.title}</h2>
						<p>{feature.text}</p>
					</div>
				))}
			</div>
		</div>
	);
}

export default Features;
