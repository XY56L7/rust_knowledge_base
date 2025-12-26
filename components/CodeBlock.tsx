'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative group w-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500"></div>
      
      <div className="relative bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700/50 backdrop-blur-sm w-full">
        <div className="flex items-center justify-between bg-gradient-to-r from-gray-800/95 via-gray-850/95 to-gray-900/95 backdrop-blur-md px-2 py-1.5 sm:px-3 sm:py-2 md:px-4 md:py-3 border-b border-gray-700/50 flex-wrap gap-2">
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 min-w-0 flex-shrink-0">
            <div className="flex gap-0.5 sm:gap-1 md:gap-1.5 flex-shrink-0">
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50"></div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500 shadow-lg shadow-yellow-500/50"></div>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full bg-green-500 shadow-lg shadow-green-500/50"></div>
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm font-mono text-gray-300 font-semibold tracking-wide truncate">{language.toUpperCase()}</span>
          </div>
          <button
            onClick={copyToClipboard}
            className="group/btn relative px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-1.5 bg-gray-700/60 hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 rounded-lg text-[10px] sm:text-xs md:text-sm text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-1 sm:gap-1.5 md:gap-2 border border-gray-600/50 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/25 transform hover:scale-105 flex-shrink-0"
            title="Copy to clipboard"
          >
            <svg 
              className={`w-3 h-3 sm:w-4 sm:h-4 transition-all duration-300 flex-shrink-0 ${copied ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <svg 
              className={`absolute w-3 h-3 sm:w-4 sm:h-4 text-green-400 transition-all duration-300 flex-shrink-0 ${copied ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
            <span className={`hidden sm:inline transition-all duration-300 ${copied ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </button>
        </div>
        
        <div className="relative overflow-x-auto w-full">
          <pre className="p-2 sm:p-3 md:p-6 m-0 bg-transparent overflow-x-auto">
            <code className="font-mono text-[11px] sm:text-xs md:text-sm leading-relaxed text-gray-100 block whitespace-pre overflow-x-auto min-w-full">
              {code}
            </code>
          </pre>
          
          <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 md:w-12 bg-gray-800/30 border-r border-gray-700/50 pointer-events-none"></div>
          
          <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 md:h-12 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
