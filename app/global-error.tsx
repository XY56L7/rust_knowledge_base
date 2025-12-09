'use client';

import { useEffect } from 'react';

export default function GlobalError({
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
    <html lang="hu">
      <body>
        <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center max-w-2xl mx-auto px-4">
            <div className="mb-8">
              <span className="text-8xl">💥</span>
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
              Kritikus hiba!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              Sajnáljuk, de egy kritikus hiba történt az alkalmazásban.
            </p>
            <button
              onClick={reset}
              className="bg-orange-600 text-white px-6 py-3 rounded-xl hover:bg-orange-700 transition-colors font-semibold shadow-lg"
            >
              Újrapróbálás
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}


