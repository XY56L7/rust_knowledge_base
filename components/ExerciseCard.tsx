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
    easy: 'bg-gradient-to-br from-green-500 to-green-600 text-white',
    medium: 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white',
    hard: 'bg-gradient-to-br from-red-500 to-red-600 text-white',
  };

  const difficultyLabels = {
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {exercise.title}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            {exercise.description}
          </p>
        </div>
        <span className={`px-4 py-2 rounded-xl text-sm font-bold shadow-md ${difficultyColors[exercise.difficulty]}`}>
          {difficultyLabels[exercise.difficulty]}
        </span>
      </div>

      {exercise.starterCode && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Starter Code:
          </h4>
          <CodeBlock code={exercise.starterCode} language="rust" />
        </div>
      )}

      {exercise.hints && exercise.hints.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowHints(!showHints)}
            className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
          >
            {showHints ? '▼ Hide' : '▶ Show Hints'}
          </button>
          {showHints && (
            <div className="mt-2 p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-xl border border-yellow-200 dark:border-yellow-800">
              <ul className="list-disc list-inside space-y-2 text-sm font-medium text-gray-800 dark:text-gray-200">
                {exercise.hints.map((hint, index) => (
                  <li key={index}>{hint}</li>
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
            className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
          >
            {showSolution ? '▼ Hide Solution' : '▶ Show Solution'}
          </button>
          {showSolution && (
            <div className="mt-2">
              <CodeBlock code={exercise.solution} language="rust" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

