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
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 no-print">
      <div className="container mx-auto px-4 py-12 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Shield className="w-5 h-5 text-amber-300" />
              </div>
              <span className="font-extrabold text-lg text-white">
                Impact<span className="text-emerald-400">Learn</span> Nigeria
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              An accessible vocational learning and cyber hygiene platform by <strong className="text-slate-200">JV ImpactVR Initiative Ltd/Gte</strong>. Designed to deliver practical digital skills across Nigerian communities regardless of literacy or language barriers.
            </p>
            <div className="pt-2 text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Project Owner: {t('founderName')}</span>
            </div>
          </div>

          {/* Languages & Regional Coverage */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Supported Nigerian Languages</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {availableLanguages.map((l) => (
                <div key={l.code} className="flex items-center gap-1.5 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="font-medium text-slate-300">{l.nativeName}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 pt-1">
              * Hausa, Yoruba, Igbo verified. Tiv and Ikede (Igede) marked for ongoing community review.
            </p>
          </div>

          {/* Verification & Tech Stack */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider">
              Deployment & Repository
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a
                  href="https://github.com/SylvesterOgaOgaji/local-language"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub: SylvesterOgaOgaji/local-language</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Production Target: Cloudflare Pages</span>
              </li>
              <li>Accessibility: WCAG 2.1 AA/AAA Compliant</li>
              <li>Stack: Vite &bull; React &bull; TypeScript &bull; Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Translation Disclaimer Notice */}
        <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-1">
          <p className="font-bold text-slate-300">
            Community Translation & Accuracy Protocol:
          </p>
          <p>
            JV ImpactVR Initiative Ltd/Gte is dedicated to accurate, respectful representation of all Nigerian indigenous languages. Translations are developed using reliable references and marked with transparent status indicators. Unverified phrases fallback automatically to English to maintain pedagogical safety and clarity. Native-speaker language groups and linguists are invited to participate in continuous validation.
          </p>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} JV ImpactVR Initiative Ltd/Gte, Nigeria. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> for Nigerian learners by <strong className="text-slate-300">Sylvester Oga Ogaji</strong>.
          </p>
        </div>
      </div>
    </footer>
  );
};
