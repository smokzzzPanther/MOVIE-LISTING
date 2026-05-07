import { motion as Motion } from 'framer-motion';

const Features = () => {
    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-12"
        >
            <div className="text-center space-y-6 max-w-4xl px-6 w-full">
                <h1 className="text-5xl font-black text-white tracking-tighter uppercase mb-2">Game <span className="text-primary">Features</span></h1>
                <p className="text-slate-400 font-bold uppercase tracking-widest text-sm mb-10">Discover the next generation of tactical combat.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <div className="glass-card p-8 border-t-2 border-primary">
                        <h3 className="text-xl font-black text-white uppercase mb-4">Hyper-Realistic Ballistics</h3>
                        <p className="text-slate-400 text-sm font-bold leading-relaxed">Experience true-to-life weapon handling, recoil patterns, and bullet drop mechanics developed alongside military advisors.</p>
                    </div>
                    <div className="glass-card p-8 border-t-2 border-primary">
                        <h3 className="text-xl font-black text-white uppercase mb-4">Dynamic Environments</h3>
                        <p className="text-slate-400 text-sm font-bold leading-relaxed">Total destruction. Breach walls, collapse ceilings, and utilize changing weather conditions to gain tactical superiority.</p>
                    </div>
                    <div className="glass-card p-8 border-t-2 border-primary">
                        <h3 className="text-xl font-black text-white uppercase mb-4">Advanced Roster</h3>
                        <p className="text-slate-400 text-sm font-bold leading-relaxed">Choose from over 30 unique operatives, each with specialized loadouts, gadgets, and passive combat advantages.</p>
                    </div>
                </div>
            </div>
        </Motion.div>
    );
};

export default Features;
