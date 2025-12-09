import { notFound } from 'next/navigation';
import Link from 'next/link';
import { loadLesson, getNextLesson, getPreviousLesson } from '@/utils/dataLoader';
import { Lesson } from '@/types';
import CodeBlock from '@/components/CodeBlock';
import ExerciseCard from '@/components/ExerciseCard';
import MarkdownContent from '@/components/MarkdownContent';

interface LessonPageProps {
  params: Promise<{ lessonId: string }>;
}

export default async function LessonPage({ params }: LessonPageProps) {
  const { lessonId } = await params;
  const lesson: Lesson | null = await loadLesson(lessonId);

  if (!lesson) {
    notFound();
  }

  const nextLessonId = await getNextLesson(lessonId);
  const prevLessonId = await getPreviousLesson(lessonId);

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const difficultyLabels = {
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-24">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            href="/"
            className="text-orange-600 dark:text-orange-400 hover:underline inline-flex items-center gap-2"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 dark:border-gray-700 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500"></div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange-50/50 to-transparent dark:from-orange-900/10 rounded-full blur-3xl -z-0"></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                  {lesson.title}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                  {lesson.description}
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className={`px-4 py-2 rounded-xl text-sm font-bold shadow-md ${difficultyColors[lesson.difficulty]}`}>
                {difficultyLabels[lesson.difficulty]}
              </span>
              <span className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
                ⏱️ {lesson.estimatedTime} min
              </span>
              {lesson.prerequisites && lesson.prerequisites.length > 0 && (
                <span className="px-4 py-2 rounded-xl text-sm font-bold bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md">
                  📚 Prerequisites: {lesson.prerequisites.length}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6 border border-gray-100 dark:border-gray-700">
          <MarkdownContent content={lesson.content} />
        </div>

        {lesson.codeExamples && lesson.codeExamples.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Code Examples
            </h2>
            <div className="space-y-4">
              {lesson.codeExamples.map((example) => (
                <div
                  key={example.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {example.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {example.description}
                  </p>
                  <CodeBlock code={example.code} language={example.language} />
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Explanation:
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {example.explanation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {lesson.exercises && lesson.exercises.length > 0 && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Exercises
            </h2>
            <div className="space-y-4">
              {lesson.exercises.map((exercise) => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-between gap-4 mt-8">
          {prevLessonId ? (
            <Link
              href={`/lessons/${prevLessonId}`}
              className="group flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 text-center border border-gray-100 dark:border-gray-700 hover:border-orange-300 dark:hover:border-orange-700 transform hover:-translate-y-1"
            >
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Previous Lesson</div>
              <div className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                ← {prevLessonId.replace('lesson-', '').replace(/-/g, ' ')}
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          
          {nextLessonId ? (
            <Link
              href={`/lessons/${nextLessonId}`}
              className="group flex-1 bg-gradient-to-br from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 text-center transform hover:-translate-y-1"
            >
              <div className="text-sm text-orange-100 mb-2">Next Lesson</div>
              <div className="text-lg font-bold text-white">
                {nextLessonId.replace('lesson-', '').replace(/-/g, ' ')} →
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>
    </main>
  );
}

