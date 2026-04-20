import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import { Element, scroller } from 'react-scroll';
import { ThemeProvider } from './context/ThemeContext';

// Real page imports
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import DesignPortfolio from './pages/DesignPortfolio';
import Photography from './pages/Photography';
import Education from './pages/Education';
import Volunteering from './pages/Volunteering';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Main Scroll Configuration
const MainScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a hash in the URL (e.g., /#projects) and scroll to it
    if (location.hash) {
      const target = location.hash.replace('#', '');
      setTimeout(() => {
        scroller.scrollTo(target, {
          smooth: 'easeInOutQuart',
          duration: 1000,
          offset: -100
        });
      }, 100);
    }
  }, [location]);

  return (
    <div className="flex flex-col gap-24 md:gap-32">
      <Element name="home" className="element">
        <section id="home" className="min-h-screen flex items-center justify-center pt-2 md:pt-0">
          <Home />
        </section>
      </Element>

      <Element name="about" className="element">
        <section id="about" className="scroll-mt-24">
          <About />
        </section>
      </Element>

      <Element name="projects" className="element">
        <section id="projects" className="scroll-mt-24">
          <Projects />
        </section>
      </Element>

      <Element name="experience" className="element">
        <section id="experience" className="scroll-mt-24">
          <Education />
        </section>
      </Element>

      <Element name="volunteering" className="element">
        <section id="volunteering" className="scroll-mt-24">
          <Volunteering />
        </section>
      </Element>

      <Element name="contact" className="element">
        <section id="contact" className="scroll-mt-24 pb-20">
          <Contact />
        </section>
      </Element>
    </div>
  );
};

// Wrapper for scrolling to top on route change & refresh
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Disable browser's default scroll restoration
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // 2. Force scroll to top on every load/route change
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

import LoadingScreen from './components/LoadingScreen';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="animate"
    exit="exit"
    variants={pageVariants}
    transition={{ duration: 0.5, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

// Main Content Component handling Loading & Routing Logic
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // If the user refreshes with a hash (e.g. /#experience),
    // remove the hash so they start at the top of the page.
    if (window.location.hash) {
      navigate(window.location.pathname, { replace: true });
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      <ScrollToTop />
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><MainScroll /></PageWrapper>} />
            <Route path="/design" element={<PageWrapper><DesignPortfolio /></PageWrapper>} />
            <Route path="/photos" element={<PageWrapper><Photography /></PageWrapper>} />
            <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;
