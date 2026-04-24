import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { FiMenu, FiX, FiSun, FiMoon, FiChevronRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { isDarkMode, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    // Ref to block ghost clicks for 400ms after any pointer interaction
    const lastPointerTime = useRef(0);

    const isMainPage = location.pathname === '/';

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when menu is open
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

    // ─── Unified pointer handler: fires instantly, blocks ghost clicks ───────
    // ALL touch-interactive elements use onPointerDown + e.preventDefault().
    // React's pointerdown listeners are NON-passive, so preventDefault() 
    // actually works — it cancels the follow-up synthetic click event.
    // onTouchStart listeners in React 17+ are PASSIVE, so preventDefault()
    // there is silently ignored, allowing ghost clicks to fire ~300ms later.

    const handleOpenMenu = (e) => {
        e.preventDefault();
        e.stopPropagation();
        lastPointerTime.current = Date.now();
        setIsOpen(true);
    };

    const handleCloseMenu = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        lastPointerTime.current = Date.now();
        setIsOpen(false);
        document.documentElement.classList.remove('menu-open');
        document.body.classList.remove('menu-open');
    };

    const handleNavClick = (target, isScroll) => {
        setIsOpen(false);
        document.documentElement.classList.remove('menu-open');
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

    // Logo click — guard against ghost clicks by checking timing
    const handleLogoPress = (e) => {
        e.preventDefault();
        // Block if menu is open OR if a pointer event just fired within 400ms (ghost click window)
        if (isOpen) return;
        if (Date.now() - lastPointerTime.current < 400) return;
        handleNavClick('home', true);
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
                <div
                    onPointerDown={handleLogoPress}
                    className="cursor-pointer z-10 transition-opacity select-none"
                    style={{
                        opacity: isOpen ? 0.3 : 1,
                        touchAction: 'manipulation',
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                    }}
                >
                    <img src="/Logo/logo.png" alt="Logo" className="h-6 w-auto object-contain pointer-events-none" />
                </div>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    {navItems.map((item) => (
                        <span
                            key={item.name}
                            onClick={() => handleNavClick(item.target, item.type === 'scroll')}
                            className={`relative cursor-pointer text-sm font-medium hover:text-orange-400 transition-colors p-2 lg:p-1
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

                {/* ── Mobile Controls ── */}
                <div className="md:hidden flex items-center gap-3">
                    {/*
                        KEY FIX: onPointerDown + e.preventDefault()
                        - Fires INSTANTLY on touch (no 300ms wait)
                        - preventDefault() on pointerdown cancels the follow-up synthetic
                          click event, so toggleTheme/openMenu only fires ONCE per tap
                        - React pointerdown = non-passive → preventDefault() actually works
                        - React touchstart = passive → preventDefault() is silently IGNORED
                    */}

                    {/* Theme Toggle */}
                    <button
                        aria-label={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        onPointerDown={(e) => {
                            e.preventDefault();
                            toggleTheme();
                        }}
                        style={{
                            touchAction: 'manipulation',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                        }}
                        className="p-3 rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-orange-400 active:scale-90 transition-transform"
                    >
                        {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
                    </button>

                    {/* Hamburger */}
                    <button
                        id="mobile-menu-open"
                        aria-label="Open Menu"
                        onPointerDown={handleOpenMenu}
                        style={{
                            touchAction: 'manipulation',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                        }}
                        className="p-3 flex items-center justify-center rounded-full bg-[var(--glass-bg)] border border-[var(--glass-border)] text-orange-400 active:bg-orange-500/20 active:scale-90 transition-transform"
                    >
                        <FiMenu size={20} />
                    </button>
                </div>
            </nav>

            {/* ── Backdrop ── */}
            <div
                aria-hidden="true"
                onPointerDown={handleCloseMenu}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 1000,
                    background: 'rgba(0,0,0,0.55)',
                    display: 'block',
                    pointerEvents: isOpen ? 'auto' : 'none',
                    opacity: isOpen ? 1 : 0,
                    transition: 'opacity 0.2s ease',
                    touchAction: 'manipulation',
                }}
            />

            {/* ── iOS back-swipe passthrough strip (left 20px) ── */}
            <div
                aria-hidden="true"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '20px',
                    zIndex: 1002,
                    pointerEvents: 'none',
                }}
            />

            {/* ── Drawer Panel ── */}
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
                    {/* Logo inside drawer — navigate home and close */}
                    <div
                        onPointerDown={(e) => {
                            e.preventDefault();
                            handleCloseMenu(e);
                            handleNavClick('home', true);
                        }}
                        style={{
                            cursor: 'pointer',
                            padding: '8px',
                            touchAction: 'manipulation',
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
                        }}
                    >
                        <img
                            src="/Logo/logo.png"
                            alt="Logo"
                            style={{ height: '20px', width: 'auto', pointerEvents: 'none' }}
                        />
                    </div>

                    {/* Close Button */}
                    <button
                        id="mobile-menu-close"
                        aria-label="Close Menu"
                        onPointerDown={handleCloseMenu}
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
                            touchAction: 'manipulation',
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
                            onPointerDown={(e) => {
                                e.preventDefault();
                                handleNavClick(item.target, item.type === 'scroll');
                            }}
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
                                userSelect: 'none',
                                WebkitUserSelect: 'none',
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
                        onPointerDown={(e) => {
                            e.preventDefault();
                            handleNavClick('contact', true);
                        }}
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
                            userSelect: 'none',
                            WebkitUserSelect: 'none',
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
