/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ToolViewPage } from './pages/ToolViewPage';
import { AllToolsPage } from './pages/AllToolsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';
import { TOOLS } from './data/tools';
import { PageRoute } from './types';

export default function App() {
  // Theme state with localStorage persistence
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('toolkit_pro_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Apply dark mode class to <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('toolkit_pro_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('toolkit_pro_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  // Helper to parse current hash into PageRoute
  const getRouteFromHash = (): PageRoute => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (!hash || hash === 'home') return { type: 'home' };
    if (hash.startsWith('tools/')) {
      const slug = hash.replace('tools/', '');
      return { type: 'tool', slug };
    }
    if (hash === 'all-tools') return { type: 'all-tools' };
    if (hash === 'popular') return { type: 'popular' };
    if (hash === 'about') return { type: 'about' };
    if (hash === 'contact') return { type: 'contact' };
    if (hash === 'privacy') return { type: 'privacy' };
    if (hash === 'terms') return { type: 'terms' };
    return { type: 'home' };
  };

  // Route state
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(getRouteFromHash);

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      setCurrentRoute(getRouteFromHash());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Programmatic navigation handler
  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
    let newHash = '';
    switch (route.type) {
      case 'home':
        newHash = '';
        break;
      case 'tool':
        newHash = `tools/${route.slug}`;
        break;
      case 'all-tools':
        newHash = 'all-tools';
        break;
      case 'popular':
        newHash = 'popular';
        break;
      case 'about':
        newHash = 'about';
        break;
      case 'contact':
        newHash = 'contact';
        break;
      case 'privacy':
        newHash = 'privacy';
        break;
      case 'terms':
        newHash = 'terms';
        break;
    }

    if (window.location.hash !== (newHash ? `#${newHash}` : '')) {
      window.location.hash = newHash ? `#${newHash}` : '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render current view
  const renderCurrentView = () => {
    switch (currentRoute.type) {
      case 'tool': {
        const foundTool = TOOLS.find((t) => t.slug === currentRoute.slug);
        if (foundTool) {
          return <ToolViewPage tool={foundTool} onNavigate={handleNavigate} />;
        }
        // Fallback to home if tool not found
        return <HomePage onNavigate={handleNavigate} isDark={isDark} />;
      }
      case 'all-tools':
        return (
          <AllToolsPage
            initialCategory={currentRoute.initialCategory}
            onNavigate={handleNavigate}
          />
        );
      case 'popular':
        return (
          <AllToolsPage
            initialCategory="all"
            onNavigate={handleNavigate}
          />
        );
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <LegalPage type="privacy" onNavigate={handleNavigate} />;
      case 'terms':
        return <LegalPage type="terms" onNavigate={handleNavigate} />;
      case 'home':
      default:
        return <HomePage onNavigate={handleNavigate} isDark={isDark} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors selection:bg-blue-500 selection:text-white">
      {/* Sticky Responsive Header */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
