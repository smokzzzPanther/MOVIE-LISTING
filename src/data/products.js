export const products = [
	{
		id: 1,
		title: 'StrikeForce Pro X Keyboard',
		price: 3999,
		image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&h=500&fit=crop&q=80',
		category: 'Keyboards',
		seller: 'StrikeForce Gear',
		rating: 4.9,
	},
	{
		id: 2,
		title: 'Viper Superlight Mouse',
		price: 2499,
		image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=500&fit=crop&q=80',
		category: 'Mice',
		seller: 'AeroTech',
		rating: 4.8,
	},
	{
		id: 3,
		title: 'Titan Heavy Mousepad',
		price: 799,
		image: 'https://images.unsplash.com/photo-1527814050087-37938154733d?w=500&h=500&fit=crop&q=80',
		category: 'Mousepads',
		seller: 'StrikeForce Gear',
		rating: 4.7,
	},
	{
		id: 4,
		title: 'Cloudburst Wireless Headset',
		price: 3299,
		image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&h=500&fit=crop&q=80',
		category: 'Headsets',
		seller: 'AudioPro Gaming',
		rating: 4.9,
	},
	{
		id: 5,
		title: 'Predator 27 Inch Monitor',
		price: 12999,
		image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop&q=80',
		category: 'Monitors',
		seller: 'VisionTech',
		rating: 4.8,
	},
	{
		id: 6,
		title: 'Phantom 60HE Keyboard',
		price: 4499,
		image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500&h=500&fit=crop&q=80',
		category: 'Keyboards',
		seller: 'PhantomCorp',
		rating: 4.9,
	},
	{
		id: 7,
		title: 'DeathStrike V3 Pro Mouse',
		price: 2999,
		image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop&q=80',
		category: 'Mice',
		seller: 'StrikeForce Gear',
		rating: 4.8,
	},
	{
		id: 8,
		title: 'Artisan Zero Soft Pad',
		price: 1199,
		image: 'https://images.unsplash.com/photo-1589254066213-a0c9dc853511?w=500&h=500&fit=crop&q=80',
		category: 'Mousepads',
		seller: 'Artisan',
		rating: 4.9,
	},
];

export const categories = ['All', 'Keyboards', 'Mice', 'Mousepads', 'Headsets', 'Monitors'];

export const priceRanges = [
	{ label: 'All Prices', min: 0, max: Infinity },
	{ label: 'Under Rs 1000', min: 0, max: 1000 },
	{ label: 'Rs 1000 - 3000', min: 1000, max: 3000 },
	{ label: 'Rs 3000 - 5000', min: 3000, max: 5000 },
	{ label: 'Above Rs 5000', min: 5000, max: Infinity },
];

export function formatPrice(price) {
	return `Rs ${Number(price).toLocaleString('en-IN')}`;
}
