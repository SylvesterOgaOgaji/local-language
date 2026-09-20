export type LanguageCode = 'en' | 'ha' | 'yo' | 'ig' | 'tiv' | 'ikd';

export type TranslationStatus = 'verified' | 'review_required';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  region: string;
  speakers: string;
  status: TranslationStatus;
  flagEmoji?: string;
  linguisticNotes?: string;
}

export type TextSize = 'normal' | 'large' | 'xlarge';
export type ContrastMode = 'default' | 'high-contrast' | 'sepia';

export interface AccessibilitySettings {
  textSize: TextSize;
  contrastMode: ContrastMode;
  simplifiedMode: boolean;
  speechRate: number;
}

export interface PracticalExample {
  id: string;
  title: string;
  scenario: string;
  badAction: string;
  goodAction: string;
  nigeriaContextTip: string;
}

export interface LessonSection {
  id: string;
  heading: string;
  content: string[];
  bulletPoints?: string[];
  keyTakeaway: string;
  practicalExample?: PracticalExample;
  audioNarrationText?: string;
  checklist?: string[];
}

export interface Lesson {
  id: number;
  slug: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  durationMinutes: number;
  sections: LessonSection[];
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: number;
  scenario: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  nigerianContextNote: string;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  organization: string;
  durationTotal: string;
  targetAudience: string;
  learningObjectives: string[];
  lessons: Lesson[];
  assessment: {
    title: string;
    description: string;
    passingScorePercentage: number;
    questions: QuizQuestion[];
  };
}

export interface BankUssdCode {
  bankName: string;
  shortName: string;
  generalUssd: string;
  blockAccountUssd: string;
  blockCardUssd?: string;
  customerCare: string;
}

export interface InteractiveScamScenario {
  id: string;
  sender: string;
  channel: 'SMS' | 'WhatsApp' | 'Email' | 'Phone Call';
  messageText: string;
  isScam: boolean;
  indicators: string[];
  explanation: string;
}

export interface UIStrings {
  appName: string;
  organizationName: string;
  founderName: string;
  founderTitle: string;
  tagline: string;
  languageSelectorLabel: string;
  translationDisclaimerBadge: string;
  translationReviewRequiredNotice: string;
  startCourse: string;
  continueCourse: string;
  nextLesson: string;
  previousLesson: string;
  takeAssessment: string;
  retakeAssessment: string;
  viewCertificate: string;
  readAloud: string;
  pauseAudio: string;
  stopAudio: string;
  audioNotSupported: string;
  objectivesTitle: string;
  practicalTipTitle: string;
  wrongActionLabel: string;
  safeActionLabel: string;
  keyTakeawayLabel: string;
  quizTitle: string;
  submitAnswer: string;
  nextQuestion: string;
  scoreLabel: string;
  passedMessage: string;
  tryAgainMessage: string;
  certificateTitle: string;
  issuedBy: string;
  recipientNameLabel: string;
  recipientNamePlaceholder: string;
  downloadCertificate: string;
  highContrastToggle: string;
  textSizeToggle: string;
  simplifiedViewToggle: string;
  fallbackNotice: string;
  safetyChecklistTitle: string;
  restartCourse: string;
}
