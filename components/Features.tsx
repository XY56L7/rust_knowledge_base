'use client';

const features = [
  {
    icon: '📚',
    title: 'Comprehensive Curriculum',
    description: 'From Rust basics to advanced blockchain development, covering everything you need to know.',
  },
  {
    icon: '💻',
    title: 'Hands-On Projects',
    description: 'Build real-world projects with practical exercises and code examples in every lesson.',
  },
  {
    icon: '🔒',
    title: 'Security First',
    description: 'Learn security best practices and common vulnerabilities in smart contract development.',
  },
  {
    icon: '⚡',
    title: 'Performance Focused',
    description: 'Understand how Rust\'s zero-cost abstractions make it perfect for blockchain systems.',
  },
  {
    icon: '🌐',
    title: 'Real-World Examples',
    description: 'Study actual blockchain implementations from Solana, Polkadot, and NEAR Protocol.',
  },
  {
    icon: '🎯',
    title: 'Interview Ready',
    description: 'Prepare for blockchain developer interviews with comprehensive Q&A sections.',
  },
];

export default function Features() {
  return (
    <section id="about" className="py-24 bg-white dark:bg-gray-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-600 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6">
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Why Learn With Us?
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A complete learning experience designed to take you from beginner to blockchain expert
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/0 group-hover:from-orange-500/5 group-hover:to-orange-500/0 transition-all duration-300 rounded-2xl"></div>
              
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors break-words">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed break-words">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

