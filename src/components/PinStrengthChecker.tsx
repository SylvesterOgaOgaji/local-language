import React, { useState } from 'react';
import { KeyRound, ShieldAlert, ShieldCheck, Info } from 'lucide-react';

interface AnalysisResult {
  score: 'weak' | 'moderate' | 'strong';
  title: string;
  reasons: string[];
  recommendation: string;
}

export const PinStrengthChecker: React.FC = () => {
  const [pin, setPin] = useState('');

  const analyzePin = (input: string): AnalysisResult | null => {
    if (!input) return null;
    const clean = input.trim();
    if (clean.length !== 4 && clean.length !== 6) {
      return {
        score: 'weak',
        title: 'Incomplete PIN',
        reasons: ['Nigerian ATM and USSD banking PINs are 4 digits; mobile banking app PINs are usually 4 or 6 digits.'],
        recommendation: 'Enter a 4-digit or 6-digit numeric PIN.',
      };
    }

    if (!/^\d+$/.test(clean)) {
      return {
        score: 'weak',
        title: 'Numeric Digits Only',
        reasons: ['PINs must contain only numeric digits (0-9).'],
        recommendation: 'Use only numbers for banking PINs.',
      };
    }

    const commonPins = [
      '1234', '0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999',
      '1212', '2020', '2024', '2025', '2026', '1990', '1995', '1998', '2000', '2580', '0852',
      '4321', '9876', '1357', '2468', '1122', '123456', '000000', '111111', '654321'
    ];

    if (commonPins.includes(clean)) {
      return {
        score: 'weak',
        title: 'Extremely High Risk (Known Default / Pattern)',
        reasons: [
          'This is in the top 20 most guessed PINs by criminals in Nigeria.',
          'Fraudsters test sequential (1234), keypad columns (2580), and repeated digits (0000) first.',
        ],
        recommendation: 'Choose a random combination of numbers with no obvious sequence or visual line on the keypad.',
      };
    }

    // Check if it looks like a year (e.g., 1950 - 2026)
    const num = parseInt(clean, 10);
    if (clean.length === 4 && num >= 1950 && num <= 2026) {
      return {
        score: 'weak',
        title: 'High Risk (Likely Birth Year)',
        reasons: [
          'Looks like a birth year (1950–2026). If a thief steals your phone or wallet, your BVN, Voter Card, or Driver’s License will reveal your birth year immediately.',
        ],
        recommendation: 'Never use your birth year, wedding year, or child’s birthday as your ATM or USSD PIN.',
      };
    }

    // Check repeated digits like 1188, 3377
    if (clean.length === 4 && (clean[0] === clean[1] && clean[2] === clean[3])) {
      return {
        score: 'moderate',
        title: 'Moderate Risk (Paired Repetition)',
        reasons: ['Double-number patterns (e.g. AA-BB) are significantly easier for shoulder surfers to spot.'],
        recommendation: 'Use 4 distinct or non-adjacent digits.',
      };
    }

    return {
      score: 'strong',
      title: 'Strong & Resilient PIN',
      reasons: [
        'No obvious chronological sequences (like 1234 or 4321).',
        'No simple keypad lines or identical repeated digits.',
        'Not an obvious birth year range.',
      ],
      recommendation: 'Keep this PIN strictly secret. Never write it on your ATM card or tell POS operators.',
    };
  };

  const analysis = analyzePin(pin);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8">
      <div className="mb-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          <KeyRound className="h-3.5 w-3.5" />
          Vocational Safety Tool
        </div>
        <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Nigerian Bank PIN Strength Tester
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Test sample 4-digit or 6-digit combinations to understand how Nigerian fraudsters guess ATM and USSD codes. (Simulated locally — never enter your real live banking PIN!)
        </p>
      </div>

      <div className="mb-5">
        <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5">
          Enter a Test 4-Digit or 6-Digit PIN:
        </label>
        <div className="relative max-w-xs">
          <input
            type="text"
            maxLength={6}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
            placeholder="e.g. 1234 or 2024"
            className="w-full rounded-xl border border-zinc-300 bg-zinc-50 px-4 py-2.5 text-lg font-mono tracking-widest text-zinc-900 focus:border-zinc-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-zinc-400/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-500"
          />
          {pin.length > 0 && (
            <button
              onClick={() => setPin('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {analysis && (
        <div
          className={`rounded-xl border p-4 text-sm transition-all ${
            analysis.score === 'strong'
              ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-200'
              : analysis.score === 'moderate'
              ? 'border-amber-200 bg-amber-50/70 text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-200'
              : 'border-rose-200 bg-rose-50/70 text-rose-950 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold">
            {analysis.score === 'strong' ? (
              <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
            ) : (
              <ShieldAlert className="h-5 w-5 text-rose-600 dark:text-rose-400" />
            )}
            <span>{analysis.title}</span>
          </div>

          <div className="mt-2 space-y-1.5 text-xs">
            <ul className="list-disc pl-4 space-y-1">
              {analysis.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            <p className="pt-2 font-medium">
              <strong>Action Rule:</strong> {analysis.recommendation}
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 flex items-start gap-2 rounded-lg bg-zinc-50 p-3 text-xs text-zinc-500 dark:bg-zinc-800/40 dark:text-zinc-400">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-zinc-400" />
        <span>
          <strong>Vocational Tip:</strong> In Nigeria, 70% of phone-snatch banking theft succeeds because victims used their birth year or `1234` on their SIM cards or USSD banking. Setting an unguessable SIM PIN prevents phone thieves from receiving OTPs.
        </span>
      </div>
    </div>
  );
};
