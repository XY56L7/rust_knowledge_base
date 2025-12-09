import { Course, Lesson, Chapter } from '@/types';
import courseData from '@/data/course.json';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function loadCourse(): Promise<Course> {
  return courseData as Course;
}

export async function loadChapter(chapterId: string): Promise<Chapter | null> {
  const course = await loadCourse();
  return course.chapters.find(ch => ch.id === chapterId) || null;
}

export async function loadLesson(lessonId: string): Promise<Lesson | null> {
  try {
    const filePath = join(process.cwd(), 'data', 'lessons', `${lessonId}.json`);
    const fileContents = readFileSync(filePath, 'utf8');
    const lessonData = JSON.parse(fileContents) as Lesson;
    return lessonData;
  } catch (error) {
    console.error(`Error loading lesson ${lessonId}:`, error);
    return null;
  }
}

export async function loadAllLessons(): Promise<Lesson[]> {
  const course = await loadCourse();
  const lessons: Lesson[] = [];
  
  for (const chapter of course.chapters) {
    for (const lessonId of chapter.lessons) {
      const lesson = await loadLesson(lessonId);
      if (lesson) {
        lessons.push(lesson);
      }
    }
  }
  
  return lessons;
}

export async function getNextLesson(currentLessonId: string): Promise<string | null> {
  const course = courseData as Course;
  
  for (const chapter of course.chapters) {
    const index = chapter.lessons.indexOf(currentLessonId);
    if (index !== -1) {
      if (index < chapter.lessons.length - 1) {
        for (let i = index + 1; i < chapter.lessons.length; i++) {
          const lesson = await loadLesson(chapter.lessons[i]);
          if (lesson) {
            return chapter.lessons[i];
          }
        }
      }
      const chapterIndex = course.chapters.indexOf(chapter);
      if (chapterIndex < course.chapters.length - 1) {
        for (let chIdx = chapterIndex + 1; chIdx < course.chapters.length; chIdx++) {
          const nextChapter = course.chapters[chIdx];
          for (const lessonId of nextChapter.lessons) {
            const lesson = await loadLesson(lessonId);
            if (lesson) {
              return lessonId;
            }
          }
        }
      }
    }
  }
  
  return null;
}

export async function getPreviousLesson(currentLessonId: string): Promise<string | null> {
  const course = courseData as Course;
  
  for (const chapter of course.chapters) {
    const index = chapter.lessons.indexOf(currentLessonId);
    if (index !== -1) {
      if (index > 0) {
        for (let i = index - 1; i >= 0; i--) {
          const lesson = await loadLesson(chapter.lessons[i]);
          if (lesson) {
            return chapter.lessons[i];
          }
        }
      }
      const chapterIndex = course.chapters.indexOf(chapter);
      if (chapterIndex > 0) {
        for (let chIdx = chapterIndex - 1; chIdx >= 0; chIdx--) {
          const prevChapter = course.chapters[chIdx];
          for (let i = prevChapter.lessons.length - 1; i >= 0; i--) {
            const lesson = await loadLesson(prevChapter.lessons[i]);
            if (lesson) {
              return prevChapter.lessons[i];
            }
          }
        }
      }
    }
  }
  
  return null;
}

