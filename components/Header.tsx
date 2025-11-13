
import React from 'react';
import { MicrochipIcon } from './Icons';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-lg border-b border-gray-700 p-4 shadow-lg sticky top-0 z-10">
      <div className="max-w-4xl mx-auto flex items-center space-x-3">
        <MicrochipIcon className="h-8 w-8 text-cyan-400" />
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">
            Hardware Helper AI
          </h1>
          <p className="text-sm text-gray-400">Your Virtual Embedded Systems Lab Assistant</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
