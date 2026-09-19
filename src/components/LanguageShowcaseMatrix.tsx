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
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
            Multilingual Matrix &middot; Local Language Work Samples
          </span>
          <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
            6 Nigerian Languages Available Instantly
          </h3>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300/60">
          <Globe className="w-3.5 h-3.5 text-emerald-600" />
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
              className={`p-3 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                isSelected
                  ? 'border-emerald-600 bg-emerald-50/80 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-100 shadow-md ring-2 ring-emerald-500/30'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-300 hover:border-emerald-400'
              }`}
            >
              <span className="text-sm font-black">{lang.nativeName}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{lang.name}</span>
              {lang.status === 'verified' ? (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-bold mt-0.5">
                  Verified
                </span>
              ) : (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-bold mt-0.5">
                  Review Req.
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Interactive Active Language Preview Card */}
      <div className="bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-950 dark:to-emerald-950/30 rounded-2xl p-5 border border-emerald-500/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white">
              Vocabulary Preview in <span className="text-emerald-600 dark:text-emerald-400">{availableLanguages.find(l => l.code === currentLanguage)?.nativeName}</span>
            </h4>
          </div>
          <span className="text-xs text-slate-500 font-semibold">
            {availableLanguages.find(l => l.code === currentLanguage)?.region}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">PIN / Passwords</span>
            <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">
              {keyVocabSample[currentLanguage]?.pin || keyVocabSample.en.pin}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Cyber Safety</span>
            <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">
              {keyVocabSample[currentLanguage]?.safety || keyVocabSample.en.safety}
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Scam Alerts</span>
            <p className="text-xs md:text-sm font-bold text-slate-800 dark:text-slate-200">
              {keyVocabSample[currentLanguage]?.scam || keyVocabSample.en.scam}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
