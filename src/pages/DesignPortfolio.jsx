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
            
            {/* Clean Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Digital Canvases</span>
                <h1 className="text-5xl font-bold text-white mb-6">
                    Design Portfolio
                </h1>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                    Clean, precise, and striking visual identities crafted for impact. Explore the categorized gallery below.
                </p>
            </motion.div>

            {/* Standard Clean Category Filter */}
            <div className="flex justify-start md:justify-center gap-4 mb-16 overflow-x-auto pb-4 custom-scrollbar">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap border ${filter === cat
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white'
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
                        className="cursor-pointer group relative rounded-2xl overflow-hidden glass-card aspect-[4/3] border border-white/5 bg-[#0a0a0a]"
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
                                <span className="text-orange-400 text-xs font-bold tracking-wider uppercase mb-2 block">
                                    {item.category}
                                </span>
                                <h3 className="text-white text-xl font-bold mb-3">{item.title}</h3>
                                <div className="inline-flex items-center gap-2 text-sm text-gray-300 font-medium">
                                    View Details <FiArrowRight className="text-orange-400" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
                </AnimatePresence>
            </div>

            {/* Minimalist Call To Action */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mt-24 p-12 text-center rounded-2xl bg-white/5 border border-white/10"
            >
                <h2 className="text-3xl font-bold text-white mb-4">
                    Need a design?
                </h2>
                <p className="text-gray-400 text-lg mb-8">
                    Let's discuss how we can bring your creative vision to life.
                </p>
                <button 
                    onClick={() => navigate('/contact')} 
                    className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                    Contact Me <FiArrowRight size={18} />
                </button>
            </motion.div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedId && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        {/* Cinematic Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedId(null)}
                            className="absolute inset-0 bg-black/98 backdrop-blur-xl pointer-events-auto"
                        />

                        {/* Modal Wrapper */}
                        <motion.div
                            layoutId={`card-container-${selectedId}`}
                            className="w-full max-w-5xl rounded-2xl overflow-hidden relative pointer-events-auto flex flex-col md:flex-row bg-[#0a0a0a] border border-white/10 shadow-2xl"
                        >
                            {/* Toolbar Buttons */}
                            <button
                                onClick={() => setSelectedId(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors border border-white/10"
                            >
                                <FiX size={20} />
                            </button>

                            {/* Image Section */}
                            <div className="w-full md:w-2/3 h-[50vh] md:h-[80vh] relative bg-[#050505] flex items-center justify-center">
                                <motion.img
                                    layoutId={`card-image-${selectedId}`}
                                    src={designs.find(d => d.id === selectedId).image}
                                    className="max-w-full max-h-full object-contain p-4"
                                />

                                {/* Internal Controls */}
                                <button
                                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-orange-500 rounded-full text-white transition-colors"
                                    onClick={handlePrev}
                                >
                                    <FiChevronLeft size={24} />
                                </button>
                                <button
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-orange-500 rounded-full text-white transition-colors"
                                    onClick={handleNext}
                                >
                                    <FiChevronRight size={24} />
                                </button>
                            </div>

                            {/* Details Pane */}
                            <div className="w-full md:w-1/3 p-8 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/10 relative z-10">
                                <span className="inline-block px-3 py-1 bg-white/10 text-orange-400 text-xs font-bold tracking-wider uppercase rounded-full mb-4 w-max">
                                    {designs.find(d => d.id === selectedId).category}
                                </span>
                                <h3 className="text-2xl font-bold text-white mb-4">
                                    {designs.find(d => d.id === selectedId).title}
                                </h3>
                                <p className="text-gray-400 leading-relaxed mb-8">
                                    {designs.find(d => d.id === selectedId).desc}
                                </p>

                                <button 
                                    onClick={() => {
                                        setSelectedId(null);
                                        setTimeout(() => navigate('/contact'), 300);
                                    }}
                                    className="w-full py-3 mt-auto bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
                                >
                                    Inquire About This
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DesignPortfolio;
