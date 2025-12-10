import Link from 'next/link';
import { loadCourse, loadLesson } from '@/utils/dataLoader';
import { Course } from '@/types';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import CareerGuide from '@/components/CareerGuide';

export default async function Home() {
  const course: Course = await loadCourse();
  
  const chaptersWithExistingLessons = await Promise.all(
    course.chapters.map(async (chapter) => {
      const existingLessons = await Promise.all(
        chapter.lessons.map(async (lessonId) => {
          const lesson = await loadLesson(lessonId);
          return lesson ? lessonId : null;
        })
      );
      return {
        ...chapter,
        lessons: existingLessons.filter((id): id is string => id !== null)
      };
    })
  );
  
  const totalExistingLessons = chaptersWithExistingLessons.reduce(
    (acc, ch) => acc + ch.lessons.length,
    0
  );

  return (
    <>
      <Hero course={course} totalLessons={totalExistingLessons} />
      
      <Features />

      <section id="game" className="py-24 bg-gradient-to-br from-purple-900 via-gray-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6 text-white">
              🎮 Learn Rust by Building Zombies!
            </h2>
            <p className="text-xl text-purple-200 max-w-2xl mx-auto mb-8">
              Interactive coding game inspired by CryptoZombies. Learn Rust programming through hands-on challenges.
            </p>
            <Link
              href="/game"
              className="inline-block px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-600 hover:from-purple-700 hover:to-orange-700 text-white font-bold rounded-xl shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Start Playing →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🧟</div>
              <h3 className="text-xl font-bold text-white mb-2">Build Zombies</h3>
              <p className="text-purple-200">
                Create and customize your zombie army using Rust structs, functions, and more.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold text-white mb-2">Code Editor</h3>
              <p className="text-purple-200">
                Write Rust code directly in your browser with instant feedback and validation.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-white mb-2">Earn XP & Achievements</h3>
              <p className="text-purple-200">
                Level up, unlock achievements, and track your progress as you learn.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CareerGuide />

      <section id="chapters" className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
              <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                Course Content
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comprehensive curriculum covering everything from Rust fundamentals to advanced blockchain development
            </p>
          </div>

          <div className="space-y-8">
            {chaptersWithExistingLessons.map((chapter, chapterIndex) => (
              <div
                key={chapter.id}
              className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-10 hover:shadow-orange-500/10 transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
              
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-900/10 rounded-full blur-3xl -z-0"></div>
                
                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row items-start justify-between mb-6 gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-2xl shadow-xl transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          {chapterIndex + 1}
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors break-words">
                          {chapter.title}
                        </h3>
                      </div>
                      <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 ml-20 break-words">
                        {chapter.description}
                      </p>
                    </div>
                    {chapter.lessons.length > 0 && (
                      <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white px-6 py-3 rounded-xl text-sm font-bold shadow-lg transform group-hover:scale-105 transition-transform">
                        {chapter.lessons.length} lessons
                      </div>
                    )}
                  </div>
                  
                  {chapter.lessons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                      {chapter.lessons.map((lessonId, index) => (
                        <Link
                          key={lessonId}
                          href={`/lessons/${lessonId}`}
                          className="group/lesson relative block p-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-900/30 dark:hover:to-orange-800/30 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-xl transform hover:-translate-y-2"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white text-sm font-bold shadow-md group-hover/lesson:scale-110 transition-transform">
                              {index + 1}
                            </div>
                            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover/lesson:text-orange-700 dark:group-hover/lesson:text-orange-400 transition-colors flex-1 break-words">
                              {lessonId.replace('lesson-', '').replace(/-/g, ' ')}
                            </span>
                            <svg className="w-5 h-5 text-gray-400 group-hover/lesson:text-orange-500 ml-auto opacity-0 group-hover/lesson:opacity-100 transition-all transform group-hover/lesson:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl text-center text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-300 dark:border-gray-600">
                      <p className="text-lg">Lessons coming soon...</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
