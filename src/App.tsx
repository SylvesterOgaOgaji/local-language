import React, { useState, useEffect } from 'react';
import { useLanguage } from './context/LanguageContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FounderBanner } from './components/FounderBanner';
import { LessonCard } from './components/LessonCard';
import { AssessmentQuiz } from './components/AssessmentQuiz';
import { CompletionCertificate } from './components/CompletionCertificate';
import { LanguageShowcaseMatrix } from './components/LanguageShowcaseMatrix';
import { FaqSection } from './components/FaqSection';
import { 
  ShieldCheck, 
  BookOpen, 
  Award, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw,
  Sparkles
} from 'lucide-react';

type ViewMode = 'welcome' | 'lesson' | 'quiz' | 'certificate';

export const App: React.FC = () => {
  const { t, course, currentLanguage } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('welcome');
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept when typing in text inputs
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (viewMode === 'lesson') {
        if (e.key === 'ArrowRight' && currentLessonIndex < course.lessons.length - 1) {
          setCurrentLessonIndex(prev => prev + 1);
        } else if (e.key === 'ArrowLeft' && currentLessonIndex > 0) {
          setCurrentLessonIndex(prev => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentLessonIndex, course.lessons.length]);

  const handleStartCourse = () => {
    setCurrentLessonIndex(0);
    setViewMode('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setViewMode('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setViewMode('welcome');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleQuizComplete = (scorePercentage: number) => {
    setQuizScore(scorePercentage);
    if (scorePercentage >= course.assessment.passingScorePercentage) {
      setViewMode('certificate');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartCourse = () => {
    setCurrentLessonIndex(0);
    setQuizScore(null);
    setViewMode('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Header />

      <main id="main-content" className="flex-1 container mx-auto px-4 py-6 max-w-4xl" tabIndex={-1}>
        {/* Founder & Project Ownership Highlight */}
        <FounderBanner />

        {/* View Router */}
        {viewMode === 'welcome' && (
          <section className="space-y-8 animate-in fade-in duration-200" aria-labelledby="course-welcome-title">
            {/* Hero Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-10 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs border border-emerald-300/60">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Vocational Micro-Course &bull; 6 Nigerian Languages</span>
                </div>
                <h2 id="course-welcome-title" className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {course.title}
                </h2>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 font-medium">
                  {course.subtitle}
                </p>
              </div>

              {/* Meta stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Duration</span>
                    <span className="text-xs md:text-sm font-extrabold text-slate-800 dark:text-slate-200">{course.durationTotal}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Lessons</span>
                    <span className="text-xs md:text-sm font-extrabold text-slate-800 dark:text-slate-200">{course.lessons.length} Core Lessons</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-400 block uppercase">Outcome</span>
                    <span className="text-xs md:text-sm font-extrabold text-slate-800 dark:text-slate-200">Verified Certificate</span>
                  </div>
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 rounded-2xl p-5 md:p-6 space-y-4">
                <h3 className="text-sm md:text-base font-extrabold text-emerald-950 dark:text-emerald-200 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('objectivesTitle')}</span>
                </h3>
                <ul className="space-y-2.5">
                  {course.learningObjectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs md:text-sm text-slate-800 dark:text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Audience Note */}
              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <Users className="w-4 h-4 text-slate-400 shrink-0" />
                <span><strong>Target Audience:</strong> {course.targetAudience}</span>
              </div>

              {/* Start Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartCourse}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base rounded-2xl shadow-xl hover:shadow-emerald-600/30 transition-all hover:scale-[1.02] active:scale-95 focus:ring-4 focus:ring-emerald-400 min-h-[52px]"
                >
                  <span>{t('startCourse')}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Language Showcase Matrix for Reviewers */}
            <LanguageShowcaseMatrix />

            {/* Comprehensive SEO FAQ Section */}
            <FaqSection />
          </section>
        )}

        {viewMode === 'lesson' && (
          <div className="space-y-6">
            {/* Navigation crumb */}
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
              <button
                type="button"
                onClick={() => setViewMode('welcome')}
                className="hover:text-slate-900 dark:hover:text-white underline"
              >
                &larr; Course Overview
              </button>
              <span>
                Language: <strong className="text-emerald-600 dark:text-emerald-400 uppercase">{currentLanguage}</strong>
              </span>
            </div>

            <LessonCard
              lesson={course.lessons[currentLessonIndex]}
              lessonIndex={currentLessonIndex}
              totalLessons={course.lessons.length}
              onPrevious={handlePreviousLesson}
              onNext={handleNextLesson}
              onTakeQuiz={() => {
                setViewMode('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              isFirstLesson={currentLessonIndex === 0}
              isLastLesson={currentLessonIndex === course.lessons.length - 1}
            />
          </div>
        )}

        {viewMode === 'quiz' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
              <button
                type="button"
                onClick={() => setViewMode('lesson')}
                className="hover:text-slate-900 dark:hover:text-white underline"
              >
                &larr; Return to Lessons
              </button>
              <span>Passing Requirement: {course.assessment.passingScorePercentage}%</span>
            </div>

            <AssessmentQuiz
              onComplete={handleQuizComplete}
              onBackToLessons={() => setViewMode('lesson')}
            />
          </div>
        )}

        {viewMode === 'certificate' && quizScore !== null && (
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-slate-500">
              <button
                type="button"
                onClick={handleRestartCourse}
                className="hover:text-slate-900 dark:hover:text-white underline inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Return to Course Start</span>
              </button>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Course Completed</span>
            </div>

            <CompletionCertificate
              scorePercentage={quizScore}
              onRestartCourse={handleRestartCourse}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};
