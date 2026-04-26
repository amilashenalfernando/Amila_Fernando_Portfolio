import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scroller } from 'react-scroll';
import { FiCode, FiPenTool, FiCamera, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';

// ── Inline SVG Tech Icons ──────────────────────────────────────────────────
const ReactIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="-11.5 -10.23174 23 20.46348" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/><ellipse rx="11" ry="4.2" transform="rotate(60)"/><ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);
const JavascriptIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 630 630" xmlns="http://www.w3.org/2000/svg">
    <rect width="630" height="630" fill="#f7df1e"/>
    <path d="m423.2 492.19c12.69 20.72 29.2 35.95 58.4 35.95 24.53 0 40.2-12.26 40.2-29.2 0-20.3-16.1-27.49-43.1-39.3l-14.8-6.35c-42.72-18.2-71.1-41-71.1-89.2 0-44.4 33.83-78.2 86.7-78.2 37.64 0 64.7 13.1 84.2 47.4l-46.1 29.6c-10.15-18.2-21.1-25.37-38.1-25.37-17.34 0-28.33 11-28.33 25.37 0 17.76 11 24.95 36.4 35.95l14.8 6.34c50.3 21.57 78.7 43.56 78.7 93 0 53.3-41.87 82.5-98.1 82.5-54.98 0-90.5-26.2-107.88-60.54zm-209.13 5.13c9.3 16.5 17.76 30.45 38.1 30.45 19.45 0 31.72-7.61 31.72-37.2v-201.3h59.2v202.1c0 61.3-35.94 89.2-88.4 89.2-47.4 0-74.85-24.53-88.81-54.075z"/>
  </svg>
);
const PythonIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg">
    <path fill="#366994" d="M55,5c-13,0-24,2-24,15v10h24v4H25C13,34,5,43,5,55s8,21,20,21h10v-12c0-13,11-24,25-24h20c11,0,20-9,20-20V20C100,8,88,5,55,5z M43,17c3,0,5,2,5,5s-2,5-5,5s-5-2-5-5S40,17,43,17z"/>
    <path fill="#ffc331" d="M55,105c13,0,24-2,24-15V80H55v-4h30c12,0,20-9,20-21s-8-21-20-21H75v12c0,13-11,24-25,24H30c-11,0-20,9-20,20v15C10,103,22,105,55,105z M67,93c-3,0-5-2-5-5s2-5,5-5s5,2,5,5S70,93,67,93z"/>
  </svg>
);
const AdobePhotoshopIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
    <path d="M42.5,0h155C221,0,240,19,240,42.5v149c0,23.5-19,42.5-42.5,42.5h-155C19,234,0,215,0,191.5v-149C0,19,19,0,42.5,0z" fill="#001E36"/>
    <path d="M54,164.1V61.2c0-0.7,0.3-1.1,1-1.1c1.7,0,3.3,0,5.6-0.1c2.4-0.1,4.9-0.1,7.6-0.2c2.7-0.1,5.6-0.1,8.7-0.2c3.1-0.1,6.1-0.1,9.1-0.1c8.2,0,15,1,20.6,3.1c5,1.7,9.6,4.5,13.4,8.2c3.2,3.2,5.7,7.1,7.3,11.4c1.5,4.2,2.3,8.5,2.3,13c0,8.6-2,15.7-6,21.3c-4,5.6-9.6,9.8-16.1,12.2c-6.8,2.5-14.3,3.4-22.5,3.4c-2.4,0-4,0-5-0.1c-1-0.1-2.4-0.1-4.3-0.1v32.1c0.1,0.7-0.4,1.3-1.1,1.4c-0.1,0-0.2,0-0.4,0H55.2C54.4,165.4,54,165,54,164.1z M75.8,79.4V113c1.4,0.1,2.7,0.2,3.9,0.2H85c3.9,0,7.8-0.6,11.5-1.8c3.2-0.9,6-2.8,8.2-5.3c2.1-2.5,3.1-5.9,3.1-10.3c0.1-3.1-0.7-6.2-2.3-8.9c-1.7-2.6-4.1-4.6-7-5.7c-3.7-1.5-7.7-2.1-11.8-2c-2.6,0-4.9,0-6.8,0.1C77.9,79.2,76.5,79.3,75.8,79.4z" fill="#31A8FF"/>
    <path d="M192,106.9c-3-1.6-6.2-2.7-9.6-3.4c-3.7-0.8-7.4-1.3-11.2-1.3c-2-0.1-4.1,0.2-6,0.7c-1.3,0.3-2.4,1-3.1,2c-0.5,0.8-0.8,1.8-0.8,2.7c0,0.9,0.4,1.8,1,2.6c0.9,1.1,2.1,2,3.4,2.7c2.3,1.2,4.7,2.3,7.1,3.3c5.4,1.8,10.6,4.3,15.4,7.3c3.3,2.1,6,4.9,7.9,8.3c1.6,3.2,2.4,6.7,2.3,10.3c0.1,4.7-1.3,9.4-3.9,13.3c-2.8,4-6.7,7.1-11.2,8.9c-4.9,2.1-10.9,3.2-18.1,3.2c-4.6,0-9.1-0.4-13.6-1.3c-3.5-0.6-7-1.7-10.2-3.2c-0.7-0.4-1.2-1.1-1.1-1.9v-17.4c0-0.3,0.1-0.7,0.4-0.9c0.3-0.2,0.6-0.1,0.9,0.1c3.9,2.3,8,3.9,12.4,4.9c3.8,1,7.8,1.5,11.8,1.5c3.8,0,6.5-0.5,8.3-1.4c1.6-0.7,2.7-2.4,2.7-4.2c0-1.4-0.8-2.7-2.4-4c-1.6-1.3-4.9-2.8-9.8-4.7c-5.1-1.8-9.8-4.2-14.2-7.2c-3.1-2.2-5.7-5.1-7.6-8.5c-1.6-3.2-2.4-6.7-2.3-10.2c0-4.3,1.2-8.4,3.4-12.1c2.5-4,6.2-7.2,10.5-9.2c4.7-2.4,10.6-3.5,17.7-3.5c4.1,0,8.3,0.3,12.4,0.9c3,0.4,5.9,1.2,8.6,2.3c0.4,0.1,0.8,0.5,1,0.9c0.1,0.4,0.2,0.8,0.2,1.2v16.3c0,0.4-0.2,0.8-0.5,1C192.9,107.1,192.4,107.1,192,106.9z" fill="#31A8FF"/>
  </svg>
);
const AdobePremierProIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 240 234" xmlns="http://www.w3.org/2000/svg">
    <path d="M42.5,0h155C221,0,240,19,240,42.5v149c0,23.5-19,42.5-42.5,42.5h-155C19,234,0,215,0,191.5v-149C0,19,19,0,42.5,0z" fill="#00005B"/>
    <path d="m57 164v-103c0-0.7 0.3-1.1 1-1.1 1.7 0 3.3 0 5.6-0.1 2.4-0.1 4.9-0.1 7.6-0.2s5.6-0.1 8.7-0.2 6.1-0.1 9.1-0.1c8.2 0 15 1 20.6 3.1 5 1.7 9.6 4.5 13.4 8.2 3.2 3.2 5.7 7.1 7.3 11.4 1.5 4.2 2.3 8.5 2.3 13 0 8.6-2 15.7-6 21.3s-9.6 9.8-16.1 12.2c-6.8 2.5-14.3 3.4-22.5 3.4-2.4 0-4 0-5-0.1s-2.4-0.1-4.3-0.1v32.1c0.1 0.7-0.4 1.3-1.1 1.4h-0.4-19c-0.8 0-1.2-0.4-1.2-1.3zm21.8-84.7v33.6c1.4 0.1 2.7 0.2 3.9 0.2h5.3c3.9 0 7.8-0.6 11.5-1.8 3.2-0.9 6-2.8 8.2-5.3 2.1-2.5 3.1-5.9 3.1-10.3 0.1-3.1-0.7-6.2-2.3-8.9-1.7-2.6-4.1-4.6-7-5.7-3.7-1.5-7.7-2.1-11.8-2-2.6 0-4.9 0-6.8 0.1-2-0.1-3.4 0-4.1 0.1z" fill="#9999FF"/>
    <path d="m147 85.2h17.5c1 0 1.8 0.7 2.1 1.6 0.3 0.8 0.5 1.6 0.6 2.5 0.2 1 0.4 2.1 0.5 3.1 0.1 1.1 0.2 2.3 0.2 3.6 3-3.5 6.6-6.4 10.7-8.6 4.6-2.6 9.9-3.9 15.2-3.9 0.7-0.1 1.3 0.4 1.4 1.1v0.4 19.5c0 0.8-0.5 1.1-1.6 1.1-3.6-0.1-7.3 0.2-10.8 1-2.9 0.6-5.7 1.5-8.4 2.7-1.9 0.9-3.7 2.1-5.1 3.7v51c0 1-0.4 1.4-1.3 1.4h-19.7c-0.8 0.1-1.5-0.4-1.6-1.2v-0.4-55.4c0-2.4 0-4.9-0.1-7.5s-0.1-5.2-0.2-7.8c0-2.3-0.2-4.5-0.4-6.8-0.1-0.5 0.2-1 0.7-1.1 0-0.1 0.2-0.1 0.3 0z" fill="#9999FF"/>
  </svg>
);
const AdobeLightroomIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 122.88 119.81" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.76,0h79.36c12.03,0,21.76,9.73,21.76,21.76v76.3c0,12.03-9.73,21.76-21.76,21.76H21.76C9.73,119.81,0,110.08,0,98.05v-76.3C0,9.73,9.73,0,21.76,0z" fill="#001E36"/>
    <path d="M64.51,84.68H32.06c-0.58,0-0.81-0.29-0.81-0.91V31.44c-0.05-0.33,0.19-0.67,0.58-0.72c0.05,0,0.1,0,0.19,0h10.02c0.24-0.05,0.58,0.14,0.58,0.43c0,0.05,0,0.1,0,0.14v42.99h23.67c0.53,0,0.67,0.24,0.58,0.72l-1.49,8.91c0,0.24-0.14,0.48-0.29,0.62C64.89,84.64,64.7,84.68,64.51,84.68z" fill="#31A8FF"/>
    <path d="M72.7,43.71h8.96c0.53,0,0.91,0.34,1.05,0.81c0.19,0.34,0.34,0.77,0.43,1.2c0.1,0.53,0.19,1.05,0.24,1.58c0.05,0.58,0.1,1.2,0.1,1.82c1.53-1.77,3.4-3.26,5.46-4.41c2.35-1.29,4.98-1.92,7.62-1.82c0.34-0.05,0.67,0.19,0.72,0.57c0,0.05,0,0.1,0,0.19v10.02c0,0.43-0.24,0.58-0.81,0.58c-3.31-0.19-6.66,0.43-9.68,1.73c-1.01,0.48-2.01,1.05-2.78,1.92v26.12c0,0.53-0.19,0.72-0.67,0.72h-9.97c-0.43,0.05-0.77-0.19-0.81-0.62c0-0.05,0-0.14,0-0.19V55.54c0-1.25,0-2.49-0.05-3.83c-0.05-1.34-0.05-2.68-0.1-3.98c-0.05-1.15-0.14-2.25-0.29-3.4c-0.05-0.24,0.1-0.53,0.34-0.58C72.56,43.66,72.61,43.66,72.7,43.71z" fill="#31A8FF"/>
  </svg>
);
const AdobeIllustratorIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 250 250" xmlns="http://www.w3.org/2000/svg">
    <rect width="250" height="250" rx="42.74" ry="42.74" fill="#330000"/>
    <path d="M122.11,66.15h-37.41l-42.97,115.62h33.48l5.58-17.27h42.98l5.58,17.27h34.5l-41.73-115.62ZM102.27,135.65h-12.17l12.17-37.69,12.17,37.69h-12.17Z" fill="#ff9a00"/>
    <rect x="168.12" y="90.74" width="30.98" height="91.03" fill="#ff9a00"/>
    <path d="M200.12,74.28c.09,8.49-6.78,14.49-16.5,14.41-9.73.08-16.59-5.92-16.5-14.41-.09-8.49,6.78-14.49,16.5-14.41,9.73-.08,16.59,5.92,16.5,14.41Z" fill="#ff9a00"/>
  </svg>
);
const FigmaIcon = ({ size = "1em" }) => (
  <svg width={size} height={size} viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 300c27.6 0 50-22.4 50-50v-50H50c-27.6 0-50 22.4-50 50s22.4 50 50 50z" fill="#0acf83"/>
    <path d="M0 150c0-27.6 22.4-50 50-50h50v100H50c-27.6 0-50-22.4-50-50z" fill="#a259ff"/>
    <path d="M0 50C0 22.4 22.4 0 50 0h50v100H50C22.4 100 0 77.6 0 50z" fill="#f24e1e"/>
    <path d="M100 0h50c27.6 0 50 22.4 50 50s-22.4 50-50 50h-50V0z" fill="#ff7262"/>
    <path d="M200 150c0 27.6-22.4 50-50 50s-50-22.4-50-50 22.4-50 50-50 50 22.4 50 50z" fill="#1abcfe"/>
  </svg>
);

const tools = [
  { name: "React", icon: <ReactIcon size="1em" /> },
  { name: "JavaScript", icon: <JavascriptIcon size="1em" /> },
  { name: "Python", icon: <PythonIcon size="1em" /> },
  { name: "Photoshop", icon: <AdobePhotoshopIcon size="1em" /> },
  { name: "Premiere Pro", icon: <AdobePremierProIcon size="1em" /> },
  { name: "Figma", icon: <FigmaIcon size="1em" /> },
  { name: "Illustrator", icon: <AdobeIllustratorIcon size="1em" /> },
  { name: "Lightroom", icon: <AdobeLightroomIcon size="1em" /> },
];

const skills = [
    {
        category: "Software Engineering",
        icon: FiCode,
        desc: "Building high-performance web solutions with modern frameworks and clean architecture.",
        items: ["React.js", "JavaScript", "Python", "Java", "Node.js", "SQL"],
        link: () => scroller.scrollTo('projects', { smooth: true, duration: 500, offset: -100 }),
    },
    {
        category: "Graphic Design",
        icon: FiPenTool,
        desc: "Creating bold visual identities and digital experiences that communicate and convert.",
        items: ["Adobe Photoshop", "Premiere Pro", "Figma", "UI/UX Design", "Illustrator"],
        link: (navigate) => navigate('/design'),
    },
    {
        category: "Photography",
        icon: FiCamera,
        desc: "Capturing raw emotion and cinematic moments through an artistic lens.",
        items: ["Portrait", "Event Photography", "Landscape", "Product Photography"],
        link: (navigate) => navigate('/photos'),
    },
];

const About = () => {
    const { isDarkMode } = useTheme();
    const navigate = useNavigate();
    const [activeTool, setActiveTool] = useState(null);

    return (
        <div className="w-full max-w-6xl mx-auto pt-16 px-4 pb-24">

            {/* ── Page Title ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-16 text-center"
            >
                <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Discover</span>
                <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Me</span>
                </h1>
            </motion.div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-28">
                {/* Profile Image */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    className="lg:col-span-1 h-full"
                >
                    <div className="relative w-full h-full min-h-[420px] rounded-3xl overflow-hidden border border-[var(--glass-border)] shadow-xl group">
                        <img
                            src="/My/IMG_9738.JPG"
                            alt="Amila Fernando"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    </div>
                </motion.div>

                {/* Bio Cards */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                        className="glass-card p-8 rounded-3xl border border-[var(--glass-border)] relative overflow-hidden flex-1"
                    >
                        <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
                        <span className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3 block">The Story</span>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">The story behind the work</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                            My background in <span className="text-orange-500 font-medium">Software Engineering</span> provides a structured, data-driven approach to problem-solving — building high-performance web solutions and exploring the latest in tech.
                        </p>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            As a <span className="text-orange-500 font-medium">Graphic Designer</span> and <span className="text-orange-500 font-medium">Photographer</span>, I bridge the gap between complex engineering and user-centric design — creating experiences that are intuitive, accessible, and visually stunning.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.7 }}
                        className="glass-card p-8 rounded-3xl border border-[var(--glass-border)] relative overflow-hidden flex-1"
                    >
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
                        <span className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3 block">My Vision</span>
                        <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Technology meets creativity</h3>
                        <p className="text-[var(--text-secondary)] leading-relaxed">
                            I envision a future where technology and creativity are inseparable. I aim to architect full‑stack solutions defined by clean code and exceptional visual storytelling — building digital products that feel as <span className="text-orange-500 font-medium">natural to use</span> as they are <span className="text-orange-500 font-medium">inspiring to look at</span>.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* ══════════════════════════════════════════
                SECTION 2 — MY SKILLSET
            ══════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="mb-6 text-center"
            >
                <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">What I Do</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Skillset</span>
                </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-28">
                {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12, duration: 0.6 }}
                            onClick={() => skill.link(navigate)}
                            className="group glass-card p-7 rounded-3xl border border-[var(--glass-border)] cursor-pointer hover:border-orange-500/40 transition-all hover:-translate-y-1 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-red-500/0 group-hover:from-orange-500/8 group-hover:to-red-500/8 transition-all duration-500 rounded-3xl" />
                            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-5 group-hover:bg-orange-500 group-hover:border-orange-500 transition-all">
                                <Icon size={20} className="text-orange-500 group-hover:text-white transition-colors" />
                            </div>
                            <h4 className="text-lg font-bold text-[var(--text-primary)] mb-2 group-hover:text-orange-500 transition-colors">{skill.category}</h4>
                            <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">{skill.desc}</p>
                            <div className="flex flex-wrap gap-2">
                                {skill.items.map((item, idx) => (
                                    <span key={idx} className="px-3 py-1 bg-[var(--glass-bg)] rounded-full text-xs text-[var(--text-secondary)] border border-[var(--glass-border)] group-hover:border-orange-500/30 group-hover:text-[var(--text-primary)] transition-all">
                                        {item}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-5 flex items-center gap-1.5 text-orange-500 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                View Work <FiArrowRight size={12} />
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ══════════════════════════════════════════
                SECTION 3 — MY TOOLKIT
            ══════════════════════════════════════════ */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="mb-10 text-center"
            >
                <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Tech Stack</span>
                <h2 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)]">
                    My <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Toolkit</span>
                </h2>
            </motion.div>

            <div className="w-screen relative left-1/2 right-1/2 -translate-x-1/2 overflow-hidden py-10 bg-[var(--glass-bg)] backdrop-blur-sm border-y border-[var(--glass-border)]">
                <div className="flex w-max">
                    {[0, 1].map((loop) => (
                        <motion.div
                            key={loop}
                            className="flex gap-16 pr-16"
                            animate={{ x: ["0%", "-100%"] }}
                            transition={{ repeat: Infinity, duration: 50, ease: "linear" }}
                        >
                            {[...tools, ...tools].map((tool, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-3 min-w-[90px] group cursor-pointer"
                                    onClick={() => setActiveTool(activeTool === tool.name ? null : tool.name)}
                                >
                                    <div className={`flex items-center justify-center h-20 text-5xl transition-all duration-300 filter
                                        ${activeTool === tool.name
                                            ? 'grayscale-0 opacity-100 scale-110'
                                            : 'grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110'}`}>
                                        {tool.icon}
                                    </div>
                                    <span className={`text-sm font-semibold transition-colors
                                        ${activeTool === tool.name
                                            ? 'text-orange-500'
                                            : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                                        {tool.name}
                                    </span>
                                </div>
                            ))}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;
