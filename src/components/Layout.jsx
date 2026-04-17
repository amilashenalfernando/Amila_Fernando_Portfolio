import React from 'react';
import Navbar from './Navbar';
import AnimatedBackground from './AnimatedBackground';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';

const Layout = ({ children, onShowDesign, onShowPhotography }) => {
    return (
        <div className="relative min-h-screen text-white font-sans">
            <AnimatedBackground />
            <Navbar onShowDesign={onShowDesign} onShowPhotography={onShowPhotography} />

            <main className="pt-24 px-4 pb-12 max-w-7xl mx-auto min-h-[calc(100vh-100px)]">
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;
