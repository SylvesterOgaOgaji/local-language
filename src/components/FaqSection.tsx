import React, { useState } from 'react';
import { HelpCircle, ChevronDown, CheckCircle2 } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Computer & Society & Digital Rights',
    question: 'How does the "Computer and Society" perspective apply to Nigerian cybersecurity?',
    answer: 'Computer and Society examines the intersection of technology, human behavior, law, and social inequality. In Nigeria, digital transformation has outpaced basic digital literacy, leaving informal traders, market women, and youth vulnerable to predatory cyber syndicates. Providing practical cybersecurity education in indigenous languages empowers citizens to protect their privacy rights (under the Nigeria Data Protection Act) and participate safely in the digital economy.',
  },
  {
    category: 'Predatory Loan Apps & Privacy (NDPA)',
    question: 'What legal and technical steps should I take against predatory loan app defamation in Nigeria?',
    answer: 'Under the Nigeria Data Protection Act (NDPA) and FCCPC directives, scraping contact lists and defaming third parties is illegal. Technical defense: 1. Deny contact and SMS permissions in Android settings. 2. Never download unverified APK files from WhatsApp or Facebook. 3. Report harassing numbers and apps directly to the Nigeria Data Protection Commission (NDPC) and FCCPC.',
  },
  {
    category: 'AI & Social Engineering Threats',
    question: 'How can I protect my family against AI voice cloning and fake emergency kidnapping calls?',
    answer: 'Modern scammers can clone a loved one’s voice using short social media clips to demand urgent ransom or bail. Always establish a private family "safe word" that an imposter cannot guess, and never transfer money in panic without hanging up and calling your relative back directly on their trusted phone number.',
  },
  {
    category: 'Emergency Financial Defense',
    question: 'What are the official USSD freeze codes if my phone or ATM card is stolen in Nigeria?',
    answer: 'Act within 5 minutes from ANY phone: GTBank (*737*911#), UBA (*919*9#), Zenith Bank (*966*911#), FirstBank (*894*911#), Access Bank (*901*911#), OPay (*955*911#), PalmPay (*861*0#), Moniepoint (*5573*911#), Fidelity (*770*911#), Stanbic (*909*911#). Follow up by contacting your telecom provider (MTN 180, Airtel 111, Glo 121, 9mobile 200) to lock your SIM line.',
  },
  {
    category: 'POS & Informal Market Safety',
    question: 'How do market merchants and buyers protect themselves from fake SMS credit alerts at POS points?',
    answer: 'Never release goods or cash solely based on an SMS notification or customer screenshot. Fraudsters use SMS spoofing apps to generate fake credit alerts. Always check your actual in-app available balance or your dedicated POS terminal receipt before handing over goods.',
  },
  {
    category: 'Languages & Accessibility',
    question: 'Which Nigerian languages are supported on ImpactLearn?',
    answer: 'ImpactLearn Nigeria supports 6 languages: English (National Lingua Franca), Hausa (Northern Nigeria), Yoruba (South-Western Nigeria), Igbo (South-Eastern Nigeria), Tiv (North-Central Nigeria / Benue Valley), and Ikede / Igede (Middle Belt). Translations for Tiv and Ikede are under community review and display clear fallback notices to maintain accuracy.',
  },
  {
    category: 'Organization & Leadership',
    question: 'Who developed ImpactLearn Nigeria?',
    answer: 'ImpactLearn Nigeria is developed by JV ImpactVR Initiative Ltd/Gte, Nigeria, founded and led by Sylvester Oga Ogaji (Lead Project Innovator), to deliver inclusive vocational empowerment, cyber safety, and digital literacy across diverse Nigerian linguistic communities.',
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
          <span>Computer & Society &middot; Frequently Asked Questions</span>
        </div>
        <h3 id="faq-section-title" className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Frequently Asked Questions (FAQ) & Knowledge Base
        </h3>
        <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Practical answers on Nigerian cyber threats, privacy rights under NDPA, predatory loan app defense, and emergency bank freeze protocols.
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
