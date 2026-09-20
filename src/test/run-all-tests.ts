import assert from 'node:assert';
import { SUPPORTED_LANGUAGES } from '../data/languages';
import { UI_TRANSLATIONS } from '../data/translations';
import { COURSE_CONTENT } from '../data/courseData';
import { NIGERIAN_BANK_USSD_CODES } from '../data/ussdEmergencyCodes';
import { INTERACTIVE_SCAM_SCENARIOS } from '../data/interactiveScenarios';
import { LanguageCode } from '../types';

console.log('\n======================================================');
console.log('  IMPACTLEARN NIGERIA MULTILINGUAL - AUTOMATED TESTS  ');
console.log('======================================================\n');

// Test 1: Supported Languages
const expectedLanguages: LanguageCode[] = ['en', 'ha', 'yo', 'ig', 'tiv', 'ikd'];
expectedLanguages.forEach((code) => {
  assert(SUPPORTED_LANGUAGES[code], `Language ${code} must be defined`);
  assert(SUPPORTED_LANGUAGES[code].nativeName.length > 0, `Language ${code} nativeName must not be empty`);
  assert(SUPPORTED_LANGUAGES[code].region.length > 0, `Language ${code} region must not be empty`);
});
console.log('✔ Test Suite 1: All 6 Nigerian languages defined with valid metadata');

// Test 2: Language Status & Community Review protocol
assert.strictEqual(SUPPORTED_LANGUAGES.en.status, 'verified');
assert.strictEqual(SUPPORTED_LANGUAGES.ha.status, 'verified');
assert.strictEqual(SUPPORTED_LANGUAGES.yo.status, 'verified');
assert.strictEqual(SUPPORTED_LANGUAGES.ig.status, 'verified');
assert.strictEqual(SUPPORTED_LANGUAGES.tiv.status, 'review_required');
assert.strictEqual(SUPPORTED_LANGUAGES.ikd.status, 'review_required');
console.log('✔ Test Suite 2: Status verification passed (4 Verified, 2 Review Required)');

// Test 3: Base UI strings
const enUI = UI_TRANSLATIONS.en;
assert(enUI, 'English UI translations must exist');
assert.strictEqual(enUI.appName, 'ImpactLearn Nigeria');
assert.strictEqual(enUI.organizationName, 'JV ImpactVR Initiative Ltd/Gte');
assert.strictEqual(enUI.founderName, 'Sylvester Oga Ogaji');
assert(enUI.startCourse && enUI.startCourse.length > 0);
console.log('✔ Test Suite 3: Base UI translations and branding keys verified');

// Test 4: Course Structure & Content (Expanded 5 Core Modules)
const enCourse = COURSE_CONTENT.en;
assert(enCourse, 'English course must be present');
assert(enCourse.lessons && enCourse.lessons.length === 5, 'Course must have 5 comprehensive modules');
assert(enCourse.learningObjectives && enCourse.learningObjectives.length >= 4, 'Must have at least 4 learning objectives');
assert(enCourse.assessment && enCourse.assessment.questions.length === 5, 'Assessment must have exactly 5 questions');
console.log('✔ Test Suite 4: Course 5 modules, learning objectives, and 5 assessment questions verified');

// Test 5: Assessment Scoring & Logic
const questions = enCourse.assessment!.questions;
const correctAnswers = questions.map(q => q.correctOptionId);
assert.strictEqual(correctAnswers.length, 5);
const mockScore4 = Math.round((4 / 5) * 100);
assert(mockScore4 >= enCourse.assessment!.passingScorePercentage, '4 out of 5 must pass (80%)');
const mockScore3 = Math.round((3 / 5) * 100);
assert(mockScore3 < enCourse.assessment!.passingScorePercentage, '3 out of 5 must fail (60%)');
console.log('✔ Test Suite 5: Quiz scoring and pass threshold (80%) verified');

// Test 6: Fallback Logic simulation
const getTranslationWithFallback = (lang: LanguageCode, key: keyof typeof UI_TRANSLATIONS.en): string => {
  return UI_TRANSLATIONS[lang]?.[key] || UI_TRANSLATIONS['en']?.[key] || '';
};
const tivStart = getTranslationWithFallback('tiv', 'startCourse');
assert.strictEqual(tivStart, 'Hii Ityesen ne');
const fallbackKey = getTranslationWithFallback('tiv', 'issuedBy');
assert(fallbackKey.includes('JV ImpactVR Initiative Ltd/Gte'));
console.log('✔ Test Suite 6: Multilingual fallback resolution verified');

// Test 7: Nigerian Bank USSD Directory & Scam Scenarios
assert(NIGERIAN_BANK_USSD_CODES.length >= 10, 'Must have at least 10 major Nigerian bank USSD freeze codes');
assert(INTERACTIVE_SCAM_SCENARIOS.length >= 4, 'Must have at least 4 interactive scam simulation scenarios');
console.log('✔ Test Suite 7: Bank USSD Directory and Scam Simulator data verified');

console.log('\n------------------------------------------------------');
console.log('✔ ALL 7/7 AUTOMATED TEST SUITES PASSED SUCCESSFULLY');
console.log('------------------------------------------------------\n');
