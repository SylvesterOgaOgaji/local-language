import { LanguageInfo } from '../types';

export const SUPPORTED_LANGUAGES: Record<string, LanguageInfo> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English (Nigeria)',
    region: 'National / Official',
    speakers: 'Official lingua franca across all 36 states',
    status: 'verified',
    flagEmoji: '🇳🇬',
  },
  ha: {
    code: 'ha',
    name: 'Hausa',
    nativeName: 'Harshen Hausa',
    region: 'Northern Nigeria (Kano, Kaduna, Sokoto, Katsina, etc.)',
    speakers: 'Over 50+ million speakers across West Africa',
    status: 'verified',
    flagEmoji: '🇳🇬',
  },
  yo: {
    code: 'yo',
    name: 'Yoruba',
    nativeName: 'Èdè Yorùbá',
    region: 'South-Western Nigeria (Lagos, Oyo, Ogun, Osun, Ondo, Ekiti, Kwara)',
    speakers: 'Over 45+ million speakers',
    status: 'verified',
    flagEmoji: '🇳🇬',
  },
  ig: {
    code: 'ig',
    name: 'Igbo',
    nativeName: 'Asụsụ Igbo',
    region: 'South-Eastern Nigeria (Enugu, Anambra, Imo, Abia, Ebonyi, Delta)',
    speakers: 'Over 30+ million speakers',
    status: 'verified',
    flagEmoji: '🇳🇬',
  },
  tiv: {
    code: 'tiv',
    name: 'Tiv',
    nativeName: 'Zwa Tiv',
    region: 'North-Central Nigeria (Benue, Taraba, Nasarawa, Plateau)',
    speakers: 'Over 5+ million speakers',
    status: 'review_required',
    flagEmoji: '🇳🇬',
  },
  ikd: {
    code: 'ikd',
    name: 'Ikede / Igede',
    nativeName: 'Ikede (Igede)',
    region: 'North-Central / South-Eastern Border (Oju, Obi, Benue & Cross River)',
    speakers: 'Over 500,000+ speakers in Middle Belt / Benue Valley',
    status: 'review_required',
    flagEmoji: '🇳🇬',
  },
};

export const DEFAULT_LANGUAGE = 'en';
