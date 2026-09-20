import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Globe, Heart, CheckCircle2 } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const Footer: React.FC = () => {
  const { t, availableLanguages } = useLanguage();

  return (
    <footer className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 mt-16 no-print">
      <div className="container mx-auto px-4 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900 font-bold">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-zinc-900 dark:text-zinc-100">
                ImpactLearn Nigeria
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              An accessible vocational learning and cyber hygiene platform by <strong className="text-zinc-800 dark:text-zinc-200">JV ImpactVR Initiative Ltd/Gte</strong>. Designed to deliver practical digital skills across Nigerian communities regardless of literacy or language barriers.
            </p>
            <div className="pt-1 text-xs text-zinc-800 dark:text-zinc-200 font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Project Owner: {t('founderName')}</span>
            </div>
          </div>

          {/* Languages & Regional Coverage */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Supported Nigerian Languages</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {availableLanguages.map((l) => (
                <div key={l.code} className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">{l.nativeName}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 pt-1">
              * Hausa, Yoruba, Igbo verified. Tiv and Ikede (Igede) marked for ongoing community review.
            </p>
          </div>

          {/* Verification & Tech Stack */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
              Deployment & Repository
            </h4>
            <ul className="space-y-2 text-xs text-zinc-500 dark:text-zinc-400">
              <li>
                <a
                  href="https://github.com/SylvesterOgaOgaji/local-language"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-800 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white font-medium"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>GitHub: SylvesterOgaOgaji/local-language</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Production Target: Cloudflare Pages / Workers</span>
              </li>
              <li>Accessibility: WCAG 2.1 AA/AAA Standards</li>
              <li>Stack: Vite &bull; React &bull; TypeScript &bull; Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Translation Disclaimer Notice */}
        <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-4 dark:border-zinc-800 dark:bg-zinc-900/50 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed space-y-1">
          <p className="font-semibold text-zinc-800 dark:text-zinc-200">
            Community Translation & Accuracy Protocol:
          </p>
          <p>
            JV ImpactVR Initiative Ltd/Gte is dedicated to accurate, respectful representation of all Nigerian indigenous languages. Translations are developed using reliable references and marked with transparent status indicators. Unverified phrases fallback automatically to English to maintain pedagogical safety and clarity. Native-speaker language groups and linguists are invited to participate in continuous validation.
          </p>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-zinc-100 dark:border-zinc-800/80 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-zinc-400 dark:text-zinc-500">
          <p>
            &copy; {new Date().getFullYear()} JV ImpactVR Initiative Ltd/Gte, Nigeria. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3 h-3 text-rose-500 fill-current" /> for Nigerian learners by <strong className="text-zinc-700 dark:text-zinc-300">Sylvester Oga Ogaji</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
};
