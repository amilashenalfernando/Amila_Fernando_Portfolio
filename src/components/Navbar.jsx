import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon, FiChevronRight } from 'react-icons/fi';
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
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open (uses CSS class, not inline style)
    useEffect(() => {
        const root = document.documentElement;
        if (isOpen) {
            root.classList.add('menu-open');
            document.body.classList.add('menu-open');
        } else {
            root.classList.remove('menu-open');
            document.body.classList.remove('menu-open');
        }
        return () => { 
            root.classList.remove('menu-open');
            document.body.classList.remove('menu-open'); 
        };
    }, [isOpen]);

    const openMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
    };

    const closeMenu = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsOpen(false);
        document.documentElement.classList.remove('menu-open');
        document.body.classList.remove('menu-open');
    };

    const handleNavClick = (target, isScroll) => {
        setIsOpen(false);
        document.body.classList.remove('menu-open');
        setTimeout(() => {
            if (isScroll) {
                if (isMainPage) {
                    scroller.scrollTo(target, {
                        smooth: 'easeInOutQuart',
                        duration: 800,
                        offset: -100
                    });
                } else {
                    navigate(`/#${target}`);
                }
            } else {
                navigate(target);
            }
        }, 50);
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
            {/* ── Main Navbar ── */}
            <nav
                className={`fixed left-0 right-0 z-[999] mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center transition-all duration-500
                    ${scrolled
                        ? 'top-4 w-[calc(100%-32px)] md:w-[calc(100%-48px)] rounded-2xl shadow-xl shadow-orange-500/10 border border-[var(--glass-border)] bg-[var(--nav-bg)] backdrop-blur-xl'
                        : 'top-0 w-full bg-transparent'
                    }`}
            >
                {/* Logo */}
                <div onClick={() => handleNavClick('home', true)} className="cursor-pointer z-10">
                    <img src="/Logo/logo.png" alt="Logo" className="h-6 w-auto object-contain" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {navItems.map((item) => (
                        <span
                            key={item.name}
                            onClick={() => handleNavClick(item.target, item.type === 'scroll')}
                            className={`relative cursor-pointer text-sm font-medium hover:text-orange-400 transition-colors
                                ${location.pathname === item.target ? 'text-orange-400' : 'text-[var(--text-secondary)]'}`}
                        >
                            {item.name}
                        </span>
                    ))}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-[var(--glass-bg)] hover:bg-orange-500/10 transition-colors border border-[var(--glass-border)] text-orange-400 ml-2"
                        title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                    </button>
                </div>

                {/* Mobile Controls */}
                <div className="md:hidden flex items-center gap-3">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-orange-400"
                    >
                        {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>

                    {/* Hamburger — fires on FIRST touch, no delay */}
                    <button
                        id="mobile-menu-open"
                        aria-label="Open Menu"
                        style={{ touchAction: 'none', userSelect: 'none', WebkitUserSelect: 'none' }}
                        onTouchStart={openMenu}
                        onPointerDown={(e) => { if (e.pointerType !== 'touch') openMenu(e); }}
                        className="p-2 flex items-center justify-center rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-orange-400 active:bg-orange-500/20"
                    >
                        <FiMenu size={20} />
                    </button>
                </div>
            </nav>

            {/* ── Mobile Drawer Overlay (pure CSS, zero Framer Motion) ── */}
            {/* Backdrop */}
            <div
                aria-hidden="true"
                onClick={closeMenu}
                className="mobile-backdrop"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    background: 'rgba(0,0,0,0.55)',
                    display: 'block',
                    pointerEvents: isOpen ? 'auto' : 'none',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                }}
            />

            {/* Drawer Panel — slides in from right */}
            {/* 20px transparent left strip lets iOS back-swipe gesture pass through */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '20px',
                    zIndex: 1002,
                    pointerEvents: 'none', // always let through — iOS uses this edge for back gesture
                }}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Navigation Menu"
                style={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 1001,
                    width: '80%',
                    maxWidth: '320px',
                    background: isDarkMode
                        ? 'linear-gradient(160deg, #0f0f0f 0%, #1a1010 100%)'
                        : 'linear-gradient(160deg, #ffffff 0%, #fff8f5 100%)',
                    borderLeft: '1px solid rgba(249,115,22,0.15)',
                    boxShadow: '-20px 0 60px rgba(0,0,0,0.4)',
                    display: 'flex',
                    flexDirection: 'column',
                    transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
                    transition: 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                    willChange: 'transform',
                    overflowY: 'auto',
                    overscrollBehavior: 'contain',
                    WebkitOverflowScrolling: 'touch',
                }}
            >
                {/* Drawer Header */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px 20px 16px',
                    borderBottom: '1px solid rgba(249,115,22,0.1)',
                }}>
                    <div onClick={() => handleNavClick('home', true)} style={{ cursor: 'pointer' }}>
                        <img src="/Logo/logo.png" alt="Logo" style={{ height: '20px', width: 'auto' }} />
                    </div>
                    <button
                        id="mobile-menu-close"
                        aria-label="Close Menu"
                        onTouchStart={closeMenu}
                        onPointerDown={(e) => { if (e.pointerType !== 'touch') closeMenu(e); }}
                        style={{
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            border: '1px solid rgba(249,115,22,0.2)',
                            background: 'rgba(249,115,22,0.08)',
                            color: '#f97316',
                            cursor: 'pointer',
                            touchAction: 'none',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                            flexShrink: 0,
                        }}
                    >
                        <FiX size={20} />
                    </button>
                </div>

                {/* Nav Items */}
                <nav style={{ flex: 1, padding: '12px 16px' }}>
                    {navItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => handleNavClick(item.target, item.type === 'scroll')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%',
                                padding: '14px 16px',
                                marginBottom: '4px',
                                borderRadius: '14px',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                color: 'var(--text-primary)',
                                fontSize: '16px',
                                fontWeight: '500',
                                fontFamily: 'inherit',
                                textAlign: 'left',
                                transition: 'background 0.15s ease',
                                touchAction: 'manipulation',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(249,115,22,0.08)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                        >
                            <span>{item.name}</span>
                            <FiChevronRight size={16} style={{ color: '#f97316', opacity: 0.6 }} />
                        </button>
                    ))}
                </nav>

                {/* Get in Touch Button */}
                <div style={{ padding: '16px 20px 36px' }}>
                    <button
                        onClick={() => handleNavClick('contact', true)}
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '16px',
                            border: 'none',
                            background: 'linear-gradient(135deg, #f97316, #ef4444)',
                            color: '#fff',
                            fontSize: '16px',
                            fontWeight: '700',
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            boxShadow: '0 8px 24px rgba(249,115,22,0.3)',
                            touchAction: 'manipulation',
                        }}
                    >
                        Get in Touch
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Navbar;
