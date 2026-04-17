import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiInstagram, FiFacebook } from 'react-icons/fi';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-start md:justify-center min-h-[80vh] text-center w-full pt-2 md:-mt-10">

            {/* Introduction Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="glass-card pt-6 pb-6 px-6 md:p-10 max-w-5xl w-full mx-4 flex flex-col items-center relative overflow-hidden"
            >
                {/* Glow effect inside card (Updated colors) */}
                <div className="absolute -top-24 -left-24 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-red-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Profile Photo */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
                    className="mb-8 relative"
                >
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl relative z-10">
                        {/* Placeholder - In real app, user replaces this URL */}
                        <img
                            src="/My/1.jpg"
                            alt="Amila Fernando"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>


                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-orange-400 font-medium tracking-wider text-sm mb-4 uppercase"
                >
                    Welcome to my portfolio
                </motion.span>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                    Hi, I'm <span className="text-gradient">Amila Fernando</span>
                </h1>

                {/* Roles / Clickable Links */}
                <div className="mb-10 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4 text-lg md:text-xl text-gray-300">
                    <Link to="projects" smooth={true} duration={500} offset={-100} className="cursor-pointer hover:text-orange-400 transition-colors border-b border-transparent hover:border-orange-400">
                        Software Engineering Undergraduate
                    </Link>
                    <span className="hidden md:inline text-gray-600">|</span>
                    <RouterLink
                        to="/design"
                        className="cursor-pointer hover:text-orange-400 transition-colors border-b border-transparent hover:border-orange-400"
                    >
                        Graphic Designer
                    </RouterLink>
                    <span className="hidden md:inline text-gray-600">|</span>
                    <RouterLink
                        to="/photos"
                        className="cursor-pointer hover:text-orange-400 transition-colors border-b border-transparent hover:border-orange-400"
                    >
                        Photographer
                    </RouterLink>
                </div>

                <p className="max-w-xl text-gray-400 mb-10 text-lg leading-relaxed">
                    Building the future, one frame and one function at a time.
                    I bring a multidisciplinary edge to the web, blending technical structure with an artist’s pursuit of the perfect moment.
                </p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
                >
                    <Link
                        to="projects"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="cursor-pointer px-8 py-3 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1 hover:bg-slate-900 flex items-center justify-center gap-2"
                    >
                        View Projects <FiArrowRight />
                    </Link>
                    <Link
                        to="contact"
                        smooth={true}
                        duration={500}
                        offset={-100}
                        className="cursor-pointer px-8 py-3 rounded-full bg-white/10 text-white font-semibold backdrop-blur-sm border border-white/10 hover:bg-slate-900 hover:border-slate-800 transition-all hover:-translate-y-1 flex items-center justify-center"
                    >
                        Get In Touch
                    </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-12 flex gap-6 text-gray-400"
                >
                    <a href="https://github.com/amilashenalfernando" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-2xl"><FiGithub /></a>
                    <a href="https://www.linkedin.com/in/amilashenalfernando/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors text-2xl"><FiLinkedin /></a>
                    <a href="mailto:amilafernando2004@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors text-2xl"><FiMail /></a>
                </motion.div>

            </motion.div>
        </div >
    );
};

export default Home;
