import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = () => {
    const fullText = "Amila Fernando";
    const [text, setText] = useState("");

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setText(fullText.slice(0, index + 1));
            index++;
            if (index === fullText.length) {
                clearInterval(intervalId);
            }
        }, 150); // Typing speed

        return () => clearInterval(intervalId);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
        >
            <div className="relative text-4xl md:text-6xl font-mono font-bold tracking-tighter cursor-default">
                {/* Render typed text with logic for colors */}
                {text.split("").map((char, i) => (
                    <span
                        key={i}
                        className={i >= 6 ? "text-orange-500" : "text-white"}
                    >
                        {char}
                    </span>
                ))}

                {/* Moving Blinking Cursor - Appears right after the last typed character */}
                <motion.span
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                    className="inline-block w-3 h-8 md:h-12 bg-orange-500 ml-1 align-middle"
                />

                {/* Subtext with animated dots */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2, duration: 0.5 }}
                    className="absolute -bottom-8 left-0 right-0 text-center text-gray-500 font-mono text-xs md:text-sm"
                >
                    &gt; Initializing
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
                    >.</motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, times: [0, 0.5, 1] }}
                    >.</motion.span>
                    <motion.span
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.5, delay: 0.4, repeat: Infinity, times: [0, 0.5, 1] }}
                    >.</motion.span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default LoadingScreen;
