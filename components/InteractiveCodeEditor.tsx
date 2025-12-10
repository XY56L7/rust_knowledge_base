'use client';

import { useState, useEffect } from 'react';
import { GameChallenge, CodeValidationResult, TestCase, TestResult } from '@/types/game';

interface InteractiveCodeEditorProps {
  challenge: GameChallenge;
  onComplete: (result: CodeValidationResult) => void;
  onCodeChange?: (code: string) => void;
}

export default function InteractiveCodeEditor({ 
  challenge, 
  onComplete,
  onCodeChange 
}: InteractiveCodeEditorProps) {
  const [code, setCode] = useState(challenge.starterCode);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<CodeValidationResult | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [solutionCopied, setSolutionCopied] = useState(false);

  useEffect(() => {
    setCode(challenge.starterCode);
    setValidationResult(null);
    setShowHints(false);
    setHintIndex(0);
    setShowSolution(false);
  }, [challenge.id]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
  };

  const validateCode = async () => {
    setIsValidating(true);
    
    try {
      const result = await validateRustCode(code, challenge);
      setValidationResult(result);
      
      if (result.success) {
        onComplete(result);
      }
    } catch (error) {
      setValidationResult({
        success: false,
        errors: [`Validation error: ${error}`],
        testResults: [],
        passed: 0,
        total: challenge.tests.length,
      });
    } finally {
      setIsValidating(false);
    }
  };

  const showNextHint = () => {
    if (hintIndex < challenge.hints.length - 1) {
      setHintIndex(hintIndex + 1);
    }
  };

  const copySolution = async () => {
    try {
      await navigator.clipboard.writeText(challenge.solution);
      setSolutionCopied(true);
      setTimeout(() => setSolutionCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy solution:', err);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="ml-4 text-sm text-gray-400 font-mono">main.rs</span>
          </div>
          <button
            onClick={() => setCode(challenge.starterCode)}
            className="text-xs text-gray-400 hover:text-white transition-colors"
          >
            Reset
          </button>
        </div>
        <textarea
          value={code}
          onChange={(e) => handleCodeChange(e.target.value)}
          className="w-full h-96 p-4 bg-gray-900 text-green-400 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
          spellCheck={false}
          placeholder="// Write your Rust code here..."
        />
      </div>

      <div className="flex gap-3 flex-wrap">
        <button
          onClick={validateCode}
          disabled={isValidating}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none min-w-[140px]"
        >
          {isValidating ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Testing...
            </span>
          ) : (
            '🧪 Test Code'
          )}
        </button>
        
        {challenge.hints.length > 0 && (
          <button
            onClick={() => {
              if (!showHints) {
                setShowHints(true);
              } else {
                showNextHint();
              }
            }}
            className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {showHints ? '💡 Next Hint' : '💡 Show Hint'}
          </button>
        )}

        <button
          onClick={() => setShowSolution(!showSolution)}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {showSolution ? '🙈 Hide Solution' : '💡 Show Solution'}
        </button>
      </div>

      {showHints && challenge.hints.length > 0 && (
        <div className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/30 dark:to-yellow-800/30 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Hint {hintIndex + 1} of {challenge.hints.length}:
          </p>
          <p className="text-yellow-900 dark:text-yellow-100">
            {challenge.hints[hintIndex]}
          </p>
        </div>
      )}

      {showSolution && (
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-green-800 dark:text-green-200">
              💡 Solution:
            </p>
            <button
              onClick={copySolution}
              className="group/btn relative px-4 py-1.5 bg-green-600/80 hover:bg-green-600 rounded-lg text-sm text-white transition-all duration-300 flex items-center gap-2 border border-green-500/50 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/25 transform hover:scale-105"
              title="Copy solution to clipboard"
            >
              <svg 
                className={`w-4 h-4 transition-all duration-300 ${solutionCopied ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <svg 
                className={`absolute w-4 h-4 text-white transition-all duration-300 ${solutionCopied ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <span className={`transition-all duration-300 ${solutionCopied ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
                {solutionCopied ? 'Copied!' : 'Copy'}
              </span>
            </button>
          </div>
          <div className="bg-gray-900 rounded-lg overflow-hidden border-2 border-gray-700">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-sm text-gray-400 font-mono">solution.rs</span>
              </div>
            </div>
            <pre className="p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-x-auto">
              <code className="whitespace-pre-wrap break-words">{challenge.solution}</code>
            </pre>
          </div>
        </div>
      )}

      {validationResult && (
        <div className={`p-4 rounded-lg border-2 ${
          validationResult.success
            ? 'bg-green-50 dark:bg-green-900/30 border-green-500'
            : 'bg-red-50 dark:bg-red-900/30 border-red-500'
        }`}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">
              {validationResult.success ? '✅' : '❌'}
            </span>
            <h3 className={`font-bold text-lg ${
              validationResult.success
                ? 'text-green-800 dark:text-green-200'
                : 'text-red-800 dark:text-red-200'
            }`}>
              {validationResult.success ? 'All Tests Passed!' : 'Tests Failed'}
            </h3>
          </div>
          
          <div className="mb-3">
            <p className={`text-sm font-semibold ${
              validationResult.success
                ? 'text-green-700 dark:text-green-300'
                : 'text-red-700 dark:text-red-300'
            }`}>
              {validationResult.passed} / {validationResult.total} tests passed
            </p>
          </div>

          {validationResult.errors.length > 0 && (
            <div className="mb-3">
              <p className="text-sm font-semibold text-red-800 dark:text-red-200 mb-2">Errors:</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300">
                {validationResult.errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          {validationResult.testResults.length > 0 && (
            <div>
              <p className="text-sm font-semibold mb-2 text-gray-800 dark:text-gray-200">Test Results:</p>
              <div className="space-y-2">
                {validationResult.testResults.map((test, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded text-sm ${
                      test.passed
                        ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200'
                        : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{test.passed ? '✅' : '❌'}</span>
                      <span className="font-semibold">
                        {challenge.tests.find(t => t.id === test.testId)?.description || `Test ${index + 1}`}
                      </span>
                    </div>
                    {test.error && (
                      <p className="mt-1 text-xs opacity-75">{test.error}</p>
                    )}
                    {test.output && (
                      <p className="mt-1 text-xs font-mono opacity-75">Output: {test.output}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {validationResult.success && (
            <div className="mt-4 p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg text-white text-center">
              <p className="font-bold">🎉 Challenge Complete! +{challenge.xpReward} XP</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

async function validateRustCode(code: string, challenge: GameChallenge): Promise<CodeValidationResult> {
  const errors: string[] = [];
  const testResults: TestResult[] = [];

  if (!code.trim()) {
    return {
      success: false,
      errors: ['Code cannot be empty'],
      testResults: [],
      passed: 0,
      total: challenge.tests.length,
    };
  }

  const syntaxCheck = checkRustSyntax(code);
  if (!syntaxCheck.valid) {
    errors.push(...syntaxCheck.errors);
  }

  for (const test of challenge.tests) {
    try {
      const result = await runTest(code, test, challenge);
      testResults.push(result);
    } catch (error) {
      testResults.push({
        testId: test.id,
        passed: false,
        error: String(error),
      });
    }
  }

  const passed = testResults.filter(r => r.passed).length;
  const success = errors.length === 0 && passed === challenge.tests.length;

  return {
    success,
    errors,
    testResults,
    passed,
    total: challenge.tests.length,
  };
}

function checkRustSyntax(code: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!code.includes('fn main')) {
    errors.push('Code must contain a main function');
  }

  if (code.includes('unsafe') && !code.includes('// SAFE:')) {
    errors.push('Unsafe code detected. Please add a safety comment.');
  }

  const braceCount = (code.match(/{/g) || []).length;
  const closeBraceCount = (code.match(/}/g) || []).length;
  if (braceCount !== closeBraceCount) {
    errors.push('Mismatched braces');
  }

  const parenCount = (code.match(/\(/g) || []).length;
  const closeParenCount = (code.match(/\)/g) || []).length;
  if (parenCount !== closeParenCount) {
    errors.push('Mismatched parentheses');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

async function runTest(
  code: string,
  test: TestCase,
  challenge: GameChallenge
): Promise<TestResult> {
  try {
    const result = simulateCodeExecution(code, test);
    
    if (result.output === test.expectedOutput) {
      return {
        testId: test.id,
        passed: true,
        output: result.output,
      };
    } else {
      return {
        testId: test.id,
        passed: false,
        error: `Expected: ${test.expectedOutput}, Got: ${result.output}`,
        output: result.output,
      };
    }
  } catch (error) {
    return {
      testId: test.id,
      passed: false,
      error: String(error),
    };
  }
}

function simulateCodeExecution(code: string, test: TestCase): { output: string } {
  const input = test.input;
  
  if (code.includes('println!') || code.includes('print!')) {
    const outputMatch = code.match(/println!\s*\(\s*"([^"]+)"\s*\)/);
    if (outputMatch) {
      return { output: outputMatch[1] };
    }
  }

  if (code.includes('return') || code.includes('=>')) {
    const returnMatch = code.match(/return\s+(\d+)|=>\s*(\d+)/);
    if (returnMatch) {
      return { output: returnMatch[1] || returnMatch[2] };
    }
  }

  if (code.includes('let') && code.includes('=')) {
    const letMatch = code.match(/let\s+\w+\s*=\s*(\d+)/);
    if (letMatch) {
      return { output: letMatch[1] };
    }
  }

  return { output: 'No output detected' };
}


