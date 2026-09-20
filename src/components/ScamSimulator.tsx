import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, MessageSquare, ArrowRight, RotateCcw, Smartphone } from 'lucide-react';
import { INTERACTIVE_SCAM_SCENARIOS } from '../data/interactiveScenarios';

export const ScamSimulator: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userChoice, setUserChoice] = useState<'scam' | 'legit' | null>(null);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const scenario = INTERACTIVE_SCAM_SCENARIOS[currentIndex];
  const isAnswered = userChoice !== null;

  const handleSelect = (choice: 'scam' | 'legit') => {
    if (isAnswered) return;
    setUserChoice(choice);
    const isCorrect = (choice === 'scam' && scenario.isScam) || (choice === 'legit' && !scenario.isScam);
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < INTERACTIVE_SCAM_SCENARIOS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setUserChoice(null);
    } else {
      setShowSummary(true);
    }
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setUserChoice(null);
    setScore(0);
    setShowSummary(false);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-950/50 dark:text-amber-300">
            <ShieldAlert className="h-3.5 w-3.5" />
            Interactive Defense Practice
          </div>
          <h3 className="mt-1 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Nigerian Scam & Fake SMS Simulator
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Test your ability to spot real-world phishing messages, fake credit alerts, and WhatsApp hijack tricks.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-300 sm:self-center">
          <span>Case {currentIndex + 1} of {INTERACTIVE_SCAM_SCENARIOS.length}</span>
          <span className="text-zinc-300 dark:text-zinc-600">|</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{score} Correct</span>
        </div>
      </div>

      {showSummary ? (
        <div className="text-center py-6">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h4 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Simulation Completed!
          </h4>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400 max-w-md mx-auto text-sm">
            You scored <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{score} out of {INTERACTIVE_SCAM_SCENARIOS.length}</strong>. 
            {score === INTERACTIVE_SCAM_SCENARIOS.length
              ? ' Outstanding vigilance! You are well-equipped to protect your funds.'
              : ' Good effort! Review the security indicators below to stay bulletproof against fraudsters.'}
          </p>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              <RotateCcw className="h-4 w-4" />
              Restart Simulator
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* Simulated Phone Message Bubble */}
          <div className="mb-6 rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mb-3 flex items-center justify-between border-b border-zinc-200/80 pb-2.5 text-xs text-zinc-500 dark:border-zinc-800">
              <div className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
                {scenario.channel === 'WhatsApp' ? (
                  <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
                ) : (
                  <Smartphone className="h-3.5 w-3.5 text-blue-600" />
                )}
                <span>Channel: {scenario.channel}</span>
              </div>
              <div>
                Sender: <strong className="text-zinc-800 dark:text-zinc-200">{scenario.sender}</strong>
              </div>
            </div>

            <div className="rounded-lg bg-white p-4 font-mono text-sm leading-relaxed text-zinc-800 shadow-sm border border-zinc-200/70 dark:bg-zinc-900 dark:text-zinc-200 dark:border-zinc-800">
              {scenario.messageText}
            </div>
          </div>

          {/* Action Choice Buttons */}
          {!isAnswered ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                onClick={() => handleSelect('scam')}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-rose-200 bg-rose-50/50 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 hover:border-rose-300 dark:border-rose-900/50 dark:bg-rose-950/20 dark:text-rose-300 dark:hover:bg-rose-950/40"
              >
                <AlertTriangle className="h-4 w-4" />
                Flag as SCAM / Fraud
              </button>
              <button
                onClick={() => handleSelect('legit')}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-200 bg-emerald-50/50 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100 hover:border-emerald-300 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-300 dark:hover:bg-emerald-950/40"
              >
                <CheckCircle2 className="h-4 w-4" />
                Mark as Safe / Legitimate
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Result Banner */}
              <div
                className={`rounded-xl border p-4 text-sm ${
                  (userChoice === 'scam' && scenario.isScam) || (userChoice === 'legit' && !scenario.isScam)
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/40 dark:text-emerald-200'
                    : 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800/60 dark:bg-rose-950/40 dark:text-rose-200'
                }`}
              >
                <div className="font-bold flex items-center gap-2">
                  {(userChoice === 'scam' && scenario.isScam) || (userChoice === 'legit' && !scenario.isScam) ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      Correct Decision!
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                      Danger! That was a {scenario.isScam ? 'Dangerous Scam' : 'Legitimate Notification'}.
                    </>
                  )}
                </div>
                <p className="mt-1.5 leading-relaxed">{scenario.explanation}</p>
              </div>

              {/* Red Flags / Indicators */}
              <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-xs dark:border-zinc-800 dark:bg-zinc-950/60">
                <div className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2 uppercase tracking-wider">
                  Key Verification Indicators:
                </div>
                <ul className="list-disc pl-4 space-y-1 text-zinc-600 dark:text-zinc-400">
                  {scenario.indicators.map((ind, idx) => (
                    <li key={idx}>{ind}</li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  <span>{currentIndex < INTERACTIVE_SCAM_SCENARIOS.length - 1 ? 'Next Scenario' : 'View Results'}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
