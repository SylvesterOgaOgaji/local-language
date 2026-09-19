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
      // Quiz finished
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
        className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 md:p-10 text-center space-y-6 animate-in fade-in duration-200"
      >
        <div className="inline-flex p-4 rounded-3xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mb-2">
          {isPassed ? (
            <Award className="w-16 h-16 text-amber-500 animate-bounce" aria-hidden="true" />
          ) : (
            <RotateCcw className="w-16 h-16 text-amber-600" aria-hidden="true" />
          )}
        </div>

        <div className="space-y-2">
          <span className="text-xs md:text-sm font-bold uppercase tracking-wider text-slate-500">
            {t('scoreLabel')}
          </span>
          <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">
            {calculatedScore}%
          </h3>
          <p className="text-sm md:text-base font-semibold text-slate-700 dark:text-slate-300">
            {totalCorrect} out of {questions.length} questions answered correctly
          </p>
        </div>

        <div className={`p-4 md:p-6 rounded-2xl border text-left max-w-xl mx-auto ${
          isPassed 
            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
            : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
        }`}>
          <p className="text-sm md:text-base font-bold mb-1">
            {isPassed ? t('passedMessage') : t('tryAgainMessage')}
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            {isPassed
              ? `Passing score is ${quiz.passingScorePercentage}%. You have earned your certificate of completion!`
              : `You need at least ${quiz.passingScorePercentage}% (4 correct answers) to pass and receive your certificate.`}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={handleRestartQuiz}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 font-bold text-sm min-h-[48px]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>{t('retakeAssessment')}</span>
          </button>

          <button
            type="button"
            onClick={onBackToLessons}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm min-h-[48px]"
          >
            <span>Review Lessons</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      aria-labelledby="quiz-heading"
      className="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-5 md:p-8 space-y-6"
    >
      {/* Quiz Progress Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-0.5">
            {quiz.title}
          </span>
          <h3 id="quiz-heading" className="text-lg md:text-xl font-black text-slate-900 dark:text-white">
            Question {currentQuestionIndex + 1} of {questions.length}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {questions.map((q, idx) => {
            const answer = answersState[q.id];
            let statusBg = 'bg-slate-200 dark:bg-slate-800 text-slate-600';
            if (answer) {
              statusBg = answer.isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white';
            } else if (idx === currentQuestionIndex) {
              statusBg = 'bg-amber-500 text-slate-950 font-bold ring-2 ring-amber-300';
            }
            return (
              <div
                key={q.id}
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${statusBg}`}
                title={`Question ${idx + 1}`}
              >
                {idx + 1}
              </div>
            );
          })}
        </div>
      </div>

      {/* Scenario Context */}
      <div className="bg-slate-50 dark:bg-slate-900 p-4 md:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-500 dark:text-slate-400">
          <HelpCircle className="w-4 h-4 text-emerald-600" />
          <span>Scenario Description</span>
        </div>
        <p className="text-sm md:text-base text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
          {currentQ.scenario}
        </p>
      </div>

      {/* Actual Question */}
      <h4 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
        {currentQ.question}
      </h4>

      {/* Multiple Choice Options */}
      <fieldset className="space-y-3" aria-label="Answer options">
        <legend className="sr-only">Choose one answer:</legend>
        {currentQ.options.map((opt) => {
          const isSelected = selectedOptionId === opt.id;
          const isSubmitted = isCurrentAnswerSubmitted;
          const isCorrect = opt.id === currentQ.correctOptionId;

          let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-emerald-500';
          if (isSelected && !isSubmitted) {
            optionStyle = 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 ring-2 ring-emerald-500';
          } else if (isSubmitted) {
            if (isCorrect) {
              optionStyle = 'border-emerald-600 bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 ring-2 ring-emerald-500';
            } else if (isSelected && !isCorrect) {
              optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-950 dark:text-rose-100 ring-2 ring-rose-500';
            } else {
              optionStyle = 'opacity-60 border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900';
            }
          }

          return (
            <label
              key={opt.id}
              className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${optionStyle}`}
            >
              <input
                type="radio"
                name={`question-${currentQ.id}`}
                value={opt.id}
                checked={isSelected}
                disabled={isSubmitted}
                onChange={() => handleSelectOption(opt.id)}
                className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-slate-300"
              />
              <div className="flex-1 text-xs md:text-sm font-semibold text-slate-800 dark:text-slate-200">
                <span className="uppercase font-black text-slate-400 mr-2">{opt.id.toUpperCase()}.</span>
                {opt.text}
              </div>
              {isSubmitted && isCorrect && (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-label="Correct answer" />
              )}
              {isSubmitted && isSelected && !isCorrect && (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" aria-label="Incorrect answer" />
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
          className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 md:p-5 space-y-2 animate-in fade-in"
        >
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs md:text-sm">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Safety Rule Explanation</span>
          </div>
          <p className="text-xs md:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            {currentQ.explanation}
          </p>
          {currentQ.nigerianContextNote && (
            <p className="text-xs text-emerald-900 dark:text-emerald-300/90 pt-1 font-semibold border-t border-emerald-200/60 dark:border-emerald-800/60">
              🇳🇬 Context: {currentQ.nigerianContextNote}
            </p>
          )}
        </div>
      )}

      {/* Bottom Actions */}
      <div className="flex items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-5">
        <button
          type="button"
          onClick={onBackToLessons}
          className="text-xs md:text-sm font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline focus:outline-none"
        >
          Back to Lessons
        </button>

        {!isCurrentAnswerSubmitted ? (
          <button
            type="button"
            onClick={handleSubmitCurrentAnswer}
            disabled={!selectedOptionId}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm shadow-md transition-all min-h-[48px]"
          >
            <span>{t('submitAnswer')}</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNextQuestion}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-all min-h-[48px]"
          >
            <span>{currentQuestionIndex < questions.length - 1 ? t('nextQuestion') : 'See Final Results'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
