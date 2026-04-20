import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="text-center relative">
                {/* Background Glow Blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500/10 rounded-full blur-[120px] pointer-events-none -z-10" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h1 className="text-[120px] md:text-[180px] font-black leading-none text-transparent bg-clip-text bg-gradient-to-br from-orange-500 to-red-600 opacity-20 select-none">
                        404
                    </h1>
                    
                    <div className="relative -mt-16 md:-mt-24">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl md:text-5xl font-bold text-[var(--text-primary)] mb-4"
                        >
                            Lost in <span className="text-orange-500">Space?</span>
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-[var(--text-secondary)] text-lg mb-10 max-w-md mx-auto"
                        >
                            The page you are looking for doesn't exist or has been moved to another dimension.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Link 
                                to="/" 
                                className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-2xl hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1"
                            >
                                <FiHome className="text-xl" />
                                Back to Home
                            </Link>
                            
                            <button 
                                onClick={() => window.history.back()}
                                className="flex items-center gap-2 px-8 py-4 bg-[var(--glass-bg)] text-[var(--text-primary)] font-bold rounded-2xl border border-[var(--glass-border)] hover:bg-white/5 transition-all"
                            >
                                <FiArrowLeft className="text-xl" />
                                Go Back
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Animated Floating Particles/Circles */}
                <motion.div 
                    animate={{ 
                        y: [-20, 20],
                        opacity: [0.3, 0.6]
                    }}
                    transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        repeatType: "reverse" 
                    }}
                    className="absolute -top-10 -right-10 w-12 h-12 rounded-full border-2 border-orange-500/20"
                />
                <motion.div 
                    animate={{ 
                        y: [20, -20],
                        opacity: [0.2, 0.5]
                    }}
                    transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        delay: 1
                    }}
                    className="absolute -bottom-12 left-0 w-8 h-8 rounded-full border-2 border-red-500/20"
                />
            </div>
        </div>
    );
};

export default NotFound;
