import { motion as Motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import LiveHeroBackground from './LiveHeroBackground';

const Hero = () => {
    const { dispatch } = useApp();

    return (
        <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden">
            <LiveHeroBackground />

            <div className="relative z-10 max-w-[1400px] mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <Motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start"
                >
                    <div className="inline-block px-4 py-1 mb-6 border border-primary/30 bg-primary/10">
                        <span className="text-primary font-black text-sm tracking-[0.3em] uppercase">Season 6 is Live</span>
                    </div>

                    <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-[0.9] uppercase tracking-tighter mb-6">
                        Darkness isn't a <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary-dark">Threat.</span><br />
                        It's an <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-primary-dark">Advantage.</span>
                    </h1>

                    <p className="text-slate-400 text-lg md:text-xl font-medium max-w-lg mb-10 border-l-2 border-primary pl-4">
                        Step into the shadows. Build your ultimate squad, dominate every game mode, and prove you have what it takes to survive the strike zone.
                    </p>

                    <div className="flex flex-wrap items-center gap-6">
                        <button 
                            className="btn-primary px-10 py-5 text-lg"
                            onClick={() => dispatch({ type: 'NAVIGATE', payload: { page: 'login' } })}
                        >
                            PLAY NOW FOR FREE
                        </button>
                        <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                            WATCH TRAILER
                        </button>
                    </div>
                </Motion.div>
            </div>
        </section>
    );
};

export default Hero;
