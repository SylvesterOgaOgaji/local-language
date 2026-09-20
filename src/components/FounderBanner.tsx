import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Globe, CheckCircle2, ShieldCheck, Copy, Check, ExternalLink } from 'lucide-react';

const GithubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
);

export const FounderBanner: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    try {
      navigator.clipboard.writeText('https://impactlearn-nigeria.slyokoh.workers.dev');
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  return (
    <section 
      aria-labelledby="founder-section-title"
      className="relative my-6 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8"
    >
      <div className="flex flex-col lg:flex-row items-center gap-6 justify-between">
        {/* Founder Profile & Credentials */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          {/* Avatar / Portrait treatment */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-zinc-900 dark:bg-zinc-100 flex flex-col items-center justify-center text-white dark:text-zinc-900 shadow-md">
              <span className="text-xl md:text-2xl font-bold tracking-tight">
                SO
              </span>
              <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-600">
                Nigeria 🇳🇬
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-600 text-white rounded-full p-1 shadow-sm" title="Project Owner & Lead">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              <span>Project Lead & Owner &bull; Official Work Sample</span>
            </div>
            <h2 id="founder-section-title" className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
              {t('founderName')}
            </h2>
            <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              {t('founderTitle')} &bull; <strong className="text-zinc-900 dark:text-zinc-200">{t('organizationName')}</strong>
            </p>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed pt-0.5">
              Pioneering inclusive digital safety, vocational empowerment, and practical security across Nigerian communities through accessible, indigenous language technologies.
            </p>
          </div>
        </div>

        {/* Action Controls & Badges */}
        <div className="flex flex-col items-center lg:items-end gap-3 shrink-0 w-full lg:w-auto border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800 pt-4 lg:pt-0">
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2.5 w-full">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 text-xs font-semibold transition-all shadow-sm active:scale-95"
              title="Copy portfolio link to clipboard"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied!' : 'Copy Live Link'}</span>
            </button>

            <a
              href="https://github.com/SylvesterOgaOgaji/local-language"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white hover:bg-zinc-50 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 text-xs font-semibold transition-all shadow-sm"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Cloudflare Deployed
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> 6 Nigerian Languages
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
