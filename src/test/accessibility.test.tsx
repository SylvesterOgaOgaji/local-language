import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { App } from '../App';
import { LanguageProvider } from '../context/LanguageContext';
import { AccessibilityProvider } from '../context/AccessibilityContext';

describe('Accessibility & Inclusive Controls', () => {
  it('provides a skip to main content link', () => {
    render(
      <AccessibilityProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AccessibilityProvider>
    );

    const skipLink = screen.getByRole('link', { name: /Skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('toggles high contrast mode on html root element', () => {
    render(
      <AccessibilityProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AccessibilityProvider>
    );

    const contrastBtn = screen.getByTitle(/Toggle high contrast \/ reading mode/i);
    expect(contrastBtn).toBeInTheDocument();

    // Click to cycle to high-contrast
    fireEvent.click(contrastBtn);
    expect(document.documentElement.classList.contains('contrast-high')).toBe(true);

    // Click again to cycle to sepia
    fireEvent.click(contrastBtn);
    expect(document.documentElement.classList.contains('contrast-sepia')).toBe(true);

    // Click again to return to default
    fireEvent.click(contrastBtn);
    expect(document.documentElement.classList.contains('contrast-high')).toBe(false);
  });

  it('cycles text size classes on html root element', () => {
    render(
      <AccessibilityProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </AccessibilityProvider>
    );

    const textSizeBtn = screen.getByTitle(/Cycle text size/i);
    fireEvent.click(textSizeBtn);
    expect(document.documentElement.classList.contains('text-scale-large')).toBe(true);

    fireEvent.click(textSizeBtn);
    expect(document.documentElement.classList.contains('text-scale-xlarge')).toBe(true);
  });
});
