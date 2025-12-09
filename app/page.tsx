import Link from 'next/link';
import { loadCourse, loadLesson } from '@/utils/dataLoader';
import { Course } from '@/types';

export default async function Home() {
  const course: Course = await loadCourse();
  
  // Filter out lessons that don't have corresponding JSON files
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
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-6xl">🦀</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 dark:from-orange-400 dark:via-orange-300 dark:to-orange-400 bg-clip-text text-transparent mb-6">
            Blockchain Development with Rust
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-medium">
            {course.description}
          </p>
        </div>

        {/* Course Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="group relative bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
            <div className="relative">
              <div className="text-5xl font-extrabold text-white mb-2">
                {course.chapters.length}
              </div>
              <div className="text-orange-100 font-semibold text-lg">Chapters</div>
            </div>
          </div>
          <div className="group relative bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
            <div className="relative">
              <div className="text-5xl font-extrabold text-white mb-2">
                {totalExistingLessons}
              </div>
              <div className="text-blue-100 font-semibold text-lg">Lessons</div>
            </div>
          </div>
          <div className="group relative bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-2xl shadow-xl p-8 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
            <div className="relative">
              <div className="text-3xl font-extrabold text-white mb-2">
                Beginner → Advanced
              </div>
              <div className="text-purple-100 font-semibold text-lg">Level</div>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Course Content
          </h2>
          {chaptersWithExistingLessons.map((chapter, chapterIndex) => (
            <div
              key={chapter.id}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Gradient accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
              
              {/* Decorative background pattern */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-900/10 rounded-full blur-3xl -z-0"></div>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white font-bold text-xl shadow-lg">
                        {chapterIndex + 1}
                      </div>
                      <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {chapter.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-600 dark:text-gray-300 ml-16">
                      {chapter.description}
                    </p>
                  </div>
                  {chapter.lessons.length > 0 && (
                    <div className="ml-4 bg-gradient-to-br from-orange-500 to-orange-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
                      {chapter.lessons.length} lessons
                    </div>
                  )}
                </div>
                
                {chapter.lessons.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                    {chapter.lessons.map((lessonId, index) => (
                      <Link
                        key={lessonId}
                        href={`/lessons/${lessonId}`}
                        className="group/lesson relative block p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-900/30 dark:hover:to-orange-800/30 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-orange-300 dark:hover:border-orange-700 hover:shadow-lg transform hover:-translate-y-1"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-orange-500 text-white text-xs font-bold shadow-md group-hover/lesson:scale-110 transition-transform">
                            {index + 1}
                          </div>
                          <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 group-hover/lesson:text-orange-700 dark:group-hover/lesson:text-orange-400 transition-colors">
                            {lessonId.replace('lesson-', '').replace(/-/g, ' ')}
                          </span>
                          <svg className="w-4 h-4 text-gray-400 group-hover/lesson:text-orange-500 ml-auto opacity-0 group-hover/lesson:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl text-center text-gray-500 dark:text-gray-400">
                    Lessons coming soon...
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-gray-600 dark:text-gray-400">
          <p>Start learning with the first lesson! 🚀</p>
        </div>
      </div>
    </main>
  );
}

