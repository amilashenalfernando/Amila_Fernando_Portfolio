import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBook, FiBriefcase, FiAward, FiX, FiZoomIn, FiCheckCircle, FiExternalLink } from 'react-icons/fi';

const educationData = [
    {
        type: "experience",
        title: "Founder & Photographer",
        institution: "Amila Fernando Photography",
        year: "2024 - Present",
        desc: "Professional event and commercial photography with a focus on storytelling."
    },
    {
        type: "experience",
        title: "Freelance Graphic Designer",
        institution: "Self-Employed",
        year: "2024 - Present",
        desc: "Creating impactful brand identities and modern visual assets."
    },
    {
        type: "education",
        title: "BSc (Hons) in Software Engineering",
        institution: "Sri Lanka Technological Campus",
        year: "2024-Present",
        desc: "Bridging the gap between robust software engineering and intuitive UI/UX design."
    },
    {
        type: "education",
        title: "Advanced Level - Physical Science",
        institution: "St.Joesph Vaz College, Wennappuwa",
        year: "2023",
        desc: "Successfully completed Advanced Level examinations in Combined Mathematics, Physics, and Chemistry."
    }
];

const certifications = [
    {
        id: 1,
        title: "Foundations of User Experience (UX) Design",
        issuer: "Google",
        date: "Dec 2025",
        image: "/Education/1.png",
        skills: ["User Experience (UX)", "UX Research", "Wireframing", "Prototyping"],
        link: "https://www.coursera.org/account/accomplishments/verify/F2ALQA8QKOWH"
    },
    {
        id: 2,
        title: "Supervised Machine Learning: Regression and Classification.",
        issuer: "DeepLearning.AI",
        date: "Nov 2025",
        image: "/Education/2.png",
        skills: ["Linear Regression", "Logistic Regression", "Supervised Learning", "Machine Learning Algorithms"],
        link: "https://www.coursera.org/account/accomplishments/verify/S8GI6MYMG0NF"
    },
    {
        id: 3,
        title: "AWS S3 Basics",
        issuer: "Coursera",
        date: "Nov 2025",
        image: "/Education/3.png",
        skills: ["AWS S3", "Cloud Storage", "Object Storage", "Cloud Infrastructure"],
        link: "https://www.coursera.org/account/accomplishments/verify/PA3DQLMFIMWK"
    },
    {
        id: 4,
        title: "Azure: create a REST API using NodeJS Serverless Functions",
        issuer: "Coursera",
        date: "Nov 2025",
        image: "/Education/4.png",
        skills: ["Azure Functions", "Node.js", "REST API", "Serverless Architecture"],
        link: "https://www.coursera.org/account/accomplishments/verify/I9K54L0AFW35"
    },
    {
        id: 5,
        title: "Adobe Premiere Pro – Basic to Advanced",
        issuer: "Master.lk",
        date: "Jan 2025",
        image: "/Education/5.png",
        skills: ["Video Editing", "Adobe Premiere Pro", "Color Grading", "Post-Production"],
        link: "https://master.lk/tutor-certificate-2/?cert_hash=3692d195d729899a"
    }
];

const Education = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="w-full max-w-6xl mx-auto pt-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <span className="text-orange-400 font-semibold tracking-wider uppercase text-sm">Journey</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2">Education & <span className="text-gradient">Experience</span></h2>
            </motion.div>

            {/* Timeline Section */}
            <div className="relative max-w-4xl mx-auto mb-32">
                {/* Vertical Line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 transform -translate-x-1/2" />

                {educationData.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                    >
                        {/* Timeline Dot */}
                        <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full border-4 border-[#050505] shadow-lg flex items-center justify-center z-10"
                            style={{
                                backgroundColor: item.type === 'education' ? '#f97316' : item.type === 'experience' ? '#ef4444' : '#eab308'
                            }}
                        >
                            {/* Icons would go here if imported/defined */}
                            {item.type === 'education' && <FiBook className="text-white text-sm" />}
                            {item.type === 'experience' && <FiBriefcase className="text-white text-sm" />}
                            {item.type === 'certification' && <FiAward className="text-white text-sm" />}
                        </div>

                        {/* Content Side */}
                        <div className="md:w-1/2 pl-12 md:pl-0" style={{ paddingLeft: index % 2 === 0 ? "0" : "" }}>
                            {/* Empty spacer for the other side on desktop */}
                        </div>

                        {/* Card Side */}
                        <div className={`md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                            <div className="glass-card p-6 relative hover:border-orange-500/50 transition-colors">
                                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/5 text-gray-400 mb-3 border border-white/5">
                                    {item.year}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                                <h4 className="text-orange-300 text-sm mb-3">{item.institution}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Certifications Section */}
            <div className="mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-orange-400 font-semibold tracking-wider uppercase text-sm">Achievements</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2">Certifications & <span className="text-gradient">Awards</span></h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.slice(0, 3).map((cert) => (
                        <motion.a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={cert.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="group glass-card p-6 relative overflow-hidden hover:border-orange-500/50 transition-colors block"
                        >
                            <div className="absolute top-0 right-0 p-16 bg-gradient-to-br from-orange-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="mb-6 h-40 rounded-lg overflow-hidden relative">
                                <img src={cert.image} alt={cert.title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <FiExternalLink className="text-white text-3xl" />
                                </div>
                            </div>

                            <div className="relative z-10">
                                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">{cert.title}</h3>
                                <p className="text-gray-400 text-sm mb-4">{cert.issuer} • {cert.date}</p>

                                <div className="flex flex-wrap gap-2">
                                    {cert.skills.map((skill, idx) => (
                                        <span key={idx} className="text-xs px-2 py-1 bg-white/5 rounded border border-white/5 text-gray-300">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-8 py-3 rounded-full bg-white/10 text-white font-semibold backdrop-blur-sm border border-white/10 hover:bg-orange-500 hover:border-orange-500 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group"
                    >
                        View All Certificates
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
                            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-[#050505] overflow-hidden"
                            onClick={() => setIsModalOpen(false)}
                        >
                            {/* Animated Background Blobs - Full Screen */}
                            <div className="hidden md:block absolute top-0 left-[-10%] w-[500px] h-[500px] bg-orange-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob pointer-events-none" />
                            <div className="hidden md:block absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-red-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-2000 pointer-events-none" />
                            <div className="hidden md:block absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-yellow-600/20 rounded-full mix-blend-screen filter blur-[100px] opacity-30 animate-blob animation-delay-4000 pointer-events-none" />

                            <motion.div
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50 }}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-[#050505]/80 backdrop-blur-md md:backdrop-blur-xl border border-white/10 rounded-2xl w-full max-w-7xl h-auto max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative z-10"
                            >

                                {/* Modal Header */}
                                <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center bg-transparent sticky top-0 z-20 shrink-0">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white">All Certifications</h3>
                                        <p className="text-gray-400 text-xs md:text-sm">A collection of my professional achievements</p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="p-2 md:p-3 bg-white/5 hover:bg-white/20 rounded-full transition-colors"
                                    >
                                        <FiX className="text-lg md:text-xl text-white" />
                                    </button>
                                </div>

                                {/* Modal Content - Scrollable */}
                                <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar relative z-10 flex-1 min-h-0">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                                        {certifications.map((cert) => (
                                            <a
                                                href={cert.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                key={cert.id}
                                                className="group glass-card p-4 md:p-6 relative overflow-hidden hover:border-orange-500/50 transition-colors block bg-white/5"
                                            >
                                                <div className="mb-4 md:mb-6 h-32 md:h-40 rounded-lg overflow-hidden relative">
                                                    <img src={cert.image} alt={cert.title} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <FiExternalLink className="text-white text-2xl md:text-3xl" />
                                                    </div>
                                                </div>

                                                <div>
                                                    <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">{cert.title}</h3>
                                                    <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4">{cert.issuer} • {cert.date}</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {cert.skills.map((skill, idx) => (
                                                            <span key={idx} className="text-xs px-2 py-1 bg-black/30 rounded border border-white/10 text-gray-300">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Education;
