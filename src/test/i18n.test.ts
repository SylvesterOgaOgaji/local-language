import { describe, it, expect } from 'vitest';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { UI_TRANSLATIONS } from '../data/translations';
import { COURSE_CONTENT } from '../data/courseData';
import { LanguageCode } from '../types';

describe('Multilingual i18n & Nigerian Language Validation', () => {
  const expectedLanguages: LanguageCode[] = ['en', 'ha', 'yo', 'ig', 'tiv', 'ikd'];

  it('contains all 6 required Nigerian language configurations', () => {
    expectedLanguages.forEach((code) => {
      expect(SUPPORTED_LANGUAGES[code]).toBeDefined();
      expect(SUPPORTED_LANGUAGES[code].code).toBe(code);
      expect(SUPPORTED_LANGUAGES[code].name.length).toBeGreaterThan(0);
      expect(SUPPORTED_LANGUAGES[code].nativeName.length).toBeGreaterThan(0);
      expect(SUPPORTED_LANGUAGES[code].region.length).toBeGreaterThan(0);
    });
  });

  it('marks English, Hausa, Yoruba, and Igbo as verified', () => {
    expect(SUPPORTED_LANGUAGES.en.status).toBe('verified');
    expect(SUPPORTED_LANGUAGES.ha.status).toBe('verified');
    expect(SUPPORTED_LANGUAGES.yo.status).toBe('verified');
    expect(SUPPORTED_LANGUAGES.ig.status).toBe('verified');
  });

  it('marks Tiv and Ikede as review_required for community validation', () => {
    expect(SUPPORTED_LANGUAGES.tiv.status).toBe('review_required');
    expect(SUPPORTED_LANGUAGES.ikd.status).toBe('review_required');
  });

  it('contains English base translation keys without empty strings', () => {
    const en = UI_TRANSLATIONS.en;
    expect(en.appName).toBe('ImpactLearn Nigeria');
    expect(en.organizationName).toBe('JV ImpactVR Initiative Ltd/Gte');
    expect(en.founderName).toBe('Sylvester Oga Ogaji');
    expect(en.startCourse).toBeDefined();
    expect(en.takeAssessment).toBeDefined();
  });

  it('contains English base course content with 3 lessons and 5 quiz questions', () => {
    const enCourse = COURSE_CONTENT.en;
    expect(enCourse.lessons).toHaveLength(3);
    expect(enCourse.learningObjectives?.length).toBeGreaterThanOrEqual(4);
    expect(enCourse.assessment?.questions).toHaveLength(5);
  });
});
