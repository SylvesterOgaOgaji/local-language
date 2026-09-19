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
      className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-3xl p-6 md:p-8 shadow-2xl border border-emerald-500/30 relative overflow-hidden my-6"
    >
      {/* Decorative background aura */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-6 justify-between">
        {/* Founder Profile & Credentials */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          {/* Avatar / Portrait treatment */}
          <div className="relative group shrink-0">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-emerald-400 via-amber-300 to-emerald-600 p-1 shadow-xl ring-4 ring-white/10">
              <div className="w-full h-full rounded-[14px] bg-slate-900 flex flex-col items-center justify-center text-white overflow-hidden relative">
                <span className="text-2xl md:text-3xl font-black tracking-wider text-amber-300">
                  SO
                </span>
                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest mt-0.5">
                  Nigeria 🇳🇬
                </span>
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-md border-2 border-slate-900" title="Project Owner & Lead">
              <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
              <Award className="w-3.5 h-3.5 text-amber-300" aria-hidden="true" />
              <span>Project Lead & Owner &bull; Portfolio Work Sample</span>
            </div>
            <h2 id="founder-section-title" className="text-2xl md:text-3xl font-black text-white tracking-tight">
              {t('founderName')}
            </h2>
            <p className="text-xs md:text-sm text-emerald-200/90 font-medium">
              {t('founderTitle')} &bull; <strong className="text-white">{t('organizationName')}</strong>
            </p>
            <p className="text-xs md:text-sm text-slate-300 max-w-xl leading-relaxed pt-1">
              Pioneering inclusive digital literacy and vocational empowerment across Nigerian communities through accessible, indigenous language technologies.
            </p>
          </div>
        </div>

        {/* Action Controls & Badges */}
        <div className="flex flex-col items-center lg:items-end gap-3 shrink-0 w-full lg:w-auto border-t lg:border-t-0 border-white/10 pt-4 lg:pt-0">
          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-2.5 w-full">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95 focus:ring-2 focus:ring-emerald-400"
              title="Copy portfolio link to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4 text-amber-300" />}
              <span>{copied ? 'Link Copied to Clipboard!' : 'Copy Live Portfolio Link'}</span>
            </button>

            <a
              href="https://github.com/SylvesterOgaOgaji/local-language"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all shadow-sm focus:ring-2 focus:ring-emerald-400"
            >
              <GithubIcon className="w-4 h-4 text-amber-300" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-emerald-300/90 font-medium">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Cloudflare Live
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-amber-300" /> 6 Nigerian Languages
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
