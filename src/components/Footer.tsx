import React from 'react';
import { Wrench, Shield, Zap, Sparkles } from 'lucide-react';
import { PageRoute } from '../types';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                <Wrench className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">
                ToolKit Pro
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast, simple and free online tools for everyday calculations and productivity. 100% client-side privacy, instant performance, and zero registration needed.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500 pt-1">
              <span className="inline-flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-blue-500" />
                Ultra Fast
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-500" />
                100% In-Browser Privacy
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'home' })}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'all-tools' })}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  All Tools Directory
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'popular' })}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Popular Calculators
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'about' })}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  About ToolKit Pro
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'contact' })}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Contact & Support
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Trust */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Legal & Trust
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'privacy' })}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'terms' })}
                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 ToolKit Pro. All rights reserved.</p>
          <p>Built for speed, accuracy, and daily productivity.</p>
        </div>
      </div>
    </footer>
  );
};
