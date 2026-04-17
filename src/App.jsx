import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import { Element, scroller } from 'react-scroll';

// Real page imports
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import DesignPortfolio from './pages/DesignPortfolio';
import Photography from './pages/Photography';
import Education from './pages/Education';
import Volunteering from './pages/Volunteering';
import Contact from './pages/Contact';

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

// Main Content Component handling Loading & Routing Logic
const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<MainScroll />} />
          <Route path="/design" element={<DesignPortfolio />} />
          <Route path="/photos" element={<Photography />} />
        </Routes>
      </Layout>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
