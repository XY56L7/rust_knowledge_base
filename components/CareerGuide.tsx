'use client';

import Link from 'next/link';

const deploymentOptions = [
  {
    name: 'Vercel',
    description: 'Best for Next.js - Zero config deployment',
    pros: ['Free tier', 'Automatic HTTPS', 'Global CDN', 'Preview deployments'],
    cons: ['Vendor lock-in', 'Limited server options'],
    link: 'https://vercel.com',
    icon: '▲',
  },
  {
    name: 'Netlify',
    description: 'Great for static sites and JAMstack',
    pros: ['Free tier', 'Easy setup', 'Form handling', 'Edge functions'],
    cons: ['Build time limits', 'Less flexible'],
    link: 'https://netlify.com',
    icon: '●',
  },
  {
    name: 'Railway',
    description: 'Simple deployment with Docker support',
    pros: ['Docker support', 'Database included', 'Easy scaling'],
    cons: ['Pricing can scale', 'Newer platform'],
    link: 'https://railway.app',
    icon: '🚂',
  },
  {
    name: 'DigitalOcean',
    description: 'Full control with VPS',
    pros: ['Full control', 'Affordable', 'Scalable'],
    cons: ['Requires setup', 'Manual maintenance'],
    link: 'https://digitalocean.com',
    icon: '🌊',
  },
];

const jobBoards = [
  { name: 'Web3.career', url: 'https://web3.career', description: 'Blockchain-specific jobs' },
  { name: 'CryptoJobsList', url: 'https://cryptojobslist.com', description: 'Crypto/blockchain positions' },
  { name: 'RemoteOK', url: 'https://remoteok.com', description: 'Remote blockchain jobs' },
  { name: 'AngelList', url: 'https://angel.co', description: 'Startup blockchain companies' },
  { name: 'LinkedIn', url: 'https://linkedin.com', description: 'Filter: Rust + Blockchain' },
];

const companies = [
  { name: 'Solana Labs', url: 'https://solana.com/careers', focus: 'High-performance blockchain' },
  { name: 'Polkadot', url: 'https://polkadot.network/careers', focus: 'Substrate framework' },
  { name: 'NEAR Protocol', url: 'https://near.org/careers', focus: 'Developer-friendly blockchain' },
  { name: 'Parity Technologies', url: 'https://parity.io/jobs', focus: 'Ethereum & Substrate' },
  { name: 'Chainlink', url: 'https://chain.link/careers', focus: 'Oracle networks' },
  { name: 'Acala', url: 'https://acala.network/careers', focus: 'DeFi on Polkadot' },
];

const checklist = [
  'GitHub profile optimized with pinned repositories',
  'Portfolio projects deployed and live',
  'Professional README files for all projects',
  'Code is well-documented with comments',
  'Tests written and passing (CI/CD)',
  'Resume/CV updated with projects',
  'LinkedIn profile complete',
  'Personal website/portfolio created',
  'Cover letter templates ready',
  'Interview questions prepared',
];

export default function CareerGuide() {
  return (
    <section id="career" className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-10 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Land Your Rust Blockchain Job
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Complete guide to building your portfolio, deploying projects, and getting hired
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">🚀</span>
              Deployment Options
            </h3>
            <div className="space-y-4">
              {deploymentOptions.map((option, index) => (
                <div
                  key={index}
                  className="group p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
                        <span>{option.icon}</span>
                        {option.name}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{option.description}</p>
                    </div>
                    <a
                      href={option.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors"
                    >
                      Visit
                    </a>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">Pros:</p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {option.pros.map((pro, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <span>✓</span> {pro}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">Cons:</p>
                      <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                        {option.cons.map((con, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <span>✗</span> {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💼</span>
              Job Search Resources
            </h3>
            
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Job Boards</h4>
              <div className="space-y-3">
                {jobBoards.map((board, index) => (
                  <a
                    key={index}
                    href={board.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {board.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{board.description}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Top Companies</h4>
              <div className="space-y-3">
                {companies.map((company, index) => (
                  <a
                    key={index}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:shadow-lg group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {company.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{company.focus}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">✅</span>
              Pre-Application Checklist
            </h3>
            <div className="space-y-3">
              {checklist.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl border border-gray-200 dark:border-gray-600"
                >
                  <input
                    type="checkbox"
                    className="mt-1 w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                  />
                  <label className="text-gray-700 dark:text-gray-300 font-medium flex-1">
                    {item}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
              <span className="text-4xl">💡</span>
              Pro Tips
            </h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/30 dark:to-orange-800/30 rounded-xl border border-orange-200 dark:border-orange-800">
                <p className="font-bold text-orange-900 dark:text-orange-200 mb-2">Quality over Quantity</p>
                <p className="text-sm text-orange-800 dark:text-orange-300">
                  Better to have 3 excellent projects than 10 mediocre ones. Focus on projects that solve real problems.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <p className="font-bold text-blue-900 dark:text-blue-200 mb-2">Document Everything</p>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  Write clear README files, comment complex code, create architecture diagrams, and record video demos.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl border border-green-200 dark:border-green-800">
                <p className="font-bold text-green-900 dark:text-green-200 mb-2">Be Active</p>
                <p className="text-sm text-green-800 dark:text-green-300">
                  Daily GitHub commits, regular blog posts, community engagement, and open source contributions.
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl border border-purple-200 dark:border-purple-800">
                <p className="font-bold text-purple-900 dark:text-purple-200 mb-2">Specialize</p>
                <p className="text-sm text-purple-800 dark:text-purple-300">
                  Choose a niche (DeFi, NFTs, Infrastructure), become expert in one area, build reputation in that space.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl shadow-2xl p-8 md:p-12 text-white">
          <h3 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">
            Ready to Start Your Career?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl mb-4">📚</div>
              <p className="font-bold text-lg mb-2">Learn</p>
              <p className="text-orange-100 text-sm">Complete all 86+ lessons</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">💻</div>
              <p className="font-bold text-lg mb-2">Build</p>
              <p className="text-orange-100 text-sm">Create portfolio projects</p>
            </div>
            <div className="text-center">
              <div className="text-5xl mb-4">🚀</div>
              <p className="font-bold text-lg mb-2">Deploy</p>
              <p className="text-orange-100 text-sm">Showcase your work</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/lessons/lesson-87-career-guide"
              className="inline-block px-8 py-4 bg-white text-orange-600 font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              Read Full Career Guide →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

