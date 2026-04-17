import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isMainPage = location.pathname === '/';

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (target, isScroll) => {
        setIsOpen(false);
        if (isScroll) {
            if (isMainPage) {
                scroller.scrollTo(target, {
                    smooth: 'easeInOutQuart',
                    duration: 1000,
                    offset: -100
                });
            } else {
                navigate(`/#${target}`);
            }
        } else {
            navigate(target);
        }
    };

    const navItems = [
        { name: 'Home', target: 'home', type: 'scroll' },
        { name: 'About', target: 'about', type: 'scroll' },
        { name: 'Projects', target: 'projects', type: 'scroll' },
        { name: 'Design', target: '/design', type: 'route' },
        { name: 'Photography', target: '/photos', type: 'route' },
        { name: 'Experience', target: 'experience', type: 'scroll' },
        { name: 'Volunteering', target: 'volunteering', type: 'scroll' },
        { name: 'Contact', target: 'contact', type: 'scroll' },
    ];

    return (
        <React.Fragment>
            <motion.nav
                initial={{ y: -100 }}
                animate={{
                    y: 0,
                    width: scrolled ? '85%' : '100%',
                    top: scrolled ? 20 : 0,
                    borderRadius: scrolled ? '50px' : '0px',
                    borderColor: scrolled ? 'var(--glass-border)' : 'transparent',
                    backgroundColor: scrolled ? 'var(--nav-bg)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1
                }}
                className={`fixed left-0 right-0 z-50 mx-auto px-6 py-4 flex justify-between items-center ${scrolled ? 'shadow-2xl shadow-orange-500/5' : ''}`}
            >
                {/* Logo */}
                {/* Logo */}
                <div
                    onClick={() => handleNavClick('home', true)}
                    className="cursor-pointer"
                >
                    <img
                        src="/Logo/logo.png"
                        alt="Logo"
                        className="h-5 w-auto object-contain"
                    />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-6 lg:space-x-8">
                    {navItems.map((item) => (
                        <span
                            key={item.name}
                            onClick={() => handleNavClick(item.target, item.type === 'scroll')}
                            className={`relative cursor-pointer text-sm font-medium transition-colors hover:text-orange-400 
                                ${location.pathname === item.target ? 'text-orange-400' : 'text-[var(--text-secondary)]'}`}
                        >
                            {item.name}
                            {location.pathname === item.target && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-orange-400"
                                />
                            )}
                        </span>
                    ))}

                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-[var(--glass-bg)] hover:bg-orange-500/10 transition-colors border border-[var(--glass-border)] text-orange-400"
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </button>
                </div>

                {/* Mobile Menu & Theme Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-orange-400"
                    >
                        {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>
                    <button
                        className="text-orange-400 text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm md:hidden"
                        />

                        {/* Side Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 z-[60] w-[85vw] max-w-[350px] h-full bg-[var(--bg-primary)]/98 border-l border-[var(--glass-border)] shadow-2xl md:hidden overflow-hidden rounded-l-[32px] backdrop-blur-2xl"
                        >
                            {/* Background Atmospheric Glows */}
                            <div className="absolute top-[-10%] right-[-10%] w-[100%] h-[50%] bg-orange-600/10 rounded-full blur-[80px] pointer-events-none" />
                            <div className="absolute bottom-[-10%] left-[-10%] w-[80%] h-[40%] bg-red-600/10 rounded-full blur-[70px] pointer-events-none" />

                            <div className="relative h-full flex flex-col px-8 py-12 overflow-y-auto">
                                {/* Header / Close Button */}
                                <div className="flex justify-between items-center mb-12">
                                    <div onClick={() => handleNavClick('home', true)} className="cursor-pointer">
                                        <img src="/Logo/logo.png" alt="Logo" className="h-5 w-auto" />
                                    </div>
                                    <button
                                        className="p-2.5 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-orange-400"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FiX size={20} />
                                    </button>
                                </div>

                                {/* Navigation Links */}
                                <div className="flex flex-col space-y-5 flex-grow">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.4, delay: 0.1 + index * 0.05, ease: "easeOut" }}
                                        >
                                            <span
                                                onClick={() => handleNavClick(item.target, item.type === 'scroll')}
                                                className="group inline-flex items-center gap-3 cursor-pointer"
                                            >
                                                <span className="text-[10px] font-mono text-orange-400 opacity-40">
                                                    0{index + 1}
                                                </span>
                                                <span className="text-3xl font-bold text-text-primary group-hover:text-orange-400 transition-colors tracking-tight">
                                                    {item.name}
                                                </span>
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Social Links Footer */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.6 }}
                                    className="mt-auto pt-8 border-t border-[var(--glass-border)]"
                                >
                                    <p className="text-[10px] font-mono text-text-secondary uppercase tracking-[0.2em] mb-4 opacity-50">Social Presence</p>
                                    <div className="flex gap-6 text-text-secondary">
                                        <a href="https://github.com/amilashenalfernando" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors text-xl">
                                            <FiGithub />
                                        </a>
                                        <a href="https://www.linkedin.com/in/amilashenalfernando/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400 transition-colors text-xl">
                                            <FiLinkedin />
                                        </a>
                                        <a href="mailto:amilafernando2004@gmail.com" className="hover:text-orange-400 transition-colors text-xl">
                                            <FiMail />
                                        </a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </React.Fragment>
    );
};

export default Navbar;
