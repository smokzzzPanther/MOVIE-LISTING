import { useEffect, useMemo, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import {
    Bell,
    Calendar,
    CircleDot,
    Clock,
    ExternalLink,
    Filter,
    Gamepad2,
    LogIn,
    MapPin,
    Radio,
    Search,
    Ticket,
    Trophy,
    Users,
    Video,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const statusFilters = [
    { id: 'ALL', label: 'All Ops' },
    { id: 'LIVE', label: 'Live' },
    { id: 'OPEN', label: 'Open Reg' },
    { id: 'UPCOMING', label: 'Upcoming' },
    { id: 'COMPLETED', label: 'Completed' },
];

const matchData = [
    {
        id: 1,
        title: 'Nightfall Scrim Series',
        game: 'COD Mobile',
        region: 'India',
        location: 'Online',
        startAt: '2026-05-07T20:00:00+05:30',
        endAt: '2026-05-07T23:30:00+05:30',
        registrationClosesAt: '2026-05-07T19:30:00+05:30',
        prize: '₹1,00,000 INR',
        channel: 'StrikeForce Live',
        format: 'Best of 3 - Knockout',
        teams: 12,
        slotsLeft: 3,
        featured: true,
    },
    {
        id: 2,
        title: 'Skyesports Championship 2026',
        game: 'COD Mobile',
        region: 'India',
        location: 'Mumbai LAN + Online Qualifiers',
        startAt: '2026-05-15T18:00:00+05:30',
        endAt: '2026-05-20T23:00:00+05:30',
        registrationClosesAt: '2026-05-13T23:59:00+05:30',
        prize: '₹15,00,000 INR',
        channel: 'Skyesports',
        format: 'Group Stage + Playoffs',
        teams: 16,
        slotsLeft: 6,
        featured: true,
    },
    {
        id: 3,
        title: 'Upthrust Esports Invitational',
        game: 'COD Mobile',
        region: 'India',
        location: 'Online',
        startAt: '2026-05-25T14:00:00+05:30',
        endAt: '2026-05-28T22:00:00+05:30',
        registrationClosesAt: '2026-05-22T23:59:00+05:30',
        prize: '₹5,00,000 INR',
        channel: 'Upthrust Esports',
        format: '32 Team Invitational',
        teams: 32,
        slotsLeft: 14,
    },
    {
        id: 4,
        title: 'Loco Warfare: India Series',
        game: 'COD Mobile',
        region: 'India',
        location: 'Online',
        startAt: '2026-06-05T19:00:00+05:30',
        endAt: '2026-06-10T23:30:00+05:30',
        registrationClosesAt: '2026-05-30T23:59:00+05:30',
        prize: '₹20,00,000 + Gear',
        channel: 'Loco Originals',
        format: 'Qualifier + Finals',
        teams: 24,
        slotsLeft: 9,
    },
    {
        id: 5,
        title: 'Villager Esports Pro Clash',
        game: 'COD Mobile',
        region: 'India',
        location: 'Delhi LAN Finals',
        startAt: '2026-06-15T16:00:00+05:30',
        endAt: '2026-06-16T23:00:00+05:30',
        registrationClosesAt: '2026-06-08T23:59:00+05:30',
        prize: '₹3,00,000 INR',
        channel: 'Villager Esports',
        format: 'Qualifier Bracket',
        teams: 8,
        slotsLeft: 2,
    },
];

const getTime = (value) => new Date(value).getTime();

const getMatchStatus = (match, now) => {
    const start = getTime(match.startAt);
    const end = getTime(match.endAt);
    const registrationEnd = getTime(match.registrationClosesAt);

    if (now >= start && now <= end) {
        return {
            key: 'LIVE',
            label: 'LIVE NOW',
            tone: 'text-red-300 bg-red-500/10 border-red-500/30 shadow-red-500/10',
            accent: 'border-l-red-500',
            targetTime: end,
            targetLabel: 'Ends in',
        };
    }

    if (now > end) {
        return {
            key: 'COMPLETED',
            label: 'COMPLETED',
            tone: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
            accent: 'border-l-slate-600',
            targetTime: null,
            targetLabel: 'Finished',
        };
    }

    if (now < registrationEnd) {
        return {
            key: 'OPEN',
            label: 'REGISTRATION OPEN',
            tone: 'text-primary bg-primary/10 border-primary/30 shadow-primary/10',
            accent: 'border-l-primary',
            targetTime: start,
            targetLabel: 'Starts in',
        };
    }

    return {
        key: 'UPCOMING',
        label: 'SLOTS LOCKED',
        tone: 'text-cyan-300 bg-cyan-500/10 border-cyan-500/30 shadow-cyan-500/10',
        accent: 'border-l-cyan-400',
        targetTime: start,
        targetLabel: 'Starts in',
    };
};

const formatCountdown = (targetTime, now) => {
    if (!targetTime) return 'ARCHIVED';

    const diff = Math.max(targetTime - now, 0);
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (days > 0) return `${days}d ${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    return `${minutes}m ${seconds}s`;
};

const formatDateWindow = (startAt, endAt) => {
    const formatter = new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
    });

    return `${formatter.format(new Date(startAt))} - ${formatter.format(new Date(endAt))}`;
};

const Matches = () => {
    const { state, dispatch, showToast } = useApp();
    const [now, setNow] = useState(() => Date.now());
    const [activeFilter, setActiveFilter] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const timer = window.setInterval(() => setNow(Date.now()), 1000);
        return () => window.clearInterval(timer);
    }, []);

    const enrichedMatches = useMemo(
        () =>
            matchData
                .map((match) => ({
                    ...match,
                    status: getMatchStatus(match, now),
                }))
                .sort((a, b) => {
                    if (a.status.key === 'LIVE' && b.status.key !== 'LIVE') return -1;
                    if (b.status.key === 'LIVE' && a.status.key !== 'LIVE') return 1;
                    return getTime(a.startAt) - getTime(b.startAt);
                }),
        [now]
    );

    const statusCounts = useMemo(
        () =>
            enrichedMatches.reduce(
                (counts, match) => ({
                    ...counts,
                    [match.status.key]: (counts[match.status.key] || 0) + 1,
                }),
                { ALL: enrichedMatches.length }
            ),
        [enrichedMatches]
    );

    const filteredMatches = useMemo(() => {
        const normalizedQuery = searchQuery.trim().toLowerCase();

        return enrichedMatches.filter((match) => {
            const matchesFilter = activeFilter === 'ALL' || match.status.key === activeFilter;
            const matchesSearch = [match.title, match.game, match.region, match.channel, match.location]
                .join(' ')
                .toLowerCase()
                .includes(normalizedQuery);

            return matchesFilter && matchesSearch;
        });
    }, [activeFilter, enrichedMatches, searchQuery]);

    const liveCount = statusCounts.LIVE || 0;
    const openCount = statusCounts.OPEN || 0;
    const nextMatch = enrichedMatches.find((match) => match.status.key !== 'COMPLETED');

    const handleMatchAction = (match) => {
        if (match.status.key === 'LIVE') {
            showToast(`${match.channel} stream room is ready.`);
            return;
        }

        if (match.status.key === 'OPEN') {
            if (!state.user) {
                showToast('Login required before squad registration.');
                dispatch({ type: 'NAVIGATE', payload: { page: 'login' } });
                return;
            }

            showToast(`${match.title} registration request queued.`);
            return;
        }

        if (match.status.key === 'COMPLETED') {
            showToast(`${match.title} results are archived.`);
            return;
        }

        showToast(`Reminder armed for ${match.title}.`);
    };

    const getActionLabel = (statusKey) => {
        if (statusKey === 'LIVE') return 'WATCH LIVE';
        if (statusKey === 'OPEN') return state.user ? 'REGISTER SQUAD' : 'LOGIN TO REGISTER';
        if (statusKey === 'COMPLETED') return 'VIEW RESULTS';
        return 'SET REMINDER';
    };

    const getActionIcon = (statusKey) => {
        if (statusKey === 'LIVE') return <ExternalLink size={18} />;
        if (statusKey === 'OPEN') return state.user ? <Ticket size={18} /> : <LogIn size={18} />;
        if (statusKey === 'COMPLETED') return <Trophy size={18} />;
        return <Bell size={18} />;
    };

    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen pt-32 pb-20 px-6 max-w-[1400px] mx-auto"
        >
            <div className="mb-10 flex flex-col xl:flex-row xl:items-end xl:justify-between gap-8">
                <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 mb-5">
                        <Radio className="text-primary animate-pulse" size={14} />
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.24em]">
                            Real-Time Tournament Desk
                        </span>
                    </div>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-2">
                        Live <span className="text-primary">Operations</span>
                    </h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-sm">
                        Call of Duty Mobile - Indian Server Deployments
                    </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-xl w-full">
                    <div className="border border-white/10 bg-black/40 p-4">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Live</p>
                        <p className="text-2xl font-black text-white">{liveCount}</p>
                    </div>
                    <div className="border border-white/10 bg-black/40 p-4">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Open</p>
                        <p className="text-2xl font-black text-primary">{openCount}</p>
                    </div>
                    <div className="border border-white/10 bg-black/40 p-4">
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Next</p>
                        <p className="text-sm font-black text-white uppercase truncate">
                            {nextMatch ? formatCountdown(getTime(nextMatch.startAt), now) : 'No Ops'}
                        </p>
                    </div>
                </div>
            </div>

            <div className="mb-10 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                        placeholder="Search tournament, channel, location..."
                        className="w-full pl-12 pr-4 py-4 bg-dark-surface/70 border border-dark-border text-white placeholder:text-slate-600 font-bold focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50"
                    />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    <div className="hidden sm:flex w-10 h-10 items-center justify-center border border-white/10 bg-black/30 text-primary">
                        <Filter size={16} />
                    </div>
                    {statusFilters.map((filter) => (
                        <button
                            key={filter.id}
                            onClick={() => setActiveFilter(filter.id)}
                            className={`whitespace-nowrap px-4 py-3 border text-xs font-black uppercase tracking-widest transition-all ${
                                activeFilter === filter.id
                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20'
                                    : 'bg-dark-surface/60 border-dark-border text-slate-400 hover:border-primary/50 hover:text-primary'
                            }`}
                        >
                            {filter.label}
                            <span className="ml-2 text-[10px] opacity-70">{statusCounts[filter.id] || 0}</span>
                        </button>
                    ))}
                </div>
            </div>

            {filteredMatches.length === 0 ? (
                <div className="border border-dashed border-white/10 bg-black/30 p-14 text-center">
                    <Gamepad2 className="mx-auto text-slate-600 mb-5" size={48} />
                    <h2 className="text-xl font-black text-white uppercase tracking-widest mb-2">No deployments found</h2>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">
                        Change the search or filter to scan another bracket.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {filteredMatches.map((match, index) => (
                        <Motion.div
                            key={match.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.08 }}
                            className={`glass-card flex flex-col bg-dark-surface/80 border-l-4 ${match.status.accent} hover:border-primary transition-all duration-300`}
                        >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-5 p-6 border-b border-white/5">
                                <div>
                                    <div className={`inline-flex items-center gap-2 px-3 py-1 border mb-4 ${match.status.tone}`}>
                                        <CircleDot size={12} className={match.status.key === 'LIVE' ? 'animate-ping' : ''} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                                            {match.status.label}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight">
                                        {match.title}
                                    </h2>
                                    <div className="mt-3 flex flex-wrap items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                        <span className="inline-flex items-center gap-1">
                                            <Gamepad2 size={13} /> {match.game}
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <MapPin size={13} /> {match.region}
                                        </span>
                                    </div>
                                </div>
                                <div className="sm:text-right">
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Prize Pool</p>
                                    <p className="text-xl font-black text-white">{match.prize}</p>
                                </div>
                            </div>

                            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5 bg-black/40">
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-primary shrink-0" size={18} />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Schedule</p>
                                        <p className="text-sm font-bold text-white">{formatDateWindow(match.startAt, match.endAt)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="text-primary shrink-0" size={18} />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            {match.status.targetLabel}
                                        </p>
                                        <p className="text-sm font-black text-white">
                                            {formatCountdown(match.status.targetTime, now)}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Video className="text-primary shrink-0" size={18} />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Broadcast</p>
                                        <p className="text-sm font-bold text-white">{match.channel}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="text-primary shrink-0" size={18} />
                                    <div>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Format</p>
                                        <p className="text-sm font-bold text-white">{match.teams} Teams</p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 pt-0 mt-auto bg-black/40">
                                <div className="mb-5 grid grid-cols-2 gap-3">
                                    <div className="border border-white/10 bg-dark-bg/70 p-3">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Mode</p>
                                        <p className="text-sm font-bold text-white truncate">{match.format}</p>
                                    </div>
                                    <div className="border border-white/10 bg-dark-bg/70 p-3">
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Slots</p>
                                        <p className="text-sm font-bold text-white">
                                            {match.status.key === 'COMPLETED' ? 'Closed' : `${match.slotsLeft} Left`}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    className="w-full btn-primary py-4 text-sm flex items-center justify-center gap-3"
                                    onClick={() => handleMatchAction(match)}
                                >
                                    {getActionIcon(match.status.key)}
                                    {getActionLabel(match.status.key)}
                                </button>
                            </div>
                        </Motion.div>
                    ))}
                </div>
            )}
        </Motion.div>
    );
};

export default Matches;
