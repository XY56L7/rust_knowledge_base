'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="mb-8">
          <span className="text-8xl">😕</span>
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          Something went wrong!
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Sorry, an unexpected error occurred. Please try again.
        </p>
        {error.message && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-800 dark:text-red-200 font-mono">
              {error.message}
            </p>
          </div>
        )}
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold shadow-lg"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-6 py-3 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-semibold"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}


