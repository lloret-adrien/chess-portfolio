
import React, { useEffect, useRef, useState } from 'react';

const Mindset: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-4 bg-transparent text-center relative overflow-hidden">
        {/* Decorative large piece */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-serif select-none pointer-events-none transition-all duration-1000 ${isVisible ? 'opacity-[0.05] scale-100' : 'opacity-0 scale-90'}`}>
            ♔
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
            <div className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}>
                <h3 className="text-amber-500 font-medium tracking-[0.3em] uppercase text-sm mb-6">The Philosophy</h3>
            </div>
            
            <div className={`transition-all duration-1000 delay-300 ease-out ${isVisible ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-lg scale-95'}`}>
                <p className="font-serif text-3xl md:text-5xl text-white leading-tight mb-8">
                    "I approach every product like a chess game: <span className="text-gray-500 transition-colors duration-500 hover:text-amber-400">anticipation</span>, <span className="text-gray-500 transition-colors duration-500 hover:text-amber-400">precision</span> and <span className="text-gray-500 transition-colors duration-500 hover:text-amber-400">long-term vision</span>."
                </p>
            </div>

            <div className={`w-24 h-1 bg-amber-500 mx-auto rounded-full transition-all duration-1000 delay-700 ease-out ${isVisible ? 'width-24 opacity-100' : 'w-0 opacity-0'}`}></div>
        </div>
    </section>
  );
};

export default Mindset;
