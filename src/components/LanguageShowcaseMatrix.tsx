import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageCode } from '../types';
import { Globe, ShieldCheck } from 'lucide-react';

export const LanguageShowcaseMatrix: React.FC = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useLanguage();

  const keyVocabSample: Record<LanguageCode, { pin: string; safety: string; scam: string; button: string }> = {
    en: {
      pin: 'Secret Banking PIN',
      safety: 'Smartphone & Internet Safety',
      scam: 'Fake Giveaway & Phishing Alert',
      button: 'Start Learning (English)',
    },
    ha: {
      pin: 'Lambar Sirri ta Banki',
      safety: 'Tsaron Wayar Salula da Intanet',
      scam: 'Sakonnin Yaudara da Cutarwa',
      button: 'Fara Karatu (Harshen Hausa)',
    },
    yo: {
      pin: 'Nomba Asiri Ile-Ifowopamo',
      safety: 'Abo Foonu ati Ero Ayelujara',
      scam: 'Atejise Etan ati Iroyin Eke',
      button: 'Bere Eko (Èdè Yorùbá)',
    },
    ig: {
      pin: 'Nọmba Nzuzo Maka Ụlọ Akụ',
      safety: 'Nchekwa Ekwentị na Ịntanetị',
      scam: 'Ozi Aghụghọ na Ozi Adịgboroja',
      button: 'Bido Ọmụmụ (Asụsụ Igbo)',
    },
    tiv: {
      pin: 'PIN u Kuran Inyaregh You',
      safety: 'Mhen u Kuran Phone man Intanet',
      scam: 'Loho u Aie man Ifan sha Intanet',
      button: 'Hii Ityesen (Zwa Tiv)',
    },
    ikd: {
      pin: 'PIN nya Nchekwa Banki',
      safety: 'Nchekwa Ekwentị bala Intanet',
      scam: 'Ilo nya Aie bala O-bobo',
      button: 'Hii Iye-ehe (Ikede / Igede)',
    },
  };

  return (
    <div className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
            Multilingual Matrix &middot; Local Language Work Samples
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            6 Nigerian Languages Available Instantly
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold border border-zinc-200 dark:border-zinc-700">
          <Globe className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
          <span>Switch Language Below</span>
        </div>
      </div>

      {/* Language Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        {availableLanguages.map((lang) => {
          const isSelected = currentLanguage === lang.code;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code as LanguageCode)}
              className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                isSelected
                  ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                  : 'border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              <span className="text-sm font-bold">{lang.nativeName}</span>
              <span className={`text-[10px] font-medium ${isSelected ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'}`}>{lang.name}</span>
              {lang.status === 'verified' ? (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold mt-0.5 ${isSelected ? 'bg-zinc-800 text-emerald-300 dark:bg-zinc-200 dark:text-emerald-700' : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'}`}>
                  Verified
                </span>
              ) : (
                <span className={`text-[9px] px-1.5 py-0.2 rounded font-semibold mt-0.5 ${isSelected ? 'bg-zinc-800 text-amber-300 dark:bg-zinc-200 dark:text-amber-700' : 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300'}`}>
                  Review Req.
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Active Language Preview Card */}
      <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-5 dark:border-zinc-800 dark:bg-zinc-950/40 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              Vocabulary Preview in <span className="text-emerald-600 dark:text-emerald-400">{availableLanguages.find(l => l.code === currentLanguage)?.nativeName}</span>
            </h4>
          </div>
          <span className="text-xs text-zinc-500 font-medium">
            {availableLanguages.find(l => l.code === currentLanguage)?.region}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">PIN / Passwords</span>
            <p className="text-xs md:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {keyVocabSample[currentLanguage]?.pin || keyVocabSample.en.pin}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Cyber Safety</span>
            <p className="text-xs md:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {keyVocabSample[currentLanguage]?.safety || keyVocabSample.en.safety}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 p-3 rounded-xl border border-zinc-200/80 dark:border-zinc-800 space-y-1">
            <span className="text-[10px] font-semibold text-zinc-400 uppercase">Scam Alerts</span>
            <p className="text-xs md:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
              {keyVocabSample[currentLanguage]?.scam || keyVocabSample.en.scam}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
