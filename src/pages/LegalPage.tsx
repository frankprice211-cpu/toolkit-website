import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageRoute } from '../types';
import { ShieldCheck, FileCheck } from 'lucide-react';

interface LegalPageProps {
  type: 'privacy' | 'terms';
  onNavigate: (route: PageRoute) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate({ type: 'home' }) },
          { label: isPrivacy ? 'Privacy Policy' : 'Terms of Service' }
        ]}
      />

      <header className="space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
          {isPrivacy ? <ShieldCheck className="w-5 h-5" /> : <FileCheck className="w-5 h-5" />}
          <span className="text-xs font-semibold uppercase tracking-wider">Legal Notice</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          {isPrivacy ? 'Privacy Policy' : 'Terms of Service'}
        </h1>
        <p className="text-xs text-slate-500">
          Last updated: October 2026 · ToolKit Pro
        </p>
      </header>

      {isPrivacy ? (
        <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. 100% In-Browser Client-Side Processing
            </h2>
            <p>
              At ToolKit Pro, we place user privacy at the core of our platform architecture. All calculators, text tools, GPA calculations, date arithmetic, and random password generators execute strictly inside your local web browser using JavaScript.
            </p>
            <p>
              We do not transmit your input values (such as dates of birth, academic grades, custom text snippets, or generated passwords) to our servers or any third-party analytics provider.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Local Storage Preferences
            </h2>
            <p>
              ToolKit Pro uses HTML5 Local Storage strictly for non-sensitive interface preferences, specifically your selected theme choice (Light Mode vs. Dark Mode). No personal identifying information (PII) is recorded or synced.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Cookies & Tracking
            </h2>
            <p>
              We do not use advertising trackers, persistent user profiling cookies, or invasive fingerprinting scripts. The application does not require account creation, logins, or social tracking pixels.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Security
            </h2>
            <p>
              Tools involving sensitive randomness (such as the Password Generator) leverage standard W3C Web Cryptography APIs (<code className="font-mono text-xs bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">crypto.getRandomValues</code>) to ensure high-entropy cryptographic security without exposing data externally.
            </p>
          </section>
        </article>
      ) : (
        <article className="prose dark:prose-invert max-w-none text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-6 leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using ToolKit Pro, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may discontinue use of the website at any time.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              2. Informational & Educational Use
            </h2>
            <p>
              All online calculators, formulas, grade projections, health indices (such as BMI), and utilities are provided for general informational, educational, and convenience purposes.
            </p>
            <p>
              Calculations do not constitute certified financial, medical, legal, or official academic transcript advice. Users should verify critical calculations with certified academic advisors, financial advisors, or healthcare professionals.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              3. Warranty Disclaimer
            </h2>
            <p>
              ToolKit Pro is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied. While we strive for absolute accuracy across all tools, we make no representations regarding the suitability or precision for high-stakes compliance use.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              4. Changes to Service
            </h2>
            <p>
              We reserve the right to modify, add, or update calculators, layouts, or terms at our discretion to enhance user experience and maintain modern technological standards.
            </p>
          </section>
        </article>
      )}
    </div>
  );
};
