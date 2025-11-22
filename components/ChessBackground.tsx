
import React, { useEffect, useState } from 'react';

interface GlowSquare {
  id: number;
  col: number;
  row: number;
}

const ChessBackground: React.FC = () => {
  const [glowSquares, setGlowSquares] = useState<GlowSquare[]>([]);
  // Large grid size for the "Large subtle chessboard" look
  const SQUARE_SIZE = 120; 

  useEffect(() => {
    const spawnSquare = () => {
      // Calculate grid dimensions based on current viewport
      const cols = Math.ceil(window.innerWidth / SQUARE_SIZE);
      const rows = Math.ceil(window.innerHeight / SQUARE_SIZE);
      
      // Pick random position
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      
      const id = Date.now();
      setGlowSquares(prev => [...prev, { id, col, row }]);

      // Cleanup after animation
      setTimeout(() => {
        setGlowSquares(prev => prev.filter(s => s.id !== id));
      }, 3000);
    };

    // Spawn a new glow periodically
    const interval = setInterval(spawnSquare, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-[#050505] overflow-hidden pointer-events-none">
        {/* 
          SVG Pattern for the Chessboard
          Increased contrast: Dark #0a0a0a, Light #161616
        */}
        <svg className="absolute inset-0 w-full h-full opacity-100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="chess-pattern" x="0" y="0" width={SQUARE_SIZE * 2} height={SQUARE_SIZE * 2} patternUnits="userSpaceOnUse">
                    {/* Base color (Dark Square) */}
                    <rect x="0" y="0" width={SQUARE_SIZE * 2} height={SQUARE_SIZE * 2} fill="#0a0a0a" />
                    {/* Light Squares (Checkerboard pattern) */}
                    <rect x="0" y="0" width={SQUARE_SIZE} height={SQUARE_SIZE} fill="#171717" />
                    <rect x={SQUARE_SIZE} y={SQUARE_SIZE} width={SQUARE_SIZE} height={SQUARE_SIZE} fill="#171717" />
                </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#chess-pattern)" />
        </svg>

        {/* Interactive Glow Effect Layer */}
        {glowSquares.map(sq => (
            <div
                key={sq.id}
                className="absolute pointer-events-none animate-chess-glow"
                style={{
                    left: sq.col * SQUARE_SIZE,
                    top: sq.row * SQUARE_SIZE,
                    width: SQUARE_SIZE,
                    height: SQUARE_SIZE,
                }}
            >
              {/* Inner glow container to handle the visual style */}
              <div className="w-full h-full bg-amber-500/5 shadow-[inset_0_0_40px_rgba(251,191,36,0.1)] border border-amber-500/10 backdrop-brightness-125"></div>
            </div>
        ))}
        
        {/* Radial Vignette for focus and premium feel - Made lighter to show board */}
        <div className="absolute inset-0 bg-radial-fade"></div>

        <style>{`
            @keyframes chessGlow {
                0% { opacity: 0; transform: scale(0.95); }
                20% { opacity: 1; transform: scale(1); }
                80% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0.95); }
            }
            .animate-chess-glow {
                animation: chessGlow 4s ease-in-out forwards;
            }
            .bg-radial-fade {
                background: radial-gradient(circle at 50% 30%, transparent 20%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%);
            }
        `}</style>
    </div>
  );
};

export default ChessBackground;
