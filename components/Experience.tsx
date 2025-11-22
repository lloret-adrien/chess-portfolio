
import React, { useEffect, useRef, useState } from 'react';
import { EXPERIENCE } from '../constants';
import { GraduationCap, Briefcase } from 'lucide-react';

const Experience: React.FC = () => {
  // Oldest first (Top to Bottom)
  const chronologicExperience = [...EXPERIENCE].reverse();
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(0);
  const [itemOffsets, setItemOffsets] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Calculate the offsets of the items relative to the container
  // to know when the line hits them
  useEffect(() => {
    const calculateOffsets = () => {
      if (!containerRef.current) return;
      
      const offsets = itemRefs.current.map(el => {
        if (!el) return 0;
        // Fix: Calculate offset based on the ICON position (top-0, height 48px), not the item center.
        // The icon is 48px (h-12), so its center is at 24px from the top of the item.
        // This ensures the item activates when the line hits the icon, even if the text is very tall on mobile.
        return el.offsetTop + 24; 
      });
      setItemOffsets(offsets);
    };

    // Recalculate on resize and initial load
    calculateOffsets();
    window.addEventListener('resize', calculateOffsets);
    
    // Small delay to ensure layout is settled
    const timeout = setTimeout(calculateOffsets, 100);

    return () => {
      window.removeEventListener('resize', calculateOffsets);
      clearTimeout(timeout);
    };
  }, []);

  // Scroll listener to drive the line height
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return; // Prevent multiple RAF calls

      rafId = requestAnimationFrame(() => {
        if (!containerRef.current) {
          rafId = null;
          return;
        }

        const viewportHeight = window.innerHeight;
        // Trigger slightly below center (55%) to make elements appear a bit earlier on scroll
        const triggerPoint = viewportHeight * 0.55;

        const container = containerRef.current;
        const rect = container.getBoundingClientRect();

        // Calculate position of the "pen" inside the container
        // rect.top is distance from viewport top to container top
        // We want the distance from container top to trigger point
        const relativeY = triggerPoint - rect.top;

        // Clamp the height between 0 and the full height of container
        const clampedHeight = Math.max(0, Math.min(rect.height, relativeY));

        setLineHeight(clampedHeight);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section id="experience" className="py-32 px-4 relative min-h-[100vh]">
      <div className="max-w-4xl mx-auto">
        <h3 className="font-serif text-4xl md:text-5xl text-center mb-24 text-white">Strategy Map</h3>

        <div className="relative" ref={containerRef}>
          
          {/* The Timeline Track (Background) */}
          {/* Mobile: Left aligned with indentation (left-8). Desktop: Centered (left-1/2) */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 transform -translate-x-1/2 rounded-full" />
          
          {/* The Timeline Thread (Foreground - Dynamic) */}
          <div
            className="absolute left-8 md:left-1/2 top-0 w-[2px] bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transform -translate-x-1/2 rounded-full z-10"
            style={{ height: `${lineHeight}px` }}
          />

          <div className="space-y-24 pb-24">
            {chronologicExperience.map((item, index) => {
              const isLeft = index % 2 === 0;
              // Use the pre-calculated offset based on icon center
              const itemTriggerPoint = itemOffsets[index] || (index * 200 + 100); 
              // Is the line past this item?
              const isActive = lineHeight >= itemTriggerPoint;

              return (
                <div 
                  key={item.id} 
                  ref={el => itemRefs.current[index] = el}
                  className={`relative flex flex-col md:flex-row gap-0 md:gap-8 ${isLeft ? 'md:flex-row-reverse' : ''} items-start md:items-start`}
                >
                  
                  {/* Central Icon */}
                  {/* Mobile: left-8 to match line. Desktop: left-1/2 centered */}
                  <div className="absolute left-8 md:left-1/2 top-0 transform -translate-x-1/2 md:-translate-x-1/2 flex flex-col items-center z-20">
                    <div 
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-700 ease-out bg-[#050505]
                        ${isActive 
                          ? 'bg-white border-white text-black scale-110 shadow-[0_0_20px_rgba(255,255,255,0.4)]' 
                          : 'border-gray-800 text-gray-600 scale-100'
                        }
                      `}
                    >
                      {item.type === 'work' ? <Briefcase size={20} /> : <GraduationCap size={20} />}
                    </div>
                  </div>

                  {/* Content Card */}
                  {/* Mobile: pl-20 to clear the icon on the left. Desktop: reset padding and handle sides */}
                  <div 
                    className={`w-full md:w-[calc(50%-3rem)] pl-20 md:pl-0 ${isLeft ? 'md:text-right' : 'md:text-left'} transition-all duration-700 ease-out
                      ${isActive ? 'opacity-100 translate-y-0 blur-0' : 'opacity-10 translate-y-8 blur-[2px]'}
                    `}
                  >
                     <span 
                       className={`inline-block py-1 px-3 rounded text-xs mb-2 border transition-colors duration-500
                         ${isActive 
                           ? 'bg-white text-black border-white font-bold' 
                           : 'bg-white/5 text-gray-500 border-white/5'
                         }
                       `}
                     >
                        {item.year}
                      </span>
                    <h4 className={`text-2xl font-bold mb-2 transition-colors duration-500 ${isActive ? 'text-white' : 'text-gray-600'}`}>
                      {item.title}
                    </h4>
                    <p className={`text-sm font-bold tracking-widest uppercase mb-4 transition-colors duration-500 ${isActive ? 'text-amber-400' : 'text-gray-700'}`}>
                      {item.subtitle}
                    </p>
                    <p className={`text-base leading-relaxed transition-colors duration-500 ${isActive ? 'text-gray-300' : 'text-gray-800'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
