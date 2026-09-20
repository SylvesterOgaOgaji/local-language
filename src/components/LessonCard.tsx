import React, { useState } from 'react';
import { Lesson } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAccessibility } from '../context/AccessibilityContext';
import { PracticalExampleCard } from './PracticalExampleCard';
import { AudioPlayerControl } from './AudioPlayerControl';
import { CheckCircle2, ChevronLeft, ChevronRight, BookmarkCheck, Clock, ShieldAlert } from 'lucide-react';

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

  const sectionsToRender = simplifiedMode
    ? [lesson.sections[activeSectionIndex] || lesson.sections[0]]
    : lesson.sections;

  return (
    <article 
      aria-labelledby={`lesson-heading-${lesson.id}`}
      className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8 space-y-6"
    >
      {/* Lesson Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold text-xs border border-zinc-200 dark:border-zinc-700">
            Module {lessonIndex + 1} of {totalLessons}
          </span>
          <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 text-xs font-medium">
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{lesson.durationMinutes} mins</span>
          </div>
        </div>

        {/* Section Paging in Simplified View */}
        {simplifiedMode && lesson.sections.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">
              Section {activeSectionIndex + 1} of {lesson.sections.length}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                disabled={activeSectionIndex === 0}
                onClick={() => setActiveSectionIndex(prev => Math.max(0, prev - 1))}
                aria-label="Previous Section"
                className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                disabled={activeSectionIndex === lesson.sections.length - 1}
                onClick={() => setActiveSectionIndex(prev => Math.min(lesson.sections.length - 1, prev + 1))}
                aria-label="Next Section"
                className="p-1 rounded-lg border border-zinc-200 dark:border-zinc-700 disabled:opacity-30 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Title & Subtitle */}
      <div>
        <h3 id={`lesson-heading-${lesson.id}`} className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          {lesson.title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium mt-1">
          {lesson.subtitle}
        </p>
      </div>

      {/* Sections List */}
      <div className="space-y-8 divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {sectionsToRender.map((section, sIndex) => {
          const narrationText = section.audioNarrationText || `${section.heading}. ${section.content.join(' ')}. Key rule: ${section.keyTakeaway}`;
          return (
            <div key={section.id || sIndex} className={sIndex > 0 ? 'pt-8 space-y-5' : 'space-y-5'}>
              {/* Section Heading & Audio Narration Trigger */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h4 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shrink-0" aria-hidden="true" />
                  {section.heading}
                </h4>
                <AudioPlayerControl textToRead={narrationText} label="Listen to Section" />
              </div>

              {/* Paragraph Content */}
              <div className="space-y-3 text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm md:text-base font-normal">
                {section.content.map((p, pIndex) => (
                  <p key={pIndex}>{p}</p>
                ))}
              </div>

              {/* Bullet Points */}
              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4 md:p-5 dark:border-zinc-800 dark:bg-zinc-950/60">
                  <h5 className="font-semibold text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400 mb-3 flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" aria-hidden="true" />
                    Essential Safety Protocol
                  </h5>
                  <ul className="space-y-2">
                    {section.bulletPoints.map((bp, bpIndex) => (
                      <li key={bpIndex} className="flex items-start gap-2.5 text-xs md:text-sm text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Takeaway Highlight */}
              {section.keyTakeaway && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200 flex items-start gap-3">
                  <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-900/80 shrink-0 text-emerald-700 dark:text-emerald-300">
                    <BookmarkCheck className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-0.5">
                      {t('keyTakeawayLabel')}
                    </span>
                    <p className="text-sm font-semibold leading-relaxed">
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
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-zinc-100 dark:border-zinc-800/80 pt-6">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isFirstLesson}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-xs md:text-sm transition-all shadow-sm"
        >
          <ChevronLeft className="w-4 h-4" aria-hidden="true" />
          <span>{t('previousLesson')}</span>
        </button>

        {!isLastLesson ? (
          <button
            type="button"
            onClick={onNext}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 font-semibold text-xs md:text-sm transition-all shadow-sm active:scale-95"
          >
            <span>{t('nextLesson')}</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onTakeQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs md:text-sm shadow-sm transition-all active:scale-95"
          >
            <span>{t('takeAssessment')}</span>
            <ChevronRight className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </article>
  );
};
