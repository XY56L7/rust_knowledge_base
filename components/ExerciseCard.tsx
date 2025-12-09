'use client';

import { useState } from 'react';
import { Exercise } from '@/types';
import CodeBlock from './CodeBlock';

interface ExerciseCardProps {
  exercise: Exercise;
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);

  const difficultyColors = {
    easy: 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25',
    medium: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-lg shadow-yellow-500/25',
    hard: 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/25',
  };

  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
      
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/0 transition-all duration-500 rounded-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
              {exercise.title}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
              {exercise.description}
            </p>
          </div>
          <span className={`px-4 py-2 rounded-xl text-sm font-bold shadow-md transform transition-transform hover:scale-105 ${difficultyColors[exercise.difficulty]}`}>
            {difficultyLabels[exercise.difficulty]}
          </span>
        </div>

        {exercise.starterCode && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              Starter Code:
            </h4>
            <CodeBlock code={exercise.starterCode} language="rust" />
          </div>
        )}

        {exercise.hints && exercise.hints.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setShowHints(!showHints)}
              className="group/btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 hover:from-yellow-100 hover:to-yellow-200 dark:hover:from-yellow-900/50 dark:hover:to-yellow-800/50 rounded-lg text-sm font-semibold text-yellow-800 dark:text-yellow-300 transition-all duration-200 border border-yellow-200 dark:border-yellow-800 hover:border-yellow-300 dark:hover:border-yellow-700 hover:shadow-md transform hover:scale-105"
            >
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showHints ? 'rotate-90' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {showHints ? 'Hide Hints' : 'Show Hints'}
            </button>
            {showHints && (
              <div className="mt-3 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl border border-yellow-200 dark:border-yellow-800 animate-in slide-in-from-top-2">
                <ul className="list-disc list-inside space-y-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                  {exercise.hints.map((hint, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-yellow-600 dark:text-yellow-400 mt-1">💡</span>
                      <span>{hint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {exercise.solution && (
          <div>
            <button
              onClick={() => setShowSolution(!showSolution)}
              className="group/btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 hover:from-green-100 hover:to-green-200 dark:hover:from-green-900/50 dark:hover:to-green-800/50 rounded-lg text-sm font-semibold text-green-800 dark:text-green-300 transition-all duration-200 border border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 hover:shadow-md transform hover:scale-105"
            >
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${showSolution ? 'rotate-90' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolution && (
              <div className="mt-3 animate-in slide-in-from-top-2">
                <CodeBlock code={exercise.solution} language="rust" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
