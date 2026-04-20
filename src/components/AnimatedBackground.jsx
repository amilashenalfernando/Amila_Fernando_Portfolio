import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-[var(--bg-primary)] transition-colors duration-500">
            {/* Gradient Blobs */}
            <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-orange-600/30 rounded-full blur-[80px] md:blur-[120px] opacity-20 dark:opacity-50 animate-blob will-change-transform pointer-events-none" />
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-red-600/30 rounded-full blur-[80px] md:blur-[120px] opacity-20 dark:opacity-50 animate-blob animation-delay-2000 will-change-transform pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-yellow-600/30 rounded-full blur-[80px] md:blur-[120px] opacity-20 dark:opacity-50 animate-blob animation-delay-4000 will-change-transform pointer-events-none" />

            {/* Mesh/Grid overlay optional */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] dark:opacity-[0.05] pointer-events-none" />
        </div>
    );
};

export default AnimatedBackground;
