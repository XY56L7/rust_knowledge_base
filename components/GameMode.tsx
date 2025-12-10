'use client';

import { useState, useEffect } from 'react';
import { GameLesson, GameChallenge, GameProgress, CodeValidationResult } from '@/types/game';
import InteractiveCodeEditor from './InteractiveCodeEditor';
import GameProgressComponent from './GameProgress';

interface GameModeProps {
  lessons: GameLesson[];
}

export default function GameMode({ lessons }: GameModeProps) {
  const [currentLesson, setCurrentLesson] = useState<GameLesson | null>(lessons[0] || null);
  const [currentChallenge, setCurrentChallenge] = useState<GameChallenge | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [progress, setProgress] = useState<GameProgress>({
    completedChallenges: [],
    currentLevel: 1,
    totalXP: 0,
    achievements: [
      {
        id: 'first-zombie',
        title: 'First Zombie',
        description: 'Created your first zombie',
        icon: '🧟',
        rarity: 'common',
      },
      {
        id: 'zombie-master',
        title: 'Zombie Master',
        description: 'Created 10 zombies',
        icon: '👑',
        rarity: 'legendary',
      },
    ],
    zombiesCreated: 0,
    lastPlayed: new Date().toISOString(),
  });

  useEffect(() => {
    const saved = localStorage.getItem('rust-game-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProgress(parsed);
      } catch (e) {
        console.error('Failed to load progress');
      }
    }
  }, []);

  useEffect(() => {
    if (currentLesson && currentLesson.challenges.length > 0) {
      setCurrentChallenge(currentLesson.challenges[challengeIndex]);
    }
  }, [currentLesson, challengeIndex]);

  const saveProgress = (newProgress: GameProgress) => {
    setProgress(newProgress);
    localStorage.setItem('rust-game-progress', JSON.stringify(newProgress));
  };

  const handleChallengeComplete = (result: CodeValidationResult) => {
    if (!currentChallenge) return;

    const newProgress: GameProgress = {
      ...progress,
      completedChallenges: [...progress.completedChallenges, currentChallenge.id],
      totalXP: progress.totalXP + currentChallenge.xpReward,
      currentLevel: Math.floor((progress.totalXP + currentChallenge.xpReward) / 100) + 1,
      zombiesCreated: progress.zombiesCreated + 1,
      lastPlayed: new Date().toISOString(),
    };

    if (currentChallenge.id === 'challenge-1-1') {
      const firstZombieAchievement = newProgress.achievements.find(a => a.id === 'first-zombie');
      if (firstZombieAchievement && !firstZombieAchievement.unlockedAt) {
        firstZombieAchievement.unlockedAt = new Date().toISOString();
      }
    }

    saveProgress(newProgress);

    setTimeout(() => {
      if (challengeIndex < currentLesson!.challenges.length - 1) {
        setChallengeIndex(challengeIndex + 1);
      } else {
        const nextLesson = lessons.find(l => l.chapter === currentLesson!.chapter + 1);
        if (nextLesson) {
          setCurrentLesson(nextLesson);
          setChallengeIndex(0);
        }
      }
    }, 2000);
  };

  if (!currentLesson || !currentChallenge) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-white">
        <p>Loading game...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 border-2 border-purple-500">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl flex-shrink-0">🧟</span>
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-bold text-white mb-2 break-words">
                    {currentLesson.title}
                  </h1>
                  <p className="text-purple-300 break-words">{currentLesson.description}</p>
                </div>
              </div>
              
              <div className="bg-gray-800/50 rounded-lg p-4 mb-6 border border-purple-500/30">
                <h3 className="text-lg font-bold text-purple-300 mb-2">📖 Story</h3>
                <p className="text-gray-300 whitespace-pre-line break-words">{currentLesson.story}</p>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-purple-600 text-white text-sm font-bold rounded-lg">
                  Challenge {challengeIndex + 1} of {currentLesson.challenges.length}
                </span>
                <span className="px-3 py-1 bg-orange-600 text-white text-sm font-bold rounded-lg">
                  {currentChallenge.xpReward} XP
                </span>
              </div>
            </div>

            <div className="bg-gray-900 rounded-lg p-6 mb-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 break-words">
                {currentChallenge.title}
              </h2>
              <p className="text-gray-300 mb-4 break-words">{currentChallenge.description}</p>
              <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-700">
                <h3 className="text-lg font-semibold text-blue-300 mb-2">📋 Instructions</h3>
                <p className="text-gray-300 whitespace-pre-line break-words">{currentChallenge.instructions}</p>
              </div>
            </div>

            <InteractiveCodeEditor
              challenge={currentChallenge}
              onComplete={handleChallengeComplete}
            />
          </div>
        </div>

        <div>
          <GameProgressComponent progress={progress} />

          <div className="mt-6 bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4">📚 Chapters</h3>
            <div className="space-y-2">
              {lessons.map((lesson) => (
                <button
                  key={lesson.id}
                  onClick={() => {
                    if (lesson.unlocked) {
                      setCurrentLesson(lesson);
                      setChallengeIndex(0);
                    }
                  }}
                  disabled={!lesson.unlocked}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    lesson.unlocked
                      ? lesson.id === currentLesson.id
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                      : 'bg-gray-900 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold break-words">Chapter {lesson.chapter}</span>
                    {!lesson.unlocked && <span className="flex-shrink-0">🔒</span>}
                  </div>
                  <p className="text-sm mt-1 opacity-75 break-words">{lesson.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

