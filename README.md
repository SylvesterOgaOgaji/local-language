# ImpactLearn Nigeria Multilingual Skills

> **Accessible, inclusive vocational micro-learning delivered in English and Nigerian indigenous languages.**

[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](LICENSE)
[![Organization](https://img.shields.io/badge/Organization-JV%20ImpactVR%20Initiative%20Ltd%2FGte-008751.svg)](https://github.com/SylvesterOgaOgaji/local-language)
[![Founder](https://img.shields.io/badge/Founder%20%26%20Lead-Sylvester%20Oga%20Ogaji-amber.svg)](https://github.com/SylvesterOgaOgaji/local-language)
[![Live Site](https://img.shields.io/badge/Live%20Site-impactlearn--nigeria.slyokoh.workers.dev-success.svg)](https://impactlearn-nigeria.slyokoh.workers.dev)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA%2FAAA-blue.svg)](#accessibility-features)

---

## 🌟 Overview & Purpose

**ImpactLearn Nigeria** is a production-grade vocational micro-learning demonstration created for **JV ImpactVR Initiative Ltd/Gte, Nigeria**, under the leadership of **Sylvester Oga Ogaji**.

The platform demonstrates how practical vocational skills, cyber hygiene, and financial safety can be communicated effectively in multiple Nigerian languages to empower learners regardless of English literacy levels, physical abilities, or digital constraints.

---

## 🌍 Supported Nigerian Languages

| Language | Native Name | Regional Focus | Status |
|---|---|---|---|
| **English** | English (Nigeria) | National / Official lingua franca | `Verified` |
| **Hausa** | Harshen Hausa | Northern Nigeria (Kano, Kaduna, Sokoto, etc.) | `Verified` |
| **Yoruba** | Èdè Yorùbá | South-Western Nigeria (Lagos, Oyo, Ogun, etc.) | `Verified` |
| **Igbo** | Asụsụ Igbo | South-Eastern Nigeria (Enugu, Anambra, Imo, etc.) | `Verified` |
| **Tiv** | Zwa Tiv | North-Central Nigeria (Benue, Taraba, Nasarawa) | `Translation Review Required` |
| **Ikede / Igede** | Ikede (Igede) | Middle Belt / Benue Valley (Oju, Obi, Cross River) | `Translation Review Required` |

### 🛡️ Language Integrity & English Fallback Rule
In adherence to ethical digital publishing standards:
- Translations are never fabricated or machine-hallucinated.
- Languages with ongoing community verification (Tiv and Ikede) are clearly labeled with a **“Translation review required”** notice.
- The platform implements an automated recursive fallback engine that renders verified English content whenever a translation key or section is unreviewed.

---

## 📱 Featured Micro-Course: *Basic Smartphone and Internet Safety*

Designed specifically for Nigerian vocational learners, artisans, students, and mobile phone users:
1. **Lesson 1: Creating & Protecting Strong Passwords and PINs**
   - Protecting Naira balances from USSD code fraud.
   - Realistic POS cash withdrawal scenarios (e.g. Ikeja & Kano markets).
   - WhatsApp 2-Step Verification protection against account hijacking.
2. **Lesson 2: Spotting Fake Messages, WhatsApp Promos & Phishing**
   - Identifying fraudulent BVN/NIN SMS threats and fake credit alerts.
   - Recognizing fake ₦50,000 Federal Government subsidy giveaway links.
3. **Lesson 3: Public Wi-Fi, App Privacy & Emergency Response**
   - Dangers of unencrypted open Wi-Fi in transport motor parks and restaurants.
   - 3-Step Emergency Response: **Block & Report**, **Never Forward**, and dialing bank USSD freeze codes.
4. **5-Question Interactive Assessment**
   - Realistic Nigerian scenario questions with immediate remedial explanations.
5. **Verified Certificate of Completion**
   - Personalized Certificate bearing the signature of **Sylvester Oga Ogaji** (Founder & Lead Innovator, JV ImpactVR Initiative Ltd/Gte).

---

## ♿ Accessibility (WCAG 2.1 AA/AAA)

Accessibility is a core architectural priority:
- **High-Contrast Theme**: High-contrast black, white, and amber modes with 3px focus rings.
- **Warm Sepia Theme**: Gentle low-glare reading mode.
- **Dynamic Text Scaling**: 100%, 115%, and 130% text sizing.
- **Text-to-Speech (Read Aloud)**: Web Speech API narration for every lesson section.
- **Low Distraction Focus View**: Single-section paging reducing cognitive overload.
- **Screen Reader Support**: Skip links, ARIA live regions, semantic HTML5 landmarks, and descriptive labels.
- **Keyboard Navigation**: Full keyboard navigation across all buttons, dropdowns, quiz options, and lessons (Left/Right arrow keys).

---

## 🚀 Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide Icons
- **Testing**: Vitest, React Testing Library, JSDOM
- **SEO & Social**: Schema.org Course JSON-LD, OpenGraph, Twitter Cards, Sitemap, Robots.txt
- **Hosting**: Cloudflare Pages (`_headers`, `_routes.json`, caching & CSP)

---

## 🛠️ Local Development & Testing

### 1. Prerequisites
- Node.js 18+
- npm 9+

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/SylvesterOgaOgaji/local-language.git
cd local-language

# Install dependencies
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 4. Run Automated Tests
```bash
npm run test
```

### 5. Build for Production
```bash
npm run build
```
Production assets will be generated in `dist/`.

---

## ☁️ Cloudflare Pages Deployment

### Option A: Automatic Git Integration (Recommended)
1. Push this repository to GitHub: `https://github.com/SylvesterOgaOgaji/local-language.git`.
2. In Cloudflare Dashboard, navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select `SylvesterOgaOgaji/local-language`.
4. Set Build Settings:
   - **Framework preset**: `Vite`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
5. Click **Save and Deploy**.

### Option B: Cloudflare Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy dist --project-name=impactlearn-nigeria
```

---

## 👥 Organization & Attribution

- **Organization**: JV ImpactVR Initiative Ltd/Gte, Nigeria
- **Project Lead / Founder**: **Sylvester Oga Ogaji**
- **Repository**: [https://github.com/SylvesterOgaOgaji/local-language](https://github.com/SylvesterOgaOgaji/local-language)
- **License**: [MIT License](LICENSE)
