
import React, { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Keep observing if you want it to re-animate or disconnect to animate only once.
          // Disconnecting is standard for "reveal" animations.
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-32 px-4 border-t border-white/5 bg-transparent relative overflow-hidden backdrop-blur-sm"
    >
       {/* Background glow for footer area */}
      <div className={`absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-amber-900/20 to-transparent pointer-events-none transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="overflow-hidden mb-8">
            <h2 className={`font-serif text-5xl md:text-7xl text-white transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                Ready to make your<br/>next move?
            </h2>
        </div>
        
        <p className={`text-gray-400 mb-12 text-lg max-w-2xl mx-auto transition-all duration-1000 delay-200 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          Let's discuss how we can transform your vision into a winning strategy.
        </p>
        
        <div className={`transition-all duration-700 delay-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] transform ${isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
            <a 
                href="mailto:lloret.ad@gmail.com" 
                className="inline-flex items-center gap-3 bg-amber-500 text-black px-12 py-5 rounded-full text-lg font-bold border-b-[6px] border-amber-700 hover:bg-amber-400 hover:border-amber-600 active:border-b-0 active:translate-y-[6px] transition-all duration-75 mb-12"
            >
                <Mail className="w-5 h-5" />
                Start a Project
            </a>
        </div>

        <div className={`text-gray-600 text-sm tracking-wide transition-opacity duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            © 2024 ADRIEN LLORET. ALL RIGHTS RESERVED.
        </div>
      </div>
    </section>
  );
};

export default Contact;
