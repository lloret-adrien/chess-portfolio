
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import ChessBackground from './components/ChessBackground';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Experience from './components/Experience';
import NomadMap from './components/NomadMap';
import Mindset from './components/Mindset';
import Contact from './components/Contact';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-4 rounded-full bg-white/5 hover:bg-amber-500 border border-white/10 hover:border-amber-400 backdrop-blur-md shadow-2xl transition-all duration-500 z-50 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-6 h-6 text-white group-hover:text-black transition-colors" />
    </button>
  );
};

function App() {
  return (
    <div className="min-h-screen w-full bg-transparent text-gray-200 font-sans selection:bg-amber-500/30">
      <ChessBackground />
      
      <main className="relative z-10">
        <Hero />
        <Projects />
        <Experience />
        <NomadMap />
        <Mindset />
        <Contact />
      </main>
      
      <ScrollToTop />
    </div>
  );
}

export default App;
