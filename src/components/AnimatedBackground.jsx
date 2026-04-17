import { motion } from 'framer-motion';

const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 -z-50 overflow-hidden bg-[#050505]">
            {/* Gradient Blobs */}
            <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] bg-orange-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob" />
            <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-red-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-2000" />
            <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-yellow-600/30 rounded-full mix-blend-screen filter blur-[100px] opacity-50 animate-blob animation-delay-4000" />

            {/* Mesh/Grid overlay optional */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05]" />
        </div>
    );
};

export default AnimatedBackground;
