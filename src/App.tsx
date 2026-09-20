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
import { ScamSimulator } from './components/ScamSimulator';
import { PinStrengthChecker } from './components/PinStrengthChecker';
import { UssdDirectoryModal } from './components/UssdDirectoryModal';
import { 
  ShieldCheck, 
  BookOpen, 
  Award, 
  Clock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  RotateCcw,
  Sparkles,
  PhoneCall,
  Flame,
  Check
} from 'lucide-react';

type ViewMode = 'welcome' | 'lesson' | 'quiz' | 'certificate';

export const App: React.FC = () => {
  const { t, course, currentLanguage } = useLanguage();
  const [viewMode, setViewMode] = useState<ViewMode>('welcome');
  const [currentLessonIndex, setCurrentLessonIndex] = useState<number>(0);
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [isUssdModalOpen, setIsUssdModalOpen] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }
      if (viewMode === 'lesson') {
        if (e.key === 'ArrowRight' && currentLessonIndex < course.lessons.length - 1) {
          handleNextLesson();
        } else if (e.key === 'ArrowLeft' && currentLessonIndex > 0) {
          handlePreviousLesson();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, currentLessonIndex, course.lessons.length]);

  const handleStartCourse = (startIndex = 0) => {
    setCurrentLessonIndex(startIndex);
    setViewMode('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextLesson = () => {
    if (!completedLessons.includes(currentLessonIndex)) {
      setCompletedLessons((prev) => [...prev, currentLessonIndex]);
    }

    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setViewMode('quiz');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex((prev) => prev - 1);
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
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors font-sans antialiased">
      <Header />

      {/* Quick Emergency Dial Bar */}
      <div className="bg-zinc-900 text-zinc-200 px-4 py-2 text-xs flex items-center justify-between dark:bg-zinc-900 dark:border-b dark:border-zinc-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">
              Stolen Phone or ATM Card Emergency in Nigeria?
            </span>
          </div>
          <button
            onClick={() => setIsUssdModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-800 px-3 py-1 font-semibold text-zinc-100 hover:bg-zinc-700 transition"
          >
            <PhoneCall className="h-3 w-3 text-emerald-400" />
            <span>Open Bank Freeze Codes</span>
          </button>
        </div>
      </div>

      <main id="main-content" className="flex-1 container mx-auto px-4 py-6 max-w-4xl" tabIndex={-1}>
        {/* Founder & Project Ownership Highlight */}
        <FounderBanner />

        {/* View Router */}
        {viewMode === 'welcome' && (
          <section className="space-y-8 animate-in fade-in duration-200" aria-labelledby="course-welcome-title">
            {/* Hero Card */}
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-xs border border-zinc-200 dark:border-zinc-700">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Vocational Micro-Course &bull; 6 Nigerian Languages</span>
                </div>
                <h2 id="course-welcome-title" className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  {course.title}
                </h2>
                <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-medium">
                  {course.subtitle}
                </p>
              </div>

              {/* Meta stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800">
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-400 block uppercase">Duration</span>
                    <span className="text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200">{course.durationTotal}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800">
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-400 block uppercase">Curriculum</span>
                    <span className="text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200">{course.lessons.length} Core Modules</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-zinc-50 dark:bg-zinc-950/60 p-3.5 rounded-xl border border-zinc-200/70 dark:border-zinc-800">
                  <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold text-zinc-400 block uppercase">Outcome</span>
                    <span className="text-xs md:text-sm font-bold text-zinc-800 dark:text-zinc-200">Verified Certificate</span>
                  </div>
                </div>
              </div>

              {/* Module Directory Accordion / Grid */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Course Modules Overview
                  </h3>
                  <span className="text-xs text-zinc-500 font-medium">{course.lessons.length} Practical Modules</span>
                </div>

                <div className="space-y-2">
                  {course.lessons.map((lesson, idx) => (
                    <div
                      key={lesson.id}
                      onClick={() => handleStartCourse(idx)}
                      className="group flex cursor-pointer items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-3.5 transition hover:border-zinc-400 hover:bg-white dark:border-zinc-800 dark:bg-zinc-950/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-200/80 text-xs font-bold text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white dark:bg-zinc-800 dark:text-zinc-300 dark:group-hover:bg-zinc-100 dark:group-hover:text-zinc-900 transition">
                          {completedLessons.includes(idx) ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : idx + 1}
                        </div>
                        <div>
                          <h4 className="text-xs md:text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-950 dark:group-hover:text-white">
                            {lesson.title}
                          </h4>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                            {lesson.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
                        <span>{lesson.durationMinutes}m</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-950/60 space-y-3">
                <h3 className="text-xs md:text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{t('objectivesTitle')}</span>
                </h3>
                <ul className="space-y-2">
                  {course.learningObjectives.map((obj, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Audience Note */}
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <Users className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span><strong>Target Audience:</strong> {course.targetAudience}</span>
              </div>

              {/* Start Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleStartCourse(0)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 font-semibold text-sm rounded-xl shadow-sm transition-all active:scale-95"
                >
                  <span>{t('startCourse')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Defense Labs Section */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Flame className="h-4 w-4 text-amber-500" />
                <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
                  Interactive Vocational Defense Labs
                </h3>
              </div>

              {/* Scam Simulator */}
              <ScamSimulator />

              {/* PIN Strength Checker */}
              <PinStrengthChecker />
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
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-zinc-500">
              <button
                type="button"
                onClick={() => setViewMode('welcome')}
                className="hover:text-zinc-900 dark:hover:text-white underline"
              >
                &larr; Course Overview
              </button>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsUssdModalOpen(true)}
                  className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="h-3 w-3" />
                  Bank Freeze Codes
                </button>
                <span>
                  Language: <strong className="text-zinc-900 dark:text-zinc-100 uppercase">{currentLanguage}</strong>
                </span>
              </div>
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
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-zinc-500">
              <button
                type="button"
                onClick={() => setViewMode('lesson')}
                className="hover:text-zinc-900 dark:hover:text-white underline"
              >
                &larr; Return to Modules
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
            <div className="flex items-center justify-between gap-2 text-xs font-semibold text-zinc-500">
              <button
                type="button"
                onClick={handleRestartCourse}
                className="hover:text-zinc-900 dark:hover:text-white underline inline-flex items-center gap-1"
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

      {/* Emergency Bank USSD Freeze Modal */}
      <UssdDirectoryModal
        isOpen={isUssdModalOpen}
        onClose={() => setIsUssdModalOpen(false)}
      />

      <Footer />
    </div>
  );
};
