import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

// Helper to generate gallery paths
const generateGallery = (folderId, count) => {
    return Array.from({ length: count }, (_, i) => `/Photography/${folderId}/${i + 1}.jpg`);
};

const collections = [
    {
        id: 1,
        title: "After Glow",
        category: "Events",
        cover: "/Photography/1/1.jpg",
        description: "A vibrant reflection of energy, passion, and fading light captured in the heart of the moment. Exploring dynamic shadows and brilliant highlights.",
        gallery: generateGallery(1, 11)
    },
    {
        id: 2,
        title: "Megahara",
        category: "Events",
        cover: "/Photography/2/1.jpg",
        description: "Immersive documentary photography showcasing traditional aesthetics blended seamlessly with modern cinematic framing and composition.",
        gallery: generateGallery(2, 8)
    },
    {
        id: 3,
        title: "Echoes of Holi",
        category: "Events",
        cover: "/Photography/3/1.jpg",
        description: "An explosive celebration of color. High shutter speeds and vivid editing styles bring out the raw emotion and chaotic beauty of the festival.",
        gallery: generateGallery(3, 8)
    }
];

const categories = ["All", "Nature", "Events", "Portraits"];

const Photography = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState("All");

    // State for Lightbox
    const [selectedCollection, setSelectedCollection] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);

    const filteredCollections = collections.filter(c => filter === "All" || c.category === filter);

    const openCollection = (collection) => {
        setSelectedCollection(collection);
        setCurrentImageIndex(null); // Start in Grid View
    };

    const handlePrev = useCallback((e) => {
        e?.stopPropagation();
        if (!selectedCollection) return;
        setCurrentImageIndex(prev =>
            (prev - 1 + selectedCollection.gallery.length) % selectedCollection.gallery.length
        );
    }, [selectedCollection]);

    const handleNext = useCallback((e) => {
        e?.stopPropagation();
        if (!selectedCollection) return;
        setCurrentImageIndex(prev =>
            (prev + 1) % selectedCollection.gallery.length
        );
    }, [selectedCollection]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!selectedCollection) return;
            if (currentImageIndex !== null) {
                if (e.key === "ArrowLeft") handlePrev();
                if (e.key === "ArrowRight") handleNext();
                if (e.key === "Escape") setCurrentImageIndex(null);
            } else {
                if (e.key === "Escape") setSelectedCollection(null);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedCollection, currentImageIndex, handleNext, handlePrev]);

    return (
        <div className="w-full max-w-7xl mx-auto pt-20 px-4 mb-32 font-sans relative">
            
            {/* Cinematic Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end"
            >
                <div>
                    <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Photography Studio</span>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white mb-6">
                        Capturing <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
                            Unforgettable Moments
                        </span>
                    </h1>
                </div>
                <div className="pb-4">
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-md">
                        Every frame is a powerful story waiting to be told. I explore light, emotion, and cinematic composition to deliver editorial imagery that resonates on a deeper level.
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
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Elegant Album Showcase */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32">
                <AnimatePresence>
                    {filteredCollections.map((album, index) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                            className="group cursor-pointer flex flex-col"
                            onClick={() => openCollection(album)}
                        >
                            {/* Premium Cover Image */}
                            <div className="w-full aspect-[4/5] relative overflow-hidden rounded-[1.5rem] bg-[#050505] shadow-lg mb-6 border border-white/5">
                                <img 
                                    src={album.cover} 
                                    alt={album.title}
                                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105 filter brightness-95 group-hover:brightness-105" 
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-700" />
                                
                                {/* Hover overlay badge */}
                                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <span className="text-white text-xs font-semibold flex items-center gap-2">
                                        View Gallery <FiArrowRight className="text-orange-400" />
                                    </span>
                                </div>
                            </div>
                            
                            {/* Album Text Data */}
                            <div className="flex flex-col px-2">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-orange-500 text-xs font-bold tracking-[0.1em] uppercase">
                                        {album.category}
                                    </span>
                                    <span className="text-gray-500 text-xs font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                                        {album.gallery.length} Images
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-red-500 transition-all duration-300">
                                    {album.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">
                                    {album.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Premium Call To Action */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-32 max-w-5xl mx-auto rounded-[2rem] relative overflow-hidden bg-[#050505] border border-white/10"
            >
                {/* Background Ambient Glows */}
                <div className="absolute top-[-50%] left-[-10%] w-[300px] h-[300px] bg-orange-600/20 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-50%] right-[-10%] w-[300px] h-[300px] bg-red-600/10 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none" />

                <div className="p-12 md:p-20 text-center relative z-10 flex flex-col items-center">
                    <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">Book A Session</span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Ready to capture <br/> your unique story?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mb-12">
                        From high-end commercial projects to intimate personal portraits, I bring a professional, cinematic lens to every assignment. Secure your booking today.
                    </p>
                    <button 
                        onClick={() => navigate('/contact')} 
                        className="px-10 py-5 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold rounded-full transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.5)] flex items-center gap-3 text-lg"
                    >
                        Let's Work Together <FiArrowRight size={20} />
                    </button>
                </div>
            </motion.div>

            {/* Premium Editorial Viewer (Grid / Lightbox) */}
            <AnimatePresence>
                {selectedCollection && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex flex-col bg-[#050505] backdrop-blur-3xl overflow-hidden"
                    >
                        {/* Elegant Header */}
                        <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5 bg-black/50 z-50 shrink-0">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                                    {selectedCollection.title}
                                </h2>
                                <span className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase mt-1 block">
                                    Complete Gallery ({selectedCollection.gallery.length} Images)
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    if (currentImageIndex !== null) {
                                        setCurrentImageIndex(null); 
                                    } else {
                                        setSelectedCollection(null); 
                                    }
                                }}
                                className="p-3 bg-white/5 hover:bg-white/20 border border-white/10 rounded-full transition-all text-white hover:scale-110"
                            >
                                <FiX className="text-xl md:text-2xl" />
                            </button>
                        </div>

                        {/* Content Container */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                            {currentImageIndex === null ? (
                                /* CSS COLUMNS MASONRY MOCKUP (PINTEREST STYLE) */
                                <div className="p-6 md:p-12 max-w-[2000px] mx-auto min-h-full">
                                    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                                        {selectedCollection.gallery.map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: (idx % 10) * 0.05, duration: 0.5 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setCurrentImageIndex(idx);
                                                }}
                                                className="break-inside-avoid cursor-zoom-in group relative rounded-lg overflow-hidden border border-white/5 shadow-2xl"
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${selectedCollection.title} Shot ${idx + 1}`}
                                                    className="w-full h-auto object-cover filter brightness-90 group-hover:brightness-110 transition-all duration-500 group-hover:scale-[1.02]"
                                                    loading="lazy"
                                                />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* CINEMATIC IMMERSIVE SLIDESHOW */
                                <div
                                    className="absolute inset-0 flex items-center justify-center p-4 md:p-12 cursor-zoom-out bg-black/90"
                                    onClick={() => setCurrentImageIndex(null)}
                                >
                                    {/* Navigation Arrows */}
                                    <button
                                        className="absolute left-4 md:left-12 p-4 bg-black/50 hover:bg-orange-600 border border-white/10 rounded-full text-white transition-all z-50 hover:scale-110"
                                        onClick={handlePrev}
                                    >
                                        <FiChevronLeft size={24} />
                                    </button>

                                    <button
                                        className="absolute right-4 md:right-12 p-4 bg-black/50 hover:bg-orange-600 border border-white/10 rounded-full text-white transition-all z-50 hover:scale-110"
                                        onClick={handleNext}
                                    >
                                        <FiChevronRight size={24} />
                                    </button>

                                    {/* Rendered Focus Image */}
                                    <motion.img
                                        key={`${selectedCollection.id}-${currentImageIndex}`}
                                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                                        transition={{ duration: 0.4 }}
                                        src={selectedCollection.gallery[currentImageIndex]}
                                        className="max-h-full max-w-full object-contain rounded-xl shadow-[0_0_100px_rgba(0,0,0,1)]"
                                        onClick={(e) => e.stopPropagation()}
                                    />

                                    {/* Subtitle Indicator */}
                                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 pointer-events-none">
                                        <span className="text-white text-sm font-semibold tracking-widest uppercase">
                                            {currentImageIndex + 1} <span className="text-gray-500 mx-2">/</span> {selectedCollection.gallery.length}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Photography;
