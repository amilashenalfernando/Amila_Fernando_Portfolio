import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBook, FiCamera, FiUsers, FiPenTool, FiExternalLink, FiX } from 'react-icons/fi';

const activities = [
    {
        id: 1,
        title: "Design & Publicity - SLAIC",
        organization: "AI-Driven Sri Lanka",
        date: "2024 - 2025",
        role: "Design & Publicity Member",
        description: "Design & Publicity member at AI Driven Sri Lanka. Responsible for creating visual assets and managing publicity campaigns.",
        image: "/Volunteering/1.jpg",
        icon: <FiPenTool className="text-lg" />
    },
    {
        id: 2,
        title: "Photography Committee",
        organization: "Media Unit of SLTC Research University",
        date: "2024 - Present",
        role: "Member",
        description: "Member of the Photography Committee at the Media Unit of SLTC Research University. Responsible for capturing official university events and managing media coverage.",
        image: "/Volunteering/2.jpg",
        icon: <FiCamera className="text-lg" />
    },
    {
        id: 3,
        title: "Public Visibility Sub Committee",
        organization: "Computer Society of SLTC",
        date: "2024 - 2025",
        role: "Deputy Head",
        description: "Leading the public visibility initiatives and managing outreach strategies for the Computer Society at Sri Lanka Technology Campus.",
        image: "/Volunteering/3.jpg",
        icon: <FiUsers className="text-lg" />
    }
];

const Volunteering = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full max-w-6xl mx-auto pt-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-12"
            >
                <span className="text-orange-600 dark:text-orange-400 font-medium tracking-wide uppercase text-xs">Community Impact</span>
                <h2 className="text-3xl md:text-4xl font-bold mt-2 text-text-primary">
                    Volunteering & Activities
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.slice(0, 3).map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group relative h-full"
                    >
                        <div className="relative glass-card bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-xl overflow-hidden hover:border-orange-500/30 transition-colors duration-300 h-full flex flex-col">
                            {/* Image Section - Compact Height */}
                            <div className="relative h-48 overflow-hidden">

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-xs font-mono text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/5 px-2 py-1 rounded border border-orange-500/10">
                                        {item.date}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-text-primary mb-1 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                                    {item.title}
                                </h3>

                                <div className="text-sm text-text-secondary font-medium mb-3">
                                    <span className="text-orange-600 dark:text-orange-400 block mb-1 font-semibold">{item.role}</span>
                                    {item.organization}
                                </div>

                                <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12 flex justify-center">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-8 py-3 rounded-full bg-[var(--glass-bg)] text-text-primary font-semibold backdrop-blur-sm border border-[var(--glass-border)] hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group"
                >
                    View All Activities
                    <FiExternalLink className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* Full Screen Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        key="modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, pointerEvents: "none" }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[var(--bg-primary)] overflow-hidden"
                        onClick={() => setIsModalOpen(false)}
                    >
                        {/* Animated Background Blobs - Full Screen */}
                        <div className="hidden md:block absolute top-0 left-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-20 dark:opacity-30 animate-blob pointer-events-none" />
                        <div className="hidden md:block absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-red-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-20 dark:opacity-30 animate-blob animation-delay-2000 pointer-events-none" />
                        <div className="hidden md:block absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-yellow-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-20 dark:opacity-30 animate-blob animation-delay-4000 pointer-events-none" />

                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-[var(--bg-primary)]/80 backdrop-blur-md md:backdrop-blur-xl border border-[var(--glass-border)] rounded-2xl w-full max-w-7xl h-auto max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10"
                        >
                            {/* Modal Header */}
                            <div className="p-4 md:p-6 border-b border-[var(--glass-border)] flex justify-between items-center bg-transparent sticky top-0 z-20 shrink-0">
                                <div>
                                    <h3 className="text-xl md:text-2xl font-bold text-text-primary">All Volunteering Activities</h3>
                                    <p className="text-text-secondary text-xs md:text-sm">A complete record of my community involvement</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 md:p-3 bg-[var(--glass-bg)] hover:bg-orange-500 rounded-full transition-colors text-text-primary hover:text-white"
                                >
                                    <FiX className="text-lg md:text-xl" />
                                </button>
                            </div>

                            {/* Modal Content - Scrollable */}
                            <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar relative z-10 flex-1 min-h-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                    {activities.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group glass-card p-4 md:p-6 relative overflow-hidden transition-colors block bg-[var(--glass-bg)]"
                                        >
                                            <div className="mb-4 md:mb-6 aspect-video rounded-lg overflow-hidden relative">
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110" />
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-start mb-2">
                                                    <span className="text-xs font-mono text-orange-600 dark:text-orange-400 bg-orange-500/10 dark:bg-orange-500/5 px-2 py-1 rounded border border-orange-500/10">
                                                        {item.date}
                                                    </span>
                                                </div>
                                                <h3 className="text-base md:text-lg font-bold text-text-primary mb-1 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{item.title}</h3>
                                                <div className="text-sm text-text-secondary font-medium mb-3">
                                                    <span className="text-orange-600 dark:text-orange-400 block mb-1 font-semibold">{item.role}</span>
                                                    {item.organization}
                                                </div>
                                                <p className="text-text-secondary text-xs md:text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Volunteering;
