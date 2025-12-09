#!/usr/bin/env node

/**
 * Egyszerű script új lecke létrehozásához
 * Használat: node scripts/create-lesson.js lesson-id "Lecke címe"
 */

const fs = require('fs');
const path = require('path');

const lessonId = process.argv[2];
const lessonTitle = process.argv[3];

if (!lessonId || !lessonTitle) {
  console.error('Használat: node scripts/create-lesson.js <lesson-id> "Lecke címe"');
  console.error('Példa: node scripts/create-lesson.js lesson-5-ownership "Ownership alapok"');
  process.exit(1);
}

const lessonTemplate = {
  id: lessonId,
  title: lessonTitle,
  description: "Lecke leírása",
  content: `# ${lessonTitle}\n\nItt jön a lecke tartalma markdown formátumban...\n\n## Alfejezet\n\nTartalom...`,
  difficulty: "beginner",
  estimatedTime: 20,
  codeExamples: [],
  exercises: []
};

const lessonPath = path.join(__dirname, '..', 'data', 'lessons', `${lessonId}.json`);

if (fs.existsSync(lessonPath)) {
  console.error(`Hiba: A ${lessonId}.json fájl már létezik!`);
  process.exit(1);
}

fs.writeFileSync(lessonPath, JSON.stringify(lessonTemplate, null, 2), 'utf-8');

console.log(`✅ Lecke létrehozva: ${lessonPath}`);
console.log(`\n⚠️  Ne felejtsd el hozzáadni a lecke ID-ját a data/course.json fájlhoz!`);


