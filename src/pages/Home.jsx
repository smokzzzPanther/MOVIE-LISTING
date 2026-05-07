import Hero from '../components/Hero';
import Armory from '../components/Armory';
import { motion as Motion } from 'framer-motion';

const Home = () => {
    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col"
        >
            <Hero />
            
            {/* The Armory section replaces our old "Home" product grid */}
            <Armory />

        </Motion.div>
    );
};

export default Home;
