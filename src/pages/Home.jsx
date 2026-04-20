import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';
import { FiArrowRight, FiGithub, FiLinkedin, FiMail, FiCode, FiCamera, FiPenTool } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

const roles = [
    { label: 'Software Engineer', icon: FiCode, link: '/projects' },
    { label: 'Graphic Designer', icon: FiPenTool, link: '/design' },
    { label: 'Photographer', icon: FiCamera, link: '/photos' },
];

const stats = [
    { value: '3+', label: 'Projects' },
    { value: '2+', label: 'Years Experience' },
    { value: '100+', label: 'Events Shot' },
    { value: '100%', label: 'Passionate' },
];

const Home = () => {
    const { isDarkMode } = useTheme();
    const [activeRole, setActiveRole] = useState(0);
    const [displayed, setDisplayed] = useState('');
    const [typing, setTyping] = useState(true);

    useEffect(() => {
        const fullText = roles[activeRole].label;
        let timeout;
        if (typing) {
            if (displayed.length < fullText.length) {
                timeout = setTimeout(() => setDisplayed(fullText.slice(0, displayed.length + 1)), 65);
            } else {
                timeout = setTimeout(() => setTyping(false), 2000);
            }
        } else {
            if (displayed.length > 0) {
                timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
            } else {
                setActiveRole((prev) => (prev + 1) % roles.length);
                setTyping(true);
            }
        }
        return () => clearTimeout(timeout);
    }, [displayed, typing, activeRole]);

    return (
        <div className="w-full min-h-[90vh] flex items-center justify-center px-4 md:px-8 pt-8 pb-16">
            <div className="w-full max-w-6xl">

                {/* ── TOP SECTION: Photo + Text side by side ── */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-16">

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="flex-shrink-0"
                    >
                        {/* Circle Photo with Gradient Border */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-1 bg-gradient-to-br from-orange-500 to-red-600 shadow-2xl">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-[var(--bg-primary)] bg-[var(--bg-primary)]">
                                    <img
                                        src="/My/1.jpg"
                                        alt="Amila Fernando"
                                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── RIGHT column: Text ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        className="flex flex-col items-start text-left flex-1"
                    >
                        {/* Greeting tag */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-500 text-xs font-bold tracking-widest uppercase mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                            Welcome to my Portfolio
                        </div>

                        {/* Large Name */}
                        <h1 className="text-4xl md:text-5xl font-bold leading-[1.05] tracking-tight text-[var(--text-primary)] mb-4">
                            I'm{' '}
                            <span className="text-gradient">Amila Fernando</span>
                        </h1>

                        {/* Role line */}
                        <div className="flex items-center gap-3 mb-6">
                            <div className="h-0.5 w-8 bg-orange-500 rounded-full" />
                            <span className="text-orange-500 font-semibold text-base md:text-lg">
                                {displayed}<span className="animate-pulse">|</span>
                            </span>
                        </div>

                        {/* Role pills */}
                        <div className="flex flex-wrap gap-2 mb-7">
                            {roles.map((role, i) => {
                                const RoleIcon = role.icon;
                                return (
                                    <RouterLink key={role.label} to={role.link}>
                                        <button
                                            onClick={() => { setActiveRole(i); setDisplayed(''); setTyping(true); }}
                                            className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border transition-all
                                                ${activeRole === i
                                                    ? 'bg-orange-500 text-white border-orange-500 shadow-[0_4px_14px_rgba(249,115,22,0.35)]'
                                                    : 'bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-secondary)] hover:border-orange-500/50 hover:text-orange-500'
                                                }`}
                                        >
                                            <RoleIcon size={13} />
                                            {role.label}
                                        </button>
                                    </RouterLink>
                                );
                            })}
                        </div>

                        {/* Description */}
                        <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed max-w-lg mb-9">
                            Building the future one frame and one function at a time. I bring
                            a multidisciplinary edge — blending{' '}
                            <span className="text-orange-500 font-semibold">technical structure</span> with an{' '}
                            <span className="text-orange-500 font-semibold">artist's eye</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 mb-7">
                            <Link to="projects" smooth duration={500} offset={-100}
                                className="cursor-pointer px-8 py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 hover:shadow-orange-500/40 transition-all flex items-center justify-center gap-2">
                                View Projects <FiArrowRight size={16} />
                            </Link>
                            <Link to="contact" smooth duration={500} offset={-100}
                                className="cursor-pointer px-8 py-3 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] text-[var(--text-primary)] font-semibold hover:border-orange-500/50 hover:bg-orange-500/10 hover:-translate-y-0.5 transition-all flex items-center justify-center">
                                Get In Touch
                            </Link>
                        </div>

                        {/* Social Icons — below CTA buttons */}
                        <div className="flex gap-3">
                            {[
                                { href: 'https://github.com/amilashenalfernando', icon: FiGithub, label: 'GitHub' },
                                { href: 'https://www.linkedin.com/in/amilashenalfernando/', icon: FiLinkedin, label: 'LinkedIn' },
                                { href: 'mailto:amilafernando2004@gmail.com', icon: FiMail, label: 'Email' },
                            ].map(({ href, icon: SocialIcon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={label}
                                    className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-secondary)] hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all"
                                >
                                    <SocialIcon size={16} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* ── BOTTOM: Stats bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className="glass-card px-6 py-5 flex flex-col items-center justify-center text-center rounded-2xl border border-[var(--glass-border)]"
                        >
                            <span className="text-3xl font-extrabold text-orange-500 mb-1">{stat.value}</span>
                            <span className="text-[var(--text-secondary)] text-xs font-semibold uppercase tracking-wider">{stat.label}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Home;
