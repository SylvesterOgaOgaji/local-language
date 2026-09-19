import React, { useState } from 'react';
import { Lesson } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { PracticalExampleCard } from './PracticalExampleCard';
import { AudioPlayerControl } from './AudioPlayerControl';
import { CheckCircle2, ChevronLeft, ChevronRight, BookmarkCheck, Clock, Layers } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  lessonIndex: number;
  totalLessons: number;
  onPrevious: () => void;
  onNext: () => void;
  onTakeQuiz: () => void;
  isFirstLesson: boolean;
  isLastLesson: boolean;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  lessonIndex,
  totalLessons,
  onPrevious,
  onNext,
  onTakeQuiz,
  isFirstLesson,
  isLastLesson,
}) => {
  const { t } = useLanguage();
  const { simplifiedMode } = useAccessibility();
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);

  // In simplified mode, show one section at a time; otherwise render all sections for seamless scrolling
  const sectionsToRender = simplifiedMode
    ? [lesson.sections[activeSectionIndex] || lesson.sections[0]]
    : lesson.sections;

  return (
    <article 
      aria-labelledby={`lesson-heading-${lesson.id}`}
      className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg p-5 md:p-8 space-y-6"
    >
      {/* Lesson Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold text-xs md:text-sm border border-emerald-300/60">
            Lesson {lessonIndex + 1} of {totalLessons}
          </span>
          <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{lesson.durationMinutes} mins</span>
          </div>
        </div>

        {/* Section Paging in Simplified View */}
        {simplifiedMode && lesson.sections.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              Section {activeSectionIndex + 1} of {lesson.sections.length}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={activeSectionIndex === 0}
                onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                aria-label="Previous Section"
                className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={activeSectionIndex === lesson.sections.length - 1}
                onClick={() => setActiveSectionIndex(prev => Math.min(lesson.sections.length - 1, prev + 1))}
                aria-label="Next Section"
                className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Title & Subtitle */}
      <div>
        <h3 id={`lesson-heading-${lesson.id}`} className="text-xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          {lesson.title}
        </h3>
        <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 font-medium mt-1">
          {lesson.subtitle}
        </p>
      </div>

      {/* Sections List */}
      <div className="space-y-8 divide-y divide-slate-100 dark:divide-slate-900">
        {sectionsToRender.map((section, sIndex) => {
          const narrationText = section.audioNarrationText || `${section.heading}. ${section.content.join(' ')}. Key rule: ${section.keyTakeaway}`;
          return (
            <div key={section.id || sIndex} className={sIndex > 0 ? 'pt-8 space-y-5' : 'space-y-5'}>
              {/* Section Heading & Audio Narration Trigger */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-emerald-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
                  {section.heading}
                </h4>
                <AudioPlayerControl textToRead={narrationText} label="Listen to Section" />
              </div>

              {/* Paragraph Content */}
              <div className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed font-normal text-sm md:text-base">
                {section.content.map((p, pIndex) => (
                  <p key={pIndex}>{p}</p>
                ))}
              </div>

              {/* Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <div className="bg-slate-50 dark:bg-slate-900/60 rounded-2xl p-4 md:p-5 border border-slate-200/80 dark:border-slate-800">
                  <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                    Essential Safety Rules
                  </h5>
                  <ul className="space-y-2.5">
                    {section.bulletPoints.map((bp, bpIndex) => (
                      <li key={bpIndex} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-800 dark:text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Takeaway Highlight */}
              {section.keyTakeaway && (
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-2xl p-4 md:p-5 shadow-md flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white/15 shrink-0">
                    <BookmarkCheck className="w-5 h-5 text-amber-300" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-200 block mb-0.5">
                      {t('keyTakeawayLabel')}
                    </span>
                    <p className="text-sm md:text-base font-bold text-white leading-snug">
                      {section.keyTakeaway}
                    </p>
                  </div>
                </div>
              )}

              {/* Practical Scenario Example Card */}
              {section.practicalExample && (
                <PracticalExampleCard example={section.practicalExample} />
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstLesson}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-sm transition-all focus:ring-2 focus:ring-emerald-500 min-h-[48px]"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>{t('previousLesson')}</span>
        </button>

        {!isLastLesson ? (
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-95 focus:ring-2 focus:ring-emerald-400 min-h-[48px]"
          >
            <span>{t('nextLesson')}</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onTakeQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-lg transition-all hover:scale-[1.02] active:scale-95 focus:ring-2 focus:ring-amber-400 min-h-[48px]"
          >
            <span>{t('takeAssessment')}</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
};
