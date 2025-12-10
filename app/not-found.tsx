import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          The page you&apos;re looking for was not found
        </p>
        <Link
          href="/"
          className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}


