# 🦀 Rust Developer Course - From Beginner to Advanced

A modern, interactive Next.js website for teaching the Rust programming language. The project is fully powered by JSON files, making it easy to extend and maintain.

## 🚀 Features

- **Interactive Lessons**: Detailed lessons in markdown format
- **Code Examples**: Syntax highlighting with explanations
- **Exercises**: Practice problems with solutions and hints
- **Progressive Curriculum**: Structured course from beginner to advanced level
- **Modern UI**: Responsive design with dark mode support
- **JSON-based**: All content from JSON files, easily editable

## 📁 Project Structure

```
rust-for-beginners/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page
│   ├── lessons/           # Lesson pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── CodeBlock.tsx      # Code display
│   └── ExerciseCard.tsx   # Exercise card
├── data/                  # JSON data files
│   ├── course.json        # Course structure
│   └── lessons/           # Lesson files
├── types/                 # TypeScript types
│   └── index.ts
└── utils/                 # Helper functions
    └── dataLoader.ts      # Data loader
```

## 🛠️ Installation and Running

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open in browser: [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📝 Adding a New Lesson

### Automatic Method (Recommended)

Use the built-in script:

```bash
npm run create-lesson lesson-X-title "Lesson Title"
```

This creates a template JSON file in the `data/lessons/` directory.

### Manual Method

1. **Update Course Structure**: Edit the `data/course.json` file and add the new lesson ID to the appropriate chapter.

2. **Create Lesson File**: Create a new JSON file in the `data/lessons/` directory, for example `lesson-X-title.json`.

3. **Lesson Structure**:

```json
{
  "id": "lesson-X-title",
  "title": "Lesson Title",
  "description": "Short description",
  "content": "# Markdown Content\n\nYou can write in markdown format here...",
  "difficulty": "beginner|intermediate|advanced",
  "estimatedTime": 20,
  "prerequisites": ["lesson-1-introduction"],
  "codeExamples": [
    {
      "id": "ex-1",
      "title": "Example Title",
      "description": "Description",
      "code": "fn main() {\n    println!(\"Hello!\");\n}",
      "explanation": "Explanation",
      "language": "rust"
    }
  ],
  "exercises": [
    {
      "id": "exercise-1",
      "title": "Exercise Title",
      "description": "Description",
      "starterCode": "fn main() {\n}",
      "solution": "fn main() {\n    println!(\"Solution\");\n}",
      "hints": ["Hint 1", "Hint 2"],
      "difficulty": "easy|medium|hard"
    }
  ]
}
```

## 🎨 Customization

### Colors and Styles

The Tailwind CSS configuration is in the `tailwind.config.ts` file. Colors and styles can be easily modified.

### Dark Mode

Dark mode works automatically based on system settings. It can be customized in the `app/globals.css` file.

## 📚 Current Course Content

The course consists of 14 chapters covering:

1. **Rust Fundamentals for Blockchain** - Introduction, variables, data types, functions
2. **Memory Safety & Ownership** - Rust's unique memory management
3. **Data Structures for Blockchain** - Structs, enums, and pattern matching
4. **Error Handling in Blockchain** - Result and Option types
5. **Collections & Data Management** - Vectors, hash maps, strings
6. **Code Organization** - Modules and packages
7. **Blockchain Fundamentals** - Understanding blockchain architecture
8. **Cryptography for Blockchain** - Security primitives
9. **Consensus Mechanisms** - Agreement algorithms
10. **Smart Contracts & WebAssembly** - Contract development
11. **P2P Networking** - Decentralized communication
12. **Advanced Blockchain Topics** - Optimization and patterns
13. **Deployment & Operations** - Production deployment
14. **Project Architecture & Structure** - Best practices and patterns

## 🔧 Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Markdown** - Markdown rendering
- **JSON** - Data storage and configuration

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

The project is easily extensible with new lessons. Simply add the new lesson JSON file to the `data/lessons/` directory and update the `course.json` file.

---

**Made with love for the Rust community** 🦀
