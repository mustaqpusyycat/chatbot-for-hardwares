
import React from 'react';
import { MicrochipIcon } from './Icons';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 md:gap-4 animate-pulse">
        <div className="flex-shrink-0 h-8 w-8 md:h-10 md:w-10 rounded-full flex items-center justify-center shadow-inner bg-gray-700 text-cyan-400">
            <MicrochipIcon className="h-5 w-5" />
        </div>
      <div className="max-w-sm px-4 py-3 rounded-2xl bg-gray-800 flex items-center space-x-2">
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-75"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
};

export default TypingIndicator;
