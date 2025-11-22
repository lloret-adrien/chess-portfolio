import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <div className="glass-panel rounded-full px-6 py-3 flex gap-8 pointer-events-auto shadow-2xl shadow-black/50">
            <a href="#" className="text-sm font-medium text-white hover:text-amber-400 transition-colors">Home</a>
            <a href="#projects" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Journey</a>
            <a href="#contact" className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors">Contact</a>
        </div>
    </nav>
  );
};

export default Navbar;