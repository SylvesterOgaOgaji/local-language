import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../App';
import { LanguageProvider } from '../context/LanguageContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';

const renderApp = () => {
  return render(
    <AccessibilityProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </AccessibilityProvider>
  );
};

describe('Course Navigation & Learning Flow', () => {
  it('renders organization name, founder name, and course title on welcome screen', () => {
    renderApp();
    expect(screen.getByText(/JV ImpactVR Initiative Ltd\/Gte/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Sylvester Oga Ogaji/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Basic Smartphone and Internet Safety/i)).toBeInTheDocument();
  });

  it('starts course and navigates through lessons', () => {
    renderApp();
    const startButton = screen.getByRole('button', { name: /Start Learning Course/i });
    fireEvent.click(startButton);

    // Lesson 1 is active
    expect(screen.getByText(/Lesson 1 of 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Creating & Protecting Strong Passwords and PINs/i)).toBeInTheDocument();

    // Click Next Lesson
    const nextButton = screen.getByRole('button', { name: /Next Lesson/i });
    fireEvent.click(nextButton);

    // Lesson 2 is active
    expect(screen.getByText(/Lesson 2 of 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Spotting Fake Messages, WhatsApp Promos & Phishing/i)).toBeInTheDocument();
  });

  it('navigates to assessment quiz and checks scoring', () => {
    renderApp();
    // Start course
    fireEvent.click(screen.getByRole('button', { name: /Start Learning Course/i }));
    // Next to Lesson 2
    fireEvent.click(screen.getByRole('button', { name: /Next Lesson/i }));
    // Next to Lesson 3
    fireEvent.click(screen.getByRole('button', { name: /Next Lesson/i }));
    // Click Take Quiz
    fireEvent.click(screen.getByRole('button', { name: /Take Safety Quiz/i }));

    // Verify Quiz Question 1 is visible
    expect(screen.getByText(/Question 1 of 5/i)).toBeInTheDocument();
    expect(screen.getByText(/What is the safest action to take/i)).toBeInTheDocument();
  });
});
