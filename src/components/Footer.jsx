import React from 'react';
import { Link } from 'react-scroll';
import { FiGithub, FiLinkedin, FiInstagram, FiMail, FiFacebook } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="w-full bg-[var(--glass-bg)] backdrop-blur-lg border-t border-[var(--glass-border)] pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="md:col-span-2 space-y-6">
                        <h2 className="text-2xl font-bold">
                            <span className="text-text-primary">Amila</span>
                            <span className="text-orange-500">.</span>
                        </h2>
                        <p className="text-text-secondary max-w-sm leading-relaxed text-sm">
                            Decode the Data. Dominate the Challenge.<br />
                            Building modern web experiences with a focus on design and performance.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://github.com/amilashenalfernando" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--glass-bg)] rounded-lg hover:bg-orange-500/10 hover:text-orange-400 text-text-primary transition-colors">
                                <FiGithub size={20} />
                            </a>
                            <a href="https://www.linkedin.com/in/amilashenalfernando/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--glass-bg)] rounded-lg hover:bg-orange-500/10 hover:text-orange-400 text-text-primary transition-colors">
                                <FiLinkedin size={20} />
                            </a>
                            <a href="https://www.instagram.com/amila_s_fernando_/" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--glass-bg)] rounded-lg hover:bg-orange-500/10 hover:text-orange-400 text-text-primary transition-colors">
                                <FiInstagram size={20} />
                            </a>
                            <a href="https://www.facebook.com/amila.fernando.31924792" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--glass-bg)] rounded-lg hover:bg-orange-500/10 hover:text-orange-400 text-text-primary transition-colors">
                                <FiFacebook size={20} />
                            </a>
                            <a href="mailto:amilafernando2004@gmail.com" target="_blank" rel="noopener noreferrer" className="p-3 bg-[var(--glass-bg)] rounded-lg hover:bg-orange-500/10 hover:text-orange-400 text-text-primary transition-colors">
                                <FiMail size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-text-primary">Quick Links</h3>
                        <ul className="space-y-4 text-sm text-text-secondary">
                            <li>
                                <Link to="about" smooth="easeInOutQuart" duration={1000} className="hover:text-orange-400 cursor-pointer transition-colors block w-fit">About</Link>
                            </li>
                            <li>
                                <Link to="experience" smooth="easeInOutQuart" duration={1000} className="hover:text-orange-400 cursor-pointer transition-colors block w-fit">Experience</Link>
                            </li>
                            <li>
                                <Link to="projects" smooth="easeInOutQuart" duration={1000} className="hover:text-orange-400 cursor-pointer transition-colors block w-fit">Projects</Link>
                            </li>
                            <li>
                                <Link to="contact" smooth="easeInOutQuart" duration={1000} className="hover:text-orange-400 cursor-pointer transition-colors block w-fit">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div className="space-y-6">
                        <h3 className="text-lg font-bold text-text-primary">Contact</h3>
                        <div className="space-y-2 text-sm">
                            <p className="text-text-secondary">Have questions?</p>
                            <a href="mailto:amilafernando2004@gmail.com" className="text-orange-500 hover:text-orange-400 font-medium transition-colors block w-fit">
                                amilafernando2004@gmail.com
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-text-secondary/60">
                    <p>© {new Date().getFullYear()} Amila Fernando. All rights reserved.</p>
                    <div className="flex gap-6">
                        <span className="hover:text-gray-300 cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-gray-300 cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
