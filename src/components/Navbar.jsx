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
                    backdropFilter: scrolled ? (isOpen ? 'blur(0px)' : 'blur(20px)') : 'blur(0px)',
                }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1
                }}
                className={`fixed left-0 right-0 z-50 mx-auto px-6 py-4 flex justify-between items-center ${scrolled ? 'shadow-2xl shadow-orange-500/5' : ''}`}
            >
                <div className={`flex justify-between items-center w-full transition-opacity duration-300 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
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
                    <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
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
                            className="p-2 rounded-full bg-[var(--glass-bg)] hover:bg-orange-500/10 transition-colors border border-[var(--glass-border)] text-orange-400 ml-2"
                            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                        </button>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-orange-400"
                        >
                            {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                        </button>
                        <button
                            className="text-orange-400 p-2 w-10 h-10 flex items-center justify-center hover:bg-orange-500/10 rounded-full transition-colors active:scale-95"
                            onClick={() => setIsOpen(true)}
                            aria-label="Open Menu"
                        >
                            <FiMenu size={28} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Premium Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] md:hidden">
                        {/* Backdrop Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-[var(--bg-primary)]/40 backdrop-blur-xl"
                        />

                        {/* Top Navigation Bar in Menu */}
                        <div className="relative z-10 px-6 py-4 flex justify-between items-center w-full">
                            <div onClick={() => handleNavClick('home', true)} className="cursor-pointer">
                                <img src="/Logo/logo.png" alt="Logo" className="h-5 w-auto" />
                            </div>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={toggleTheme}
                                    className="p-2 text-orange-400 hover:opacity-70 transition-opacity"
                                >
                                    {isDarkMode ? <FiSun size={24} /> : <FiMoon size={24} />}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-orange-400 hover:opacity-70 transition-opacity"
                                >
                                    <FiX size={28} />
                                </button>
                            </div>
                        </div>

                        {/* Centered Menu Card Container */}
                        <div 
                            className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-6"
                            onClick={() => setIsOpen(false)}
                        >
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-full max-w-sm glass-card border border-[var(--glass-border)] bg-[var(--bg-primary)]/85 backdrop-blur-2xl rounded-[32px] p-6 shadow-2xl overflow-hidden relative"
                            >
                                {/* Decorative Glow */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-orange-500/10 blur-[60px] rounded-full pointer-events-none" />

                                <div className="flex flex-col space-y-4 relative z-10">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 + index * 0.05 }}
                                            className="text-center"
                                        >
                                            <span
                                                onClick={() => handleNavClick(item.target, item.type === 'scroll')}
                                                className="text-lg font-medium text-[var(--text-secondary)] hover:text-orange-400 transition-colors cursor-pointer inline-block py-0.5"
                                            >
                                                {item.name}
                                            </span>
                                        </motion.div>
                                    ))}

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.45 }}
                                        className="pt-4"
                                    >
                                        <button
                                            onClick={() => handleNavClick('contact', true)}
                                            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 text-white text-lg font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-all"
                                        >
                                            Get in Touch
                                        </button>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </React.Fragment>
    );
};

export default Navbar;
