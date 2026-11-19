export type Theme = 'light' | 'dark';
export type TopicStatus = 'not-started' | 'learning' | 'mastered';
export interface Subject { id: string; name: string; color: string; createdAt: string }
export interface Topic { id: string; subjectId: string; title: string; status: TopicStatus; notes: string; createdAt: string }
export interface Flashcard { id: string; subjectId: string; question: string; answer: string; createdAt: string }
export interface Exam { id: string; subjectId: string; title: string; date: string; notes: string; createdAt: string }
export interface StudySession { id: string; subjectId: string | null; startedAt: string; durationMinutes: number; completed: boolean }
export interface StudyState { subjects: Subject[]; topics: Topic[]; flashcards: Flashcard[]; exams: Exam[]; sessions: StudySession[]; theme: Theme; dailyGoalMinutes: number; remindersEnabled: boolean }