'use client';

import { GameProgress as GameProgressType, Achievement } from '@/types/game';
import { useState, useEffect } from 'react';

interface GameProgressProps {
  progress: GameProgressType;
}

export default function GameProgress({ progress }: GameProgressProps) {
  const [localProgress, setLocalProgress] = useState(progress);

  useEffect(() => {
    const saved = localStorage.getItem('rust-game-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLocalProgress(parsed);
      } catch (e) {
        console.error('Failed to parse saved progress');
      }
    }
  }, []);

  const xpForNextLevel = localProgress.currentLevel * 100;
  const xpProgress = (localProgress.totalXP % 100) / 100;
  const levelProgress = (localProgress.totalXP % 100) / xpForNextLevel;

  const rarityColors = {
    common: 'bg-gray-500',
    rare: 'bg-blue-500',
    epic: 'bg-purple-500',
    legendary: 'bg-yellow-500',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        🎮 Game Progress
      </h2>

      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Level {localProgress.currentLevel}
            </span>
            <span className="text-sm font-semibold text-orange-600 dark:text-orange-400">
              {localProgress.totalXP} XP
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-orange-500 to-orange-600 transition-all duration-500 rounded-full flex items-center justify-center"
              style={{ width: `${Math.min(levelProgress * 100, 100)}%` }}
            >
              <span className="text-xs font-bold text-white">
                {Math.round(levelProgress * 100)}%
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {xpForNextLevel - (localProgress.totalXP % 100)} XP to next level
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-lg border border-orange-200 dark:border-orange-800">
            <div className="text-3xl mb-2">🧟</div>
            <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
              {localProgress.zombiesCreated}
            </div>
            <div className="text-sm text-orange-600 dark:text-orange-400">
              Zombies Created
            </div>
          </div>

          <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-3xl mb-2">✅</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {localProgress.completedChallenges.length}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              Challenges Completed
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 break-words">
            🏆 Achievements ({localProgress.achievements.filter(a => a.unlockedAt).length}/{localProgress.achievements.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {localProgress.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={
                  `p-4 rounded-lg border-2 transition-all shadow-md hover:shadow-lg ` +
                  (achievement.unlockedAt
                    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 border-yellow-400 dark:border-yellow-600'
                    : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50')
                }
              >
                <div className="text-3xl mb-2 text-center">
                  {achievement.unlockedAt ? achievement.icon : '🔒'}
                </div>
                <div className={`text-sm font-bold text-center mb-2 px-3 py-1.5 rounded ${rarityColors[achievement.rarity]} text-white`}>
                  {achievement.rarity.toUpperCase()}
                </div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 text-center break-words mb-1">
                  {achievement.title}
                </div>
                {achievement.unlockedAt && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                    Unlocked!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

