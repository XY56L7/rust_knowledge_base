'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 rounded-t-lg">
        <span className="text-sm font-mono">{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-sm hover:text-white transition-colors"
          title="Másolás vágólapra"
        >
          {copied ? '✓ Másolva!' : '📋 Másolás'}
        </button>
      </div>
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
        <code className="font-mono text-sm">{code}</code>
      </pre>
    </div>
  );
}


