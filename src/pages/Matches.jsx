import { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';

const matches = [
	{
		id: 1,
		title: 'Nightfall Scrim Series',
		game: 'COD Mobile',
		date: '10 May 2026',
		status: 'Open',
		prize: 'Rs 1,00,000',
	},
	{
		id: 2,
		title: 'Skyesports Championship',
		game: 'COD Mobile',
		date: '15 May 2026',
		status: 'Upcoming',
		prize: 'Rs 15,00,000',
	},
	{
		id: 3,
		title: 'Loco Warfare India Series',
		game: 'COD Mobile',
		date: '5 June 2026',
		status: 'Upcoming',
		prize: 'Rs 20,00,000',
	},
	{
		id: 4,
		title: 'Weekend Practice Cup',
		game: 'BGMI',
		date: 'Completed',
		status: 'Completed',
		prize: 'Rs 25,000',
	},
];

function Matches() {
	const { user, navigate, showToast } = useApp();
	const [statusFilter, setStatusFilter] = useState('All');

	const visibleMatches = useMemo(() => {
		if (statusFilter === 'All') return matches;
		return matches.filter((match) => match.status === statusFilter);
	}, [statusFilter]);

	function handleRegister(match) {
		if (!user) {
			showToast('Please login before registering');
			navigate('login');
			return;
		}

		showToast(`Registered for ${match.title}`);
	}

	return (
		<div className="page">
			<div className="page-heading">
				<p className="small-title">Tournaments</p>
				<h1>Gaming Matches</h1>
				<p>A simple list of match events with a basic status filter.</p>
			</div>

			<div className="filter-buttons">
				{['All', 'Open', 'Upcoming', 'Completed'].map((status) => (
					<button
						key={status}
						className={statusFilter === status ? 'active-filter' : ''}
						onClick={() => setStatusFilter(status)}
					>
						{status}
					</button>
				))}
			</div>

			<div className="match-grid">
				{visibleMatches.map((match) => (
					<div className="simple-card" key={match.id}>
						<p className="product-category">{match.status}</p>
						<h2>{match.title}</h2>
						<p>{match.game}</p>
						<p>Date: {match.date}</p>
						<p>Prize: {match.prize}</p>

						<button
							className="primary-button"
							onClick={() => handleRegister(match)}
							disabled={match.status === 'Completed'}
						>
							{match.status === 'Completed' ? 'Closed' : 'Register'}
						</button>
					</div>
				))}
			</div>
		</div>
	);
}

export default Matches;
