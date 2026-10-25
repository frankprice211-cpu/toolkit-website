import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { PageRoute } from '../types';
import { ShieldCheck, Zap, Lock, Code, CheckCircle, Wrench } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate({ type: 'home' }) },
          { label: 'About Us' }
        ]}
      />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          About ToolKit Pro
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
          Our mission is simple: provide lightning-fast, privacy-first online calculation and utility tools that anyone can use without ads cluttering the screen or demanding personal accounts.
        </p>
      </header>

      {/* Core Principles */}
      <section className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Our Guiding Principles
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Pure Client-Side Speed
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Every calculator is executed directly in your browser using optimized JavaScript. No server round-trips means zero lag, instant feedback, and offline capabilities.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Uncompromising Privacy
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We believe everyday tools should respect user privacy. We don't store your dates of birth, academic grades, or passwords on any remote database.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Mathematical Accuracy
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              We rigorously test our calculation algorithms against edge cases, leap years, timezones, and floating-point arithmetic standards.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 space-y-2">
            <div className="w-9 h-9 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Code className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-base">
              Modular Architecture
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              ToolKit Pro is designed with an extensible tool registry, allowing new calculators to be added seamlessly without altering core navigation or system stability.
            </p>
          </div>
        </div>
      </section>

      {/* Explore CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 text-center space-y-4 shadow-sm">
        <h2 className="text-2xl font-bold">Ready to make calculations easier?</h2>
        <p className="text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
          Explore our suite of everyday calculators, text processors, and financial estimators for free.
        </p>
        <button
          type="button"
          onClick={() => onNavigate({ type: 'all-tools' })}
          className="px-6 py-2.5 bg-white text-blue-600 hover:bg-blue-50 text-xs sm:text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2"
        >
          <Wrench className="w-4 h-4" />
          Explore All Tools
        </button>
      </section>
    </div>
  );
};
