import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const designs = [
    { id: 1, title: "CS T-Shirt Launch", image: "/Designs/1.png", category: "Merchandise", desc: "Official launch design for CS T-Shirts." },
    { id: 2, title: "Guest Speaker Session", image: "/Designs/2.png", category: "Flyer", desc: "Promotional flyer for guest speaker event." },
    { id: 3, title: "Brand Merchandise", image: "/Designs/3.png", category: "Merchandise", desc: "Clean and modern merchandise design." },
    { id: 4, title: "Mentor Reveal", image: "/Designs/4.png", category: "Social Media", desc: "Social media announcement for mentor reveal." },
    { id: 5, title: "Session 01 Announcement", image: "/Designs/5.png", category: "Flyer", desc: "Announcement flyer for the first session." },
    { id: 6, title: "Website Launch Flyer", image: "/Designs/6.png", category: "Flyer", desc: "Launch flyer for the new website." },
    { id: 7, title: "Website Launch Event", image: "/Designs/7.png", category: "Event", desc: "Event creative for website launching." }
];

// Extract unique categories
const categories = ["All", ...new Set(designs.map(d => d.category))];

const DesignPortfolio = () => {
    const navigate = useNavigate();
    const [selectedId, setSelectedId] = useState(null);
    const [filter, setFilter] = useState("All");

    const filteredDesigns = designs.filter(d => filter === "All" || d.category === filter);

    const handlePrev = useCallback((e) => {
        e?.stopPropagation();
        if (!selectedId) return;
        const currentIndex = filteredDesigns.findIndex(d => d.id === selectedId);
        const prevIndex = (currentIndex - 1 + filteredDesigns.length) % filteredDesigns.length;
        setSelectedId(filteredDesigns[prevIndex].id);
    }, [selectedId, filteredDesigns]);

    const handleNext = useCallback((e) => {
        e?.stopPropagation();
        if (!selectedId) return;
        const currentIndex = filteredDesigns.findIndex(d => d.id === selectedId);
        const nextIndex = (currentIndex + 1) % filteredDesigns.length;
        setSelectedId(filteredDesigns[nextIndex].id);
    }, [selectedId, filteredDesigns]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedId) return;
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "Escape") setSelectedId(null);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId, handleNext, handlePrev]);

    return (
        <div className="w-full max-w-7xl mx-auto pt-20 px-4 mb-32 font-sans md:px-8">
            
            {/* Cinematic Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end"
            >
                <div>
                    <span className="text-orange-700 dark:text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Design Studio</span>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[var(--text-primary)] mb-6">
                        Crafting <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 dark:from-orange-400 to-red-600 dark:to-red-500">
                            Striking Visuals
                        </span>
                    </h1>
                </div>
                <div className="pb-4">
                    <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed max-w-md">
                        Clean, precise, and bold visual identities crafted for impact. Every pixel purposeful, every design a story — from social media to full brand systems.
                    </p>
                </div>
            </motion.div>

            {/* Premium Category Filters */}
            <div className="flex justify-start lg:justify-center gap-4 mb-20 overflow-x-auto pb-4 custom-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-8 py-3 rounded-full text-sm font-semibold tracking-wide uppercase transition-all whitespace-nowrap ${filter === cat
                            ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-[0_0_20px_-5px_rgba(249,115,22,0.4)]'
                            : 'bg-[var(--glass-bg)] text-[var(--text-secondary)] hover:bg-orange-500/10 hover:text-[var(--text-primary)] border border-[var(--glass-border)]'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Uniform Grid Gallery */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredDesigns.map((item, index) => (
                    <motion.div
                        layoutId={`card-container-${item.id}`}
                        key={item.id}
                        onClick={() => setSelectedId(item.id)}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.4 }}
                        className="cursor-pointer group relative rounded-2xl overflow-hidden glass-card aspect-[4/3] border border-[var(--glass-border)] bg-[var(--bg-secondary)]"
                    >
                        {/* Image layer */}
                        <motion.img
                            layoutId={`card-image-${item.id}`}
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                        />

                        {/* Clean Hover Overlay */}
                        <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center backdrop-blur-sm">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <span className="text-orange-600 dark:text-orange-400 text-xs font-bold tracking-wider uppercase mb-2 block">
                                    {item.category}
                                </span>
                                <h3 className="text-text-primary text-xl font-bold mb-3">{item.title}</h3>
                                <div className="inline-flex items-center gap-2 text-sm text-text-secondary font-medium">
                                    View Details <FiArrowRight className="text-orange-600 dark:text-orange-400" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>

            {/* Premium Hire Me CTA */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className="mt-8 max-w-5xl mx-auto rounded-[2rem] relative overflow-hidden bg-[var(--bg-primary)] border border-[var(--glass-border)]"
            >
                {/* Background Ambient Glows */}
                <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] bg-orange-600/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-50%] right-[-10%] w-[300px] h-[300px] bg-red-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />

                <div className="p-10 md:p-16 relative z-10">
                    {/* Top Badge */}
                    <div className="flex justify-center mb-8">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-500 text-xs font-bold tracking-[0.2em] uppercase">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse inline-block" />
                            Available for Projects
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-5 leading-tight">
                            Need a design that <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">
                                makes an impact?
                            </span>
                        </h2>
                        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
                            From brand identities to social media campaigns, I craft visuals that communicate, convert, and leave a lasting impression. Let's bring your vision to life.
                        </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-10 max-w-xl mx-auto">
                        {[
                            { value: '100+', label: 'Projects Completed' },
                            { value: '10+', label: 'Brands Designed' },
                            { value: '100%', label: 'Client Satisfaction' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center p-4 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)]">
                                <div className="text-2xl font-bold text-orange-500 mb-1">{stat.value}</div>
                                <div className="text-xs text-[var(--text-secondary)] font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Service Tags */}
                    <div className="flex flex-wrap gap-2 justify-center mb-10">
                        {['Brand Identity', 'Social Media', 'Flyers', 'Merchandise', 'Event Graphics', 'UI Design'].map((tag) => (
                            <span key={tag} className="px-4 py-1.5 rounded-full text-sm font-medium bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-secondary)]">
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="flex justify-center">
                        <button 
                            onClick={() => navigate('/#contact')} 
                            className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] flex items-center gap-3 text-lg"
                        >
                            Let's Work Together <FiArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col bg-[var(--bg-primary)] backdrop-blur-3xl overflow-hidden"
                    >
                        {/* CINEMATIC IMMERSIVE SLIDESHOW */}
                        <div
                            className="absolute inset-0 flex items-center justify-center p-4 md:p-12 cursor-default bg-[var(--bg-primary)]"
                            onClick={() => setSelectedId(null)}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 bg-[var(--glass-bg)] hover:bg-orange-600 border border-[var(--glass-border)] rounded-full transition-all text-text-primary hover:text-white hover:scale-110 z-50"
                            >
                                <FiX className="text-xl md:text-2xl" />
                            </button>

                            {/* Navigation Arrows */}
                            <button
                                className="absolute left-4 md:left-12 p-3 md:p-4 bg-[var(--glass-bg)] hover:bg-orange-600 border border-[var(--glass-border)] rounded-full text-text-primary hover:text-white transition-all z-50 hover:scale-110"
                                onClick={handlePrev}
                            >
                                <FiChevronLeft size={24} />
                            </button>

                            <button
                                className="absolute right-4 md:right-12 p-3 md:p-4 bg-[var(--glass-bg)] hover:bg-orange-600 border border-[var(--glass-border)] rounded-full text-text-primary hover:text-white transition-all z-50 hover:scale-110"
                                onClick={handleNext}
                            >
                                <FiChevronRight size={24} />
                            </button>

                            {/* Rendered Focus Image */}
                            <motion.img
                                layoutId={`card-image-${selectedId}`}
                                src={designs.find(d => d.id === selectedId).image}
                                className="max-h-[85vh] max-w-[85vw] object-contain rounded-xl shadow-[0_0_100px_rgba(0,0,0,0.5)]"
                                onClick={(e) => e.stopPropagation()}
                            />

                            {/* Title / Indicator */}
                            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 px-8 py-3 bg-[var(--glass-bg)] backdrop-blur-md rounded-full border border-[var(--glass-border)] pointer-events-none flex flex-col items-center text-center">
                                <span className="text-orange-500 text-xs font-bold tracking-[0.1em] uppercase mb-1">
                                    {designs.find(d => d.id === selectedId).category}
                                </span>
                                <span className="text-text-primary text-sm md:text-base font-bold whitespace-nowrap">
                                    {designs.find(d => d.id === selectedId).title}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DesignPortfolio;
