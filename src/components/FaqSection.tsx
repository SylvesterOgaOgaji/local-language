import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Languages & Accessibility',
    question: 'Which Nigerian languages are supported on ImpactLearn?',
    answer: 'ImpactLearn Nigeria supports 6 languages: English (National Lingua Franca), Hausa (Northern Nigeria), Yoruba (South-Western Nigeria), Igbo (South-Eastern Nigeria), Tiv (North-Central Nigeria / Benue Valley), and Ikede / Igede (Middle Belt). Translations for Tiv and Ikede are under community review and display clear fallback notices to maintain accuracy.',
  },
  {
    category: 'Course Curriculum & Certification',
    question: 'What modules are included and how do I earn a certificate?',
    answer: 'The micro-course comprises 5 in-depth modules: 1. SIM Card & USSD Defense, 2. Phishing & WhatsApp Hijacks, 3. POS Safety & Fake Credit Alerts, 4. Public Wi-Fi & Malicious APKs, and 5. Emergency Incident Response & Bank Freeze Codes. Completing the scenario assessment with 80% or higher generates a verified certificate issued by JV ImpactVR Initiative Ltd/Gte.',
  },
  {
    category: 'Cyber Safety in Nigeria',
    question: 'What should I do immediately if my phone is stolen in Nigeria?',
    answer: 'Act within 5 minutes: 1. Borrow any phone and dial your bank’s USSD emergency block code (e.g. *919*9# for UBA, *737*911# for GTBank, *966*911# for Zenith) to lock account debits. 2. Contact your telecom provider (MTN, Airtel, Glo, 9mobile) to lock your SIM line so fraudsters cannot intercept OTPs. 3. Log into your banking app from a secure computer to change login passwords.',
  },
  {
    category: 'Organization & Leadership',
    question: 'Who developed ImpactLearn Nigeria?',
    answer: 'ImpactLearn Nigeria is developed by JV ImpactVR Initiative Ltd/Gte, Nigeria, founded and led by Sylvester Oga Ogaji (Lead Project Innovator), to provide inclusive vocational empowerment, cyber safety, and digital literacy across diverse Nigerian linguistic communities.',
  },
  {
    category: 'Accessibility & Audio Support',
    question: 'Is audio narration available for low-literacy or visually impaired learners?',
    answer: 'Yes. ImpactLearn includes Web Speech API Read Aloud audio for all lessons, high-contrast and warm viewing modes, scalable typography (A / A+ / A++), and a distraction-free Focus View compliant with WCAG 2.1 AA/AAA accessibility standards.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section 
      aria-labelledby="faq-section-title"
      className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8 space-y-6"
    >
      <div className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Frequently Asked Questions &middot; Knowledge Base</span>
        </div>
        <h3 id="faq-section-title" className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h3>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Everything you need to know about multilingual learning, cyber safety, and vocational certification in Nigeria.
        </p>
      </div>

      <div className="space-y-2.5">
        {FAQ_ITEMS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="w-full text-left p-4 flex items-center justify-between gap-4 bg-zinc-50/60 dark:bg-zinc-950/40 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    {faq.category}
                  </span>
                  <span className="font-semibold text-sm md:text-base text-zinc-900 dark:text-zinc-100">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-zinc-800 dark:text-zinc-200' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  className="p-4 bg-white dark:bg-zinc-900 text-xs md:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 animate-in fade-in"
                >
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{faq.answer}</span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
