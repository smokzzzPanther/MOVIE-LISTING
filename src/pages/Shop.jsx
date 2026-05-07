import { motion as Motion } from 'framer-motion';
import Armory from '../components/Armory';

const Shop = () => {
    return (
        <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full min-h-screen pt-24"
        >
            {/* Shop page: reuses Armory for product filtering, sorting, and browsing. */}
            <Armory />
        </Motion.div>
    );
};

export default Shop;
