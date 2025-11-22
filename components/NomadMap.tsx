
import React, { useState, useMemo } from 'react';
import { Globe, MapPin, ExternalLink } from 'lucide-react';

// Updated locations for better geographical accuracy on 20x40 grid
const LOCATION_DATA: Record<string, string> = {
    // North America
    "5,6": "USA",
    "5,8": "USA (Client)",
    "7,6": "Mexico",
    "8,9": "Guadeloupe",
    
    // Central/South America
    "9,8": "Nicaragua",
    "10,9": "Costa Rica",
    "11,10": "Colombia",
    "15,10": "Argentina",

    // Europe
    "5,19": "United Kingdom (Client)", 
    "6,20": "France (Home)",
    "6,19": "Spain",
    "6,18": "Portugal",
    "6,21": "Italy",
    "3,21": "Sweden (Client)",
    "5,22": "Austria (Client)",
    "6,22": "Croatia (Client)",

    // Africa / Middle East
    "7,18": "Morocco",
    "8,17": "Canary Islands",
    "7,23": "Jordan",
    "15,21": "South Africa",

    // Asia
    "9,29": "India (Client)",

    // Oceania
    "14,35": "French Polynesia",
};

const NomadMap: React.FC = () => {
  const [hoveredDot, setHoveredDot] = useState<{r: number, c: number, name: string} | null>(null);

  const rows = 20;
  const cols = 40;

  // Generate the grid once to maintain stable random values for visual texture
  const grid = useMemo(() => {
    const isLand = (r: number, c: number) => {
        // Approximate world map shape
        if (r >= 2 && r <= 8 && c >= 3 && c <= 12) return true; // North America
        if (r >= 9 && r <= 16 && c >= 8 && c <= 12) return true; // South America
        if (r >= 3 && r <= 7 && c >= 18 && c <= 24) return true; // Europe
        if (r >= 8 && r <= 15 && c >= 17 && c <= 24) return true; // Africa
        if (r >= 3 && r <= 11 && c >= 25 && c <= 35) return true; // Asia
        if (r >= 13 && r <= 16 && c >= 30 && c <= 36) return true; // Oceania
        return false;
    };

    const isLocationType = (r: number, c: number, type: 'visited' | 'client' | 'home') => {
        const key = `${r},${c}`;
        const name = LOCATION_DATA[key];
        if (!name) return false;

        if (type === 'home') return name.includes('Home');
        if (type === 'client') return name.includes('Client');
        if (type === 'visited') return !name.includes('Home') && !name.includes('Client');
        return false;
    };

    const newGrid = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        let type = 'ocean';
        let isCoast = false;
        
        // Check base terrain
        if (isLand(r, c)) {
            type = 'land';
            // Simple coastline detection: if any neighbor is not land
            if (!isLand(r+1, c) || !isLand(r-1, c) || !isLand(r, c+1) || !isLand(r, c-1)) {
                isCoast = true;
            }
        }
        
        // Check specific locations (Overrides terrain)
        if (isLocationType(r, c, 'visited')) type = 'visited';
        if (isLocationType(r, c, 'client')) type = 'client';
        if (isLocationType(r, c, 'home')) type = 'home';

        // Visual properties
        // "Ocean Currents": Delay based on column + random variance creates a flowing wave effect
        const waveDelay = (c * 0.1) + (r * 0.05) + (Math.random() * 0.5);
        
        // "Topography": Random opacity for land to simulate texture/height
        const elevation = 0.3 + Math.random() * 0.3; 

        newGrid.push({ r, c, type, isCoast, waveDelay, elevation });
      }
    }
    return newGrid;
  }, []);

  return (
    <section className="py-20 px-4 relative bg-transparent">
      <style>{`
        @keyframes ocean-pulse {
          0%, 100% { opacity: 0.05; transform: scale(0.5); }
          50% { opacity: 0.15; transform: scale(1); }
        }
        @keyframes tooltip-bounce {
          0% { opacity: 0; transform: translate(-50%, -110%) scale(0.9); }
          100% { opacity: 1; transform: translate(-50%, -130%) scale(1); }
        }
        .animate-ocean {
          animation: ocean-pulse 4s ease-in-out infinite;
        }
        .animate-tooltip {
          animation: tooltip-bounce 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
            <h3 className="font-serif text-4xl text-white mb-4">Global Strategy</h3>
            <p className="text-gray-400">Digital Nomad Journey & International Collaborations</p>
        </div>

        {/* Map Container - Darkened for global style matching */}
        <div className="bg-[#0a0a0a] p-4 md:p-8 rounded-3xl border border-white/10 relative shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-3xl" />
            
            <div className="relative w-full aspect-[2/1]">
                {/* Grid */}
                <div className="grid grid-cols-[repeat(40,1fr)] w-full h-full">
                    {grid.map((dot, i) => {
                        const locationKey = `${dot.r},${dot.c}`;
                        const locationName = LOCATION_DATA[locationKey];
                        
                        // Dynamic styling
                        let dotStyle = {};
                        let className = `rounded-full transition-all duration-300 `;
                        let isInteractive = false;

                        if (dot.type === 'ocean') {
                            className += `w-1 h-1 bg-blue-900/20 animate-ocean`;
                            dotStyle = { animationDelay: `${dot.waveDelay}s` };
                        } else if (dot.type === 'land') {
                            // Darker land color
                            className += `w-1.5 h-1.5 md:w-2 md:h-2 bg-[#2a2a2a]`;
                            const opacity = dot.isCoast ? 0.6 : dot.elevation;
                            dotStyle = { opacity };
                        } else if (dot.type === 'visited') {
                            className += `w-1.5 h-1.5 md:w-2 md:h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] scale-125 z-10`;
                            isInteractive = true;
                        } else if (dot.type === 'client') {
                            className += `w-1.5 h-1.5 md:w-2 md:h-2 bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)] scale-125 z-10`;
                            isInteractive = true;
                        } else if (dot.type === 'home') {
                            className += `w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] scale-150 z-20`;
                            isInteractive = true;
                        }

                        // Interactive hover effects
                        if (isInteractive) {
                            className += ` cursor-pointer hover:scale-[2.5] hover:z-30`;
                        }

                        return (
                            <div 
                                key={i} 
                                className="relative flex items-center justify-center w-full h-full"
                                onMouseEnter={() => {
                                    if (locationName) {
                                        setHoveredDot({ r: dot.r, c: dot.c, name: locationName });
                                    }
                                }}
                                onMouseLeave={() => setHoveredDot(null)}
                            >
                                <div 
                                    className={className}
                                    style={dotStyle}
                                >
                                    {/* Scintillation for Home */}
                                    {dot.type === 'home' && (
                                        <>
                                            <div className="absolute inset-0 -m-1 bg-blue-500/50 rounded-full animate-ping"></div>
                                            <div className="absolute inset-0 -m-3 bg-blue-500/10 rounded-full animate-pulse"></div>
                                        </>
                                    )}
                                </div>
                                
                                {/* Invisible larger trigger area for better hover UX */}
                                {locationName && (
                                    <div className="absolute inset-0 -m-2 z-20 cursor-pointer"></div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Tooltip - Rendered INSIDE the grid container context for perfect alignment */}
                {hoveredDot && (
                    <div 
                        className="absolute z-50 pointer-events-none flex flex-col items-center animate-tooltip"
                        style={{
                            left: `${(hoveredDot.c / cols) * 100}%`,
                            top: `${(hoveredDot.r / rows) * 100}%`,
                            // Manual adjustment to center on the specific cell (add half cell width/height)
                            marginLeft: `${100 / cols / 2}%`,
                            marginTop: `${100 / rows / 2}%`,
                        }}
                    >
                        <div className="bg-[#050505] text-white text-sm font-bold py-2 px-4 rounded-lg border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,1)] whitespace-nowrap flex items-center gap-2">
                                {hoveredDot.name.includes('Home') && <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"/>}
                                {hoveredDot.name.includes('Client') && <span className="w-2 h-2 rounded-full bg-amber-400"/>}
                                {hoveredDot.name}
                        </div>
                        {/* Arrow Tip */}
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#050505] mt-[-1px]"></div>
                    </div>
                )}
            </div>

            {/* Color Key Legend (Bottom Left) */}
            <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 flex flex-wrap gap-3 md:gap-4 bg-black/90 p-2 md:p-3 rounded-full border border-white/10 backdrop-blur-md pointer-events-none z-40 shadow-lg">
                <div className="flex items-center gap-2 px-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-300 font-bold">Home</span>
                </div>
                <div className="flex items-center gap-2 px-2 border-l border-white/10">
                    <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"></div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-300 font-bold">Visited</span>
                </div>
                <div className="flex items-center gap-2 px-2 border-l border-white/10">
                    <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]"></div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-300 font-bold">Clients</span>
                </div>
            </div>

            {/* Stats Legend (Top Right) - Floating inside map - Smaller on Mobile */}
            <div className="absolute top-4 right-4 md:top-8 md:right-8 flex flex-col gap-2 pointer-events-none z-40">
                 <div className="bg-black/80 backdrop-blur-md border border-white/10 p-2 pr-4 md:p-3 md:pr-5 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-xl">
                    <div className="bg-white/10 p-1.5 md:p-2 rounded-full">
                        <Globe className="text-white w-3 h-3 md:w-4 md:h-4" />
                    </div>
                    <div>
                        <span className="block text-sm md:text-lg font-bold text-white leading-none">16</span>
                        <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-gray-400 font-bold">Countries</span>
                    </div>
                 </div>
                 <div className="bg-black/80 backdrop-blur-md border border-white/10 p-2 pr-4 md:p-3 md:pr-5 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-3 shadow-xl">
                    <div className="bg-amber-500/20 p-1.5 md:p-2 rounded-full">
                        <MapPin className="text-amber-400 w-3 h-3 md:w-4 md:h-4" />
                    </div>
                    <div>
                        <span className="block text-sm md:text-lg font-bold text-white leading-none">6</span>
                        <span className="text-[8px] md:text-[10px] uppercase tracking-wider text-gray-400 font-bold">Clients</span>
                    </div>
                 </div>
            </div>
        </div>

        <div className="mt-8 flex justify-center gap-4 flex-wrap opacity-70 hover:opacity-100 transition-opacity">
             <span className="text-gray-500 text-sm uppercase tracking-widest font-medium">Spoken Languages:</span>
             <span className="text-gray-300 text-sm">French</span>
             <span className="text-gray-500 text-sm">•</span>
             <span className="text-gray-300 text-sm">English</span>
             <span className="text-gray-500 text-sm">•</span>
             <span className="text-gray-300 text-sm">Spanish</span>
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <a 
                href="https://www.fiverr.com/socrafty30/" 
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-[#1dbf73] text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 border-b-[5px] border-[#148a53] hover:bg-[#24d480] hover:border-[#1a9e5e] active:border-b-0 active:translate-y-[5px] transition-all duration-75 shadow-lg"
            >
                Available on Fiverr
                <ExternalLink size={16} />
            </a>
            <a 
                href="https://www.malt.fr/profile/adrienlloret" 
                target="_blank"
                rel="noopener noreferrer"
                className="relative bg-[#ff0044] text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 border-b-[5px] border-[#b30030] hover:bg-[#ff1a59] hover:border-[#cc0036] active:border-b-0 active:translate-y-[5px] transition-all duration-75 shadow-lg"
            >
                Available on Malt
                <ExternalLink size={16} />
            </a>
        </div>
      </div>
    </section>
  );
};

export default NomadMap;
