import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { CheckCircle, XCircle, Award, RotateCcw, ArrowRight, HelpCircle, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';

interface AssessmentQuizProps {
  onComplete: (scorePercentage: number) => void;
  onBackToLessons: () => void;
}

export const AssessmentQuiz: React.FC<AssessmentQuizProps> = ({ onComplete, onBackToLessons }) => {
  const { t, course } = useLanguage();
  const quiz = course.assessment;
  const questions = quiz.questions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [answersState, setAnswersState] = useState<Record<number, { selected: string; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentQuestionIndex];
  const isCurrentAnswerSubmitted = isAnswerSubmitted || !!answersState[currentQ?.id];

  const handleSelectOption = (optionId: string) => {
    if (!isCurrentAnswerSubmitted) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmitCurrentAnswer = () => {
    if (!selectedOptionId || isCurrentAnswerSubmitted) return;

    const isCorrect = selectedOptionId === currentQ.correctOptionId;
    setAnswersState(prev => ({
      ...prev,
      [currentQ.id]: { selected: selectedOptionId, isCorrect },
    }));
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      const nextQ = questions[currentQuestionIndex + 1];
      const existingAnswer = answersState[nextQ?.id];
      setSelectedOptionId(existingAnswer ? existingAnswer.selected : null);
      setIsAnswerSubmitted(!!existingAnswer);
    } else {
      setIsFinished(true);
      const correctCount = Object.values(answersState).filter(a => a.isCorrect).length;
      const scorePct = Math.round((correctCount / questions.length) * 100);
      if (scorePct >= quiz.passingScorePercentage) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore
        }
      }
      onComplete(scorePct);
    }
  };

  const handleRestartQuiz = () => {
    setAnswersState({});
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setCurrentQuestionIndex(0);
    setIsFinished(false);
  };

  const totalCorrect = Object.values(answersState).filter(a => a.isCorrect).length;
  const calculatedScore = Math.round((totalCorrect / questions.length) * 100);
  const isPassed = calculatedScore >= quiz.passingScorePercentage;

  if (isFinished) {
    return (
      <div 
        aria-live="polite"
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-10 text-center space-y-6 animate-in fade-in duration-200"
      >
        <div className="inline-flex p-3.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 mb-2">
          {isPassed ? (
            <Award className="w-12 h-12 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
          ) : (
            <RotateCcw className="w-12 h-12 text-zinc-500" aria-hidden="true" />
          )}
        </div>

        <div className="space-y-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {t('scoreLabel')}
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100">
            {calculatedScore}%
          </h3>
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            {totalCorrect} out of {questions.length} questions answered correctly
          </p>
        </div>

        <div className={`p-4 md:p-5 rounded-xl border text-left max-w-xl mx-auto ${
          isPassed 
            ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200'
            : 'bg-zinc-50 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200'
        }`}>
          <p className="text-sm font-bold mb-1">
            {isPassed ? t('passedMessage') : t('tryAgainMessage')}
          </p>
          <p className="text-xs text-zinc-600 dark:text-zinc-400">
            {isPassed
              ? `Passing score is ${quiz.passingScorePercentage}%. You have earned your certificate of completion!`
              : `You need at least ${quiz.passingScorePercentage}% (4 correct answers) to pass and receive your certificate.`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={handleRestartQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-50 font-semibold text-xs md:text-sm shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('retakeAssessment')}</span>
          </button>

          <button
            type="button"
            onClick={onBackToLessons}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold text-xs md:text-sm shadow-sm"
          >
            <span>Review Modules</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      aria-labelledby="quiz-heading"
      className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 md:p-8 space-y-6"
    >
      {/* Quiz Progress Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
            {quiz.title}
          </span>
          <h3 id="quiz-heading" className="text-lg md:text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const answer = answersState[q.id];
            let statusBg = 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400';
            if (answer) {
              statusBg = answer.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
            } else if (idx === currentQuestionIndex) {
              statusBg = 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 font-bold';
            }
            return (
              <div
                key={q.id}
                className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-semibold transition-all ${statusBg}`}
                title={`Question ${idx + 1}`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scenario Context */}
      <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4 md:p-5 dark:border-zinc-800 dark:bg-zinc-950/60 space-y-1.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-zinc-500 dark:text-zinc-400">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-300" />
          <span>Practical Scenario</span>
        </div>
        <p className="text-sm text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">
          {currentQ.scenario}
        </p>
      </div>

      {/* Actual Question */}
      <h4 className="text-base md:text-lg font-bold text-zinc-900 dark:text-zinc-100">
        {currentQ.question}
      </h4>

      {/* Multiple Choice Options */}
      <fieldset className="space-y-2.5" aria-label="Answer options">
        <legend className="sr-only">Choose one answer:</legend>
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isSubmitted = isCurrentAnswerSubmitted;
          const isCorrect = opt.id === currentQ.correctOptionId;

          let optionStyle = 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-zinc-300';
          if (isSelected && !isSubmitted) {
            optionStyle = 'border-zinc-900 bg-zinc-50 dark:border-zinc-100 dark:bg-zinc-800/60';
          } else if (isSubmitted) {
            if (isCorrect) {
              optionStyle = 'border-emerald-500 bg-emerald-50/60 text-emerald-950 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-rose-400 bg-rose-50 text-rose-950 dark:border-rose-700 dark:bg-rose-950/40 dark:text-rose-200';
            } else {
              optionStyle = 'opacity-50 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900';
            }
          }

          return (
            <label
              key={opt.id}
              className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${optionStyle}`}
            >
              <input
                type="radio"
                name={`question-${currentQ.id}`}
                value={opt.id}
                checked={isSelected}
                disabled={isSubmitted}
                onChange={() => handleSelectOption(opt.id)}
                className="mt-0.5 h-4 w-4 text-zinc-900 dark:text-zinc-100 focus:ring-zinc-400 border-zinc-300"
              />
              <div className="flex-1 text-xs md:text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <span className="uppercase font-bold text-zinc-400 mr-2">{opt.id.toUpperCase()}.</span>
                {opt.text}
              </div>
              {isSubmitted && isCorrect && (
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-label="Correct answer" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-label="Incorrect answer" />
              )}
            </label>
          );
        })}
      </fieldset>

      {/* Explanation & Remediation after Answer Submit */}
      {isCurrentAnswerSubmitted && (
        <div 
          role="status"
          aria-live="polite"
          className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-950/80 space-y-1.5 animate-in fade-in"
        >
          <div className="flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 font-semibold text-xs md:text-sm">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Safety Rule Explanation</span>
          </div>
          <p className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
            {currentQ.explanation}
          </p>
          {currentQ.nigerianContextNote && (
            <p className="text-xs text-zinc-600 dark:text-zinc-400 pt-1 font-medium border-t border-zinc-200 dark:border-zinc-800">
              🇳🇬 Context: {currentQ.nigerianContextNote}
            </p>
          )}
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex items-center justify-between gap-4 border-t border-zinc-100 dark:border-zinc-800/80 pt-5">
        <button
          type="button"
          onClick={onBackToLessons}
          className="text-xs md:text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline focus:outline-none"
        >
          Back to Modules
        </button>

        {!isCurrentAnswerSubmitted ? (
          <button
            type="button"
            onClick={handleSubmitCurrentAnswer}
            disabled={!selectedOptionId}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:cursor-not-allowed text-white dark:bg-zinc-100 dark:text-zinc-900 font-semibold text-xs md:text-sm shadow-sm transition-all"
          >
            <span>{t('submitAnswer')}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextQuestion}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs md:text-sm shadow-sm transition-all"
          >
            <span>{currentQuestionIndex < questions.length - 1 ? t('nextQuestion') : 'See Final Results'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
