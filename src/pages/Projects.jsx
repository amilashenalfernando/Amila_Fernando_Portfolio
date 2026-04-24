import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiFolder, FiX, FiArrowLeft, FiPlay, FiCheckCircle, FiZoomIn } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const projects = [
    {
        id: 1,
        title: "Real-Time Chat App",
        category: "Web App",
        image: "/Projects/Chat App/Chat app.png",
        description: "A seamless, multi-room chat platform built with Python's asyncio and WebSockets for low-latency, bi-directional messaging.",
        stack: ["Python", "asyncio", "WebSockets", "HTML/CSS", "JavaScript"],
        github: "https://github.com/Amila20040220/Real-Time-Chat-Room-Application",
        demo: "/Projects/Chat App/CIT-24-01-0474.mp4"
    },
    {
        id: 2,
        title: "EcoTrack",
        category: "Web App",
        image: "/Projects/EcoTrack/ecotrack.png",
        description: "A comprehensive web application for managing environmental tracking and eco-friendly analytics.",
        stack: ["React", "Tailwind CSS", "JavaScript"],
        github: "https://github.com/amilashenalfernando/dev_amila_EcoTrack",
        demo: "https://eco-track-delta-gules.vercel.app/"
    },
    {
        id: 3,
        title: "ArcLights",
        category: "Web App",
        image: "/Projects/ArcLight/arclight.png",
        description: "A modern corporate portfolio website for ArcLight, effectively showcasing their comprehensive services and impressive past projects.",
        stack: ["React", "Tailwind CSS", "JavaScript"],
        github: "https://github.com/amilashenalfernando/dev_amila_arclight-portfolio",
        demo: "https://www.arclightsl.com/"
    },
];

const categories = ["All", "Web App", "Mobile App", "Academic", "Design"];

const isVideo = (url) => url && typeof url === 'string' && (url.endsWith('.mp4') || url.endsWith('.webm'));

const Projects = () => {
    const { isDarkMode } = useTheme();
    const [filter, setFilter] = useState("All");
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);

    const filteredProjects = projects.filter(p =>
        (filter === "All" || p.category === filter) && !p.hidden
    );

    const handleDemoClick = (e, project) => {
        // If it's a video file, prevent default new tab and open modal
        if (isVideo(project.demo)) {
            e.preventDefault();
            setSelectedVideo({
                url: project.demo,
                title: project.title
            });
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto pt-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-16 text-center"
            >
                <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Portfolio</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                    Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Projects</span>
                </h1>
            </motion.div>

            {/* Filters */}
            {/*<div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${filter === cat
                            ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/30'
                            : 'bg-white/5 text-gray-300 hover:bg-white/10'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>*/}

            {/* Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layoutId={`project-card-${project.id}`}
                            key={project.id}
                            onClick={() => setSelectedProject(project)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="glass-card flex flex-col h-full hover-lift group overflow-hidden w-full max-w-sm mx-auto cursor-pointer relative"
                        >
                            <div className="absolute top-0 right-0 p-16 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <FiZoomIn className="text-white text-3xl" />
                                </div>
                                <div className={`absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent pointer-events-none transition-opacity duration-500
                                    ${isDarkMode ? 'opacity-60' : 'opacity-0'}`} 
                                />
                            </div>

                            <div className="p-6 flex flex-col flex-grow relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-[var(--glass-bg)] rounded-lg group-hover:bg-orange-500/20 transition-colors">
                                        <FiFolder className="text-xl text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div className="flex gap-3 text-text-secondary">
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-text-primary transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <FiGithub size={20} />
                                        </a>
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDemoClick(e, project);
                                            }}
                                            className="hover:text-text-primary transition-colors relative group/icon"
                                        >
                                            {isVideo(project.demo) ? <FiPlay size={20} /> : <FiExternalLink size={20} />}
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors text-text-primary">{project.title}</h3>
                                <p className="text-text-secondary text-sm mb-6 flex-grow">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.stack.map(tech => (
                                        <span key={tech} className="text-xs font-mono text-orange-800 dark:text-orange-300 bg-orange-500/20 dark:bg-orange-500/10 px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* 
            // ==========================================
            // LEGACY GRID LAYOUT (Uncomment to Restore)
            // ==========================================
            // To switch back to grid:
            // 1. Comment out the Flexbox layout above
            // 2. Uncomment this Grid layout below
            
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="glass-card flex flex-col h-full hover-lift group overflow-hidden"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-60" />
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="p-2 bg-white/5 rounded-lg group-hover:bg-orange-500/20 transition-colors">
                                        <FiFolder className="text-xl text-orange-400" />
                                    </div>
                                    <div className="flex gap-3 text-gray-400">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors"><FiGithub size={20} /></a>
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-text-primary transition-colors relative group/icon" onClick={(e) => { e.stopPropagation(); handleDemoClick(e, project); }}>
                                            {isVideo(project.demo) ? <FiPlay size={20} /> : <FiExternalLink size={20} />}
                                        </a>
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-300 transition-colors">{project.title}</h3>
                                <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.stack.map(tech => (
                                        <span key={tech} className="text-xs font-mono text-orange-800 dark:text-orange-300 bg-orange-500/20 dark:bg-orange-500/10 px-2 py-1 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            */}

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--bg-primary)]/95 backdrop-blur-md p-4"
                        onClick={() => setSelectedVideo(null)}
                    >
                        {/* Close / Back Button (Top Left) */}
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-6 left-6 flex items-center gap-2 text-text-secondary hover:text-orange-600 dark:hover:text-orange-400 transition-colors z-50 group"
                        >
                            <div className="p-2 bg-[var(--glass-bg)] rounded-full group-hover:bg-orange-500/10 transition-colors">
                                <FiArrowLeft className="text-xl" />
                            </div>
                            <span className="font-semibold text-lg text-text-primary">Back to Portfolio</span>
                        </button>

                        {/* Close Icon (Top Right) */}
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-6 right-6 text-text-secondary hover:text-orange-400 text-4xl transition-colors z-50"
                        >
                            <FiX />
                        </button>

                        <div
                            className="w-full max-w-5xl flex flex-col items-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="w-full relative rounded-2xl overflow-hidden shadow-2xl shadow-orange-500/10 border border-[var(--glass-border)] bg-[var(--bg-primary)]"
                            >
                                <video
                                    src={selectedVideo.url}
                                    controls
                                    autoPlay
                                    className="w-full max-h-[80vh]"
                                >
                                    Your browser does not support the video tag.
                                </video>
                            </motion.div>
                            <h3 className="text-2xl font-bold text-text-primary mt-6">{selectedVideo.title} <span className="text-orange-600 dark:text-orange-400">Demo</span></h3>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-[var(--bg-primary)]/80 backdrop-blur-sm pointer-events-auto"
                        />

                        <motion.div
                            layoutId={`project-card-${selectedProject.id}`}
                            className="w-full max-w-2xl relative z-10 pointer-events-auto bg-[var(--bg-secondary)] border border-[var(--glass-border)] rounded-2xl overflow-hidden shadow-2xl font-sans"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 z-20 p-2 bg-[var(--glass-bg)] hover:bg-orange-600 text-text-primary hover:text-white rounded-full backdrop-blur-md transition-all border border-[var(--glass-border)]"
                            >
                                <FiX size={20} />
                            </button>

                            {/* Image Section */}
                            <div className="relative h-64 md:h-72 w-full overflow-hidden bg-[var(--bg-primary)]">
                                <img
                                    src={selectedProject.image}
                                    alt={selectedProject.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] via-[var(--bg-secondary)]/40 to-transparent" />
                            </div>

                            {/* Content Section */}
                            <div className="p-6 md:p-8 relative z-20 -mt-20">
                                <div className="mb-4">
                                    <span className="text-orange-600 dark:text-orange-400 text-sm font-semibold uppercase tracking-wider">{selectedProject.category}</span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-text-primary mt-1">{selectedProject.title}</h2>
                                </div>

                                <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-8">
                                    {selectedProject.description}
                                </p>

                                <div className="mb-8">
                                    <h4 className="text-sm text-text-secondary font-semibold uppercase tracking-wider mb-3">Technologies</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedProject.stack.map((tech, idx) => (
                                            <span key={idx} className="text-sm font-semibold text-orange-800 dark:text-text-primary bg-orange-500/15 dark:bg-[var(--glass-bg)] border border-orange-500/20 dark:border-[var(--glass-border)] px-4 py-1.5 rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                                    {selectedProject.demo && selectedProject.demo !== "#" && (
                                        <motion.a
                                            href={selectedProject.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={(e) => handleDemoClick(e, selectedProject)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-3 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 transition-all text-center"
                                        >
                                            {isVideo(selectedProject.demo) ? (
                                                <><FiPlay /> Watch Demo</>
                                            ) : (
                                                <><FiExternalLink /> Visit Website</>
                                            )}
                                        </motion.a>
                                    )}

                                    {selectedProject.github && selectedProject.github !== "#" && (
                                        <motion.a
                                            href={selectedProject.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-3 px-6 bg-[var(--glass-bg)] border border-[var(--glass-border)] hover:bg-white/10 text-text-primary font-medium rounded-xl flex items-center justify-center gap-2 transition-all text-center"
                                        >
                                            <FiGithub /> Source Code
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Projects;
