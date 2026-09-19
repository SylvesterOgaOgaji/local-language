import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { LanguageCode, LanguageInfo, UIStrings, Course, Lesson, QuizQuestion } from '../types';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../data/languages';
import { UI_TRANSLATIONS } from '../data/translations';
import { COURSE_CONTENT } from '../data/courseData';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  languageInfo: LanguageInfo;
  setLanguage: (lang: LanguageCode) => void;
  availableLanguages: LanguageInfo[];
  t: (key: keyof UIStrings) => string;
  course: Course;
  isReviewRequired: boolean;
  isFallbackActive: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>(() => {
    try {
      const saved = localStorage.getItem('impactlearn_lang') as LanguageCode;
      if (saved && SUPPORTED_LANGUAGES[saved]) {
        return saved;
      }
    } catch {
      // ignore
    }
    return DEFAULT_LANGUAGE;
  });

  const setLanguage = (lang: LanguageCode) => {
    if (SUPPORTED_LANGUAGES[lang]) {
      setCurrentLanguageState(lang);
      try {
        localStorage.setItem('impactlearn_lang', lang);
      } catch {
        // ignore
      }
    }
  };

  const languageInfo = SUPPORTED_LANGUAGES[currentLanguage] || SUPPORTED_LANGUAGES[DEFAULT_LANGUAGE];
  const isReviewRequired = languageInfo.status === 'review_required';

  // Translation helper with English fallback
  const t = (key: keyof UIStrings): string => {
    const langStrings = UI_TRANSLATIONS[currentLanguage];
    if (langStrings && langStrings[key]) {
      return langStrings[key]!;
    }
    const defaultStrings = UI_TRANSLATIONS[DEFAULT_LANGUAGE];
    return defaultStrings[key] || String(key);
  };

  // Structured Course fallback resolver
  const course: Course = useMemo(() => {
    const defaultCourse = COURSE_CONTENT[DEFAULT_LANGUAGE] as Course;
    const targetCourse = COURSE_CONTENT[currentLanguage];

    if (!targetCourse || currentLanguage === DEFAULT_LANGUAGE) {
      return defaultCourse;
    }

    // Merge lessons with fallback
    const mergedLessons: Lesson[] = defaultCourse.lessons.map((defLesson, lIndex) => {
      const targetLesson = targetCourse.lessons?.[lIndex];
      if (!targetLesson) return defLesson;

      return {
        ...defLesson,
        title: targetLesson.title || defLesson.title,
        subtitle: targetLesson.subtitle || defLesson.subtitle,
        durationMinutes: targetLesson.durationMinutes || defLesson.durationMinutes,
        sections: defLesson.sections.map((defSec, sIndex) => {
          const targetSec = targetLesson.sections?.[sIndex];
          if (!targetSec) return defSec;

          return {
            ...defSec,
            heading: targetSec.heading || defSec.heading,
            content: targetSec.content && targetSec.content.length > 0 ? targetSec.content : defSec.content,
            bulletPoints: targetSec.bulletPoints && targetSec.bulletPoints.length > 0 ? targetSec.bulletPoints : defSec.bulletPoints,
            keyTakeaway: targetSec.keyTakeaway || defSec.keyTakeaway,
            audioNarrationText: targetSec.audioNarrationText || defSec.audioNarrationText,
            practicalExample: targetSec.practicalExample || defSec.practicalExample,
          };
        }),
      };
    });

    // Merge questions with fallback
    const mergedQuestions: QuizQuestion[] = defaultCourse.assessment.questions.map((defQ, qIndex) => {
      const targetQ = targetCourse.assessment?.questions?.[qIndex];
      if (!targetQ) return defQ;

      return {
        ...defQ,
        scenario: targetQ.scenario || defQ.scenario,
        question: targetQ.question || defQ.question,
        options: targetQ.options && targetQ.options.length === defQ.options.length ? targetQ.options : defQ.options,
        correctOptionId: targetQ.correctOptionId || defQ.correctOptionId,
        explanation: targetQ.explanation || defQ.explanation,
        nigerianContextNote: targetQ.nigerianContextNote || defQ.nigerianContextNote,
      };
    });

    return {
      id: targetCourse.id || defaultCourse.id,
      title: targetCourse.title || defaultCourse.title,
      subtitle: targetCourse.subtitle || defaultCourse.subtitle,
      organization: targetCourse.organization || defaultCourse.organization,
      durationTotal: targetCourse.durationTotal || defaultCourse.durationTotal,
      targetAudience: targetCourse.targetAudience || defaultCourse.targetAudience,
      learningObjectives: targetCourse.learningObjectives && targetCourse.learningObjectives.length > 0
        ? targetCourse.learningObjectives
        : defaultCourse.learningObjectives,
      lessons: mergedLessons,
      assessment: {
        title: targetCourse.assessment?.title || defaultCourse.assessment.title,
        description: targetCourse.assessment?.description || defaultCourse.assessment.description,
        passingScorePercentage: targetCourse.assessment?.passingScorePercentage || defaultCourse.assessment.passingScorePercentage,
        questions: mergedQuestions,
      },
    };
  }, [currentLanguage]);

  const isFallbackActive = useMemo(() => {
    return currentLanguage !== DEFAULT_LANGUAGE && (
      isReviewRequired ||
      !COURSE_CONTENT[currentLanguage]?.lessons ||
      (COURSE_CONTENT[currentLanguage]?.lessons?.length || 0) < (COURSE_CONTENT[DEFAULT_LANGUAGE]?.lessons?.length || 0)
    );
  }, [currentLanguage, isReviewRequired]);

  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languageInfo,
        setLanguage,
        availableLanguages: Object.values(SUPPORTED_LANGUAGES),
        t,
        course,
        isReviewRequired,
        isFallbackActive,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
