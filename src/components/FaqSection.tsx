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
    question: 'Which Nigerian languages are currently supported on ImpactLearn?',
    answer: 'ImpactLearn Nigeria supports 6 languages: English (National Lingua Franca), Hausa (Northern Nigeria), Yoruba (South-Western Nigeria), Igbo (South-Eastern Nigeria), Tiv (North-Central Nigeria/Benue Valley), and Ikede/Igede (Middle Belt). Unverified phrases gracefully fallback to English to ensure pedagogical clarity.',
  },
  {
    category: 'Course & Certification',
    question: 'How do I earn the verified Certificate of Completion?',
    answer: 'Learners complete the 3 practical lessons on Smartphone & Internet Safety and take the 5-question scenario assessment. Scoring 80% or higher generates a personalized certificate issued by JV ImpactVR Initiative Ltd/Gte with Founder Sylvester Oga Ogaji’s signature block.',
  },
  {
    category: 'Cyber Safety in Nigeria',
    question: 'What should I do if I receive a fake ₦50,000 Federal Grant SMS or BVN threat?',
    answer: 'Follow the 3-Step Safety Rule: 1. Block and Report the sender as spam. 2. Never forward the message to WhatsApp family or church groups. 3. If you suspect account compromise, immediately dial your bank official emergency USSD code (*919*9#, *737*911#, *966*911#) to freeze your account.',
  },
  {
    category: 'Organization & Leadership',
    question: 'Who developed ImpactLearn Nigeria?',
    answer: 'ImpactLearn Nigeria is developed by JV ImpactVR Initiative Ltd/Gte, Nigeria, led by Sylvester Oga Ogaji (Founder & Lead Innovator), to provide inclusive vocational empowerment and digital safety education for Nigerian youth, artisans, traders, and students.',
  },
  {
    category: 'Accessibility & Audio',
    question: 'Can I listen to lessons if I have low literacy or visual impairments?',
    answer: 'Yes! ImpactLearn includes Web Speech API Read Aloud text-to-speech audio for every lesson, high-contrast themes, dynamic text scaling (A/A+/A++), and a low-distraction single-section focus mode compliant with WCAG 2.1 AA/AAA standards.',
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
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl space-y-6"
    >
      <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Frequently Asked Questions &middot; SEO Knowledge Base</span>
        </div>
        <h3 id="faq-section-title" className="text-xl md:text-2xl font-black text-slate-900 dark:text-white">
          Frequently Asked Questions (FAQ)
        </h3>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Everything you need to know about multilingual learning, cyber safety, and certification in Nigeria.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                className="w-full text-left p-4 md:p-5 flex items-center justify-between gap-4 bg-slate-50/70 dark:bg-slate-950/40 hover:bg-slate-100/80 dark:hover:bg-slate-800/60 transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                    {faq.category}
                  </span>
                  <span className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white">
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-emerald-600' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  className="p-4 md:p-5 bg-white dark:bg-slate-900 text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 animate-in fade-in"
                >
                  <p className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
