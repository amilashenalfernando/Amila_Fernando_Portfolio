import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
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
                    borderColor: scrolled ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                    backgroundColor: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent',
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
                                ${location.pathname === item.target ? 'text-orange-400' : 'text-gray-300'}`}
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
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-white text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex flex-col justify-center items-center space-y-8"
                    >
                        {navItems.map((item) => (
                            <span
                                key={item.name}
                                onClick={() => handleNavClick(item.target, item.type === 'scroll')}
                                className="cursor-pointer text-2xl font-bold text-gray-300 hover:text-orange-400 transition-colors"
                            >
                                {item.name}
                            </span>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </React.Fragment>
    );
};

export default Navbar;
