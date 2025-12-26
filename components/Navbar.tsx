'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200 dark:border-gray-800' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
              <div className="relative text-4xl transform group-hover:scale-110 transition-transform duration-300">
                🦀
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Rust Blockchain
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">Learn & Build</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors relative group">
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#chapters" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors relative group">
              Chapters
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="/game" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors relative group">
              🎮 Game
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#career" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors relative group">
              Career
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link href="#about" className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors relative group">
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <ThemeToggle />
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 transform hover:scale-105 transition-all duration-300"
            >
              GitHub
            </a>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl animate-in slide-in-from-top">
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="#chapters" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Chapters
              </Link>
              <Link 
                href="/game" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                🎮 Game
              </Link>
              <Link 
                href="#career" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Career
              </Link>
              <Link 
                href="#about" 
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 font-semibold transition-colors px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="mx-4 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-xl text-center shadow-lg"
              >
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

