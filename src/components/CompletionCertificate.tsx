import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Award, Printer, RotateCcw, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface CompletionCertificateProps {
  scorePercentage: number;
  onRestartCourse: () => void;
}

export const CompletionCertificate: React.FC<CompletionCertificateProps> = ({
  scorePercentage,
  onRestartCourse,
}) => {
  const { t, course } = useLanguage();
  const [recipientName, setRecipientName] = useState<string>('');
  const [isNameSet, setIsNameSet] = useState<boolean>(false);

  const completionDate = new Date().toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Certificate Container (Optimized for Screen & Print) */}
      <div 
        id="printable-certificate"
        className="bg-white text-slate-900 border-8 border-double border-emerald-800 rounded-3xl p-6 md:p-12 shadow-2xl relative overflow-hidden text-center space-y-6 max-w-3xl mx-auto"
      >
        {/* Certificate Decorative Border Watermark */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-100 rounded-full opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-48 h-48 bg-amber-100 rounded-full opacity-30 pointer-events-none" />

        {/* Organization Brand Header */}
        <div className="space-y-1">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-800 flex items-center justify-center text-amber-300 shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-sm md:text-base font-extrabold uppercase tracking-widest text-emerald-900">
              JV ImpactVR Initiative Ltd/Gte
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 uppercase">
            {t('certificateTitle')}
          </h2>
          <p className="text-xs md:text-sm text-slate-500 font-medium">
            ImpactLearn Nigeria Vocational & Digital Safety Initiative
          </p>
        </div>

        {/* Presentation Statement */}
        <div className="space-y-3 py-2">
          <p className="text-xs md:text-sm text-slate-600 font-semibold italic">
            This is proudly awarded to
          </p>

          {!isNameSet ? (
            <div className="max-w-md mx-auto space-y-2 no-print">
              <label htmlFor="student-name-input" className="sr-only">
                {t('recipientNameLabel')}
              </label>
              <input
                id="student-name-input"
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder={t('recipientNamePlaceholder')}
                className="w-full text-center px-4 py-3 border-2 border-emerald-600 rounded-xl text-base md:text-lg font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              />
              <button
                type="button"
                disabled={!recipientName.trim()}
                onClick={() => setIsNameSet(true)}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white rounded-lg text-xs font-bold transition-all"
              >
                Set Name on Certificate
              </button>
            </div>
          ) : (
            <div className="group inline-block">
              <h3 className="text-2xl md:text-4xl font-extrabold text-emerald-900 border-b-2 border-emerald-800/40 pb-1 px-4 inline-block font-serif tracking-wide">
                {recipientName}
              </h3>
              <button
                type="button"
                onClick={() => setIsNameSet(false)}
                className="text-[10px] text-slate-400 hover:text-slate-600 underline block mt-1 mx-auto no-print"
              >
                Edit Name
              </button>
            </div>
          )}

          <p className="text-xs md:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed pt-2">
            for successfully completing the vocational micro-course in <strong className="text-slate-900 font-bold">{course.title}</strong> with an assessed score of <strong className="text-emerald-800 font-bold">{scorePercentage}%</strong>.
          </p>
        </div>

        {/* Signatures & Seal */}
        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-slate-200 max-w-lg mx-auto items-end">
          <div className="space-y-1 text-center">
            <div className="font-serif italic font-bold text-emerald-950 text-sm md:text-base">
              Sylvester Oga Ogaji
            </div>
            <div className="w-32 h-0.5 bg-slate-400 mx-auto" />
            <p className="text-[10px] md:text-xs font-bold text-slate-600 uppercase">
              Founder & Lead Innovator
            </p>
            <p className="text-[9px] text-slate-400">JV ImpactVR Initiative Ltd/Gte</p>
          </div>

          <div className="space-y-1 text-center">
            <div className="font-semibold text-slate-800 text-xs md:text-sm">
              {completionDate}
            </div>
            <div className="w-32 h-0.5 bg-slate-400 mx-auto" />
            <p className="text-[10px] md:text-xs font-bold text-slate-600 uppercase">
              Date Issued
            </p>
            <p className="text-[9px] text-slate-400">Federal Republic of Nigeria</p>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="text-[10px] text-slate-400 pt-2">
          Certificate ID: IMP-NG-{Math.floor(100000 + Math.random() * 900000)} &bull; Verified by ImpactLearn Multilingual Skills Platform
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 no-print">
        <button
          type="button"
          onClick={handlePrint}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-lg hover:scale-[1.02] transition-all min-h-[48px]"
        >
          <Printer className="w-4 h-4" />
          <span>{t('downloadCertificate')}</span>
        </button>

        <button
          type="button"
          onClick={onRestartCourse}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all min-h-[48px]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{t('restartCourse')}</span>
        </button>
      </div>

      {/* Digital Safety Checklist to Keep */}
      <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 space-y-4 no-print">
        <h4 className="text-lg md:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-500" />
          <span>{t('safetyChecklistTitle')}</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-slate-700 dark:text-slate-300">
          <div className="flex items-start gap-2 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Never share your 4-digit banking PIN or 6-digit WhatsApp registration code with anyone.</span>
          </div>
          <div className="flex items-start gap-2 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Do not click unsolicited links in SMS or forwarded WhatsApp messages claiming free ₦50,000 grants.</span>
          </div>
          <div className="flex items-start gap-2 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Shield your keypad at POS kiosks and never shout your PIN to agents or bystanders.</span>
          </div>
          <div className="flex items-start gap-2 bg-white dark:bg-slate-950 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Know your bank emergency USSD block code (*919*9#, *737*911#, *966*911#) in case your phone is stolen.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
