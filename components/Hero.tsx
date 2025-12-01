
import React, { useEffect, useState } from 'react';
import { ChevronRight, User } from 'lucide-react';

const Hero: React.FC = () => {
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    setReveal(true);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative px-4 pt-20 pb-32">
      <div className="max-w-5xl w-full text-center z-10">
        
        {/* Top Badge */}
        <div className={`inline-block px-6 py-2 rounded-full glass-panel mb-12 transition-all duration-1000 delay-100 transform ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
          <span className="flex items-center gap-2 text-sm text-gray-300 tracking-widest uppercase">
            <span className="block rounded-full w-2 h-2 bg-green-500 animate-pulse"></span>
            <span className="absolute block rounded-full w-2 h-2 bg-green-500 animate-ping"></span>
            Available
          </span>
        </div>

        {/* Name Title - "Chess Board Reveal" Simulation */}
        <div className="relative mb-6">
          <h1 className={`font-serif text-6xl md:text-8xl lg:text-9xl text-white tracking-tight transition-all duration-1000 ${reveal ? 'opacity-100 blur-0' : 'opacity-0 blur-lg'}`}>
            ADRIEN LLORET
          </h1>
          <h2 className={`font-serif text-2xl md:text-4xl text-gray-400 mt-4 tracking-wide transition-all duration-1000 delay-300 ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            FULL-STACK WEB DEVELOPER & PRODUCT BUILDER
          </h2>
        </div>

        {/* Tagline */}
        <p className={`max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-12 leading-relaxed transition-all duration-1000 delay-500 ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Crafting robust digital experiences with the precision of a grandmaster. 
          Every line of code is a calculated move towards your success.
        </p>

        {/* CTAs - Chess.com Style Push Buttons */}
        <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-1000 delay-700 ${reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a 
            href="#projects" 
            className="group relative bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 border-b-[6px] border-gray-400 hover:border-gray-500 hover:bg-gray-100 active:border-b-0 active:translate-y-[6px] transition-all duration-75"
          >
            View Projects
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a 
            href="https://www.linkedin.com/in/adrien-lloret-592213194/" 
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-[#262522] text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 border-b-[6px] border-black hover:bg-[#3a3936] active:border-b-0 active:translate-y-[6px] transition-all duration-75"
          >
            About Me
            <User className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Start Game Decorative Element - Fixed & Animated Line */}
      <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 transition-opacity duration-1000 delay-1000 ${reveal ? 'opacity-70' : 'opacity-0'}`}>
        <div className="flex flex-col items-center gap-4 mt-12">
          <span className="text-xs tracking-[0.3em] text-gray-400 uppercase">Start Game</span>
          <div className="w-[1px] h-16 bg-gray-800 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-gray-400 animate-scroll-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
