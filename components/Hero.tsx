'use client';

import Link from 'next/link';
import { Course } from '@/types';

interface HeroProps {
  course: Course;
  totalLessons: number;
}

export default function Hero({ course, totalLessons }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent_50%)]"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/30 rounded-full border border-orange-200 dark:border-orange-800 mb-8 animate-in fade-in slide-in-from-top-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
              🚀 Complete Rust Blockchain Course
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-extrabold mb-6 animate-in fade-in slide-in-from-bottom-4">
            <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 dark:from-orange-400 dark:via-orange-300 dark:to-orange-400 bg-clip-text text-transparent animate-gradient">
              Master Blockchain
            </span>
            <span className="block bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mt-2">
              Development with Rust
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-6">
            {course.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8">
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/10 group-hover:to-orange-500/0 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-2">
                  {course.chapters.length}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">Chapters</div>
              </div>
            </div>
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-blue-500/0 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
                  {totalLessons}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">Lessons</div>
              </div>
            </div>
            <div className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-purple-500/0 rounded-2xl transition-all duration-300"></div>
              <div className="relative">
                <div className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent mb-2">
                  Beginner → Advanced
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-semibold">Level</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-10">
            <Link
              href="#chapters"
              className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transform hover:scale-105 transition-all duration-300 flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10">Start Learning 🚀</span>
            </Link>
            <Link
              href="#about"
              className="group px-8 py-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl hover:bg-white dark:hover:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-xl shadow-xl border-2 border-gray-200 dark:border-gray-700 hover:border-orange-500 dark:hover:border-orange-500 transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

