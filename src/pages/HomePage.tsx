import React, { useState, useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { ToolCard } from '../components/ToolCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { MicroSlats } from '../components/MicroSlats';
import { TOOLS, CATEGORIES, POPULAR_TOOL_SLUGS } from '../data/tools';
import { ToolCategory, PageRoute, ToolDefinition } from '../types';
import {
  Zap,
  ShieldCheck,
  Smartphone,
  UserX,
  Sparkles,
  ArrowRight,
  TrendingUp,
  LayoutGrid,
  Waves
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (route: PageRoute) => void;
  isDark?: boolean;
}

const GENERAL_FAQS = [
  {
    question: 'Are all tools on ToolKit Pro completely free to use?',
    answer: 'Yes! Every calculator and productivity tool on ToolKit Pro is 100% free with unlimited calculations. There are no paywalls, hidden tiers, or registration barriers.'
  },
  {
    question: 'Do I need to sign up or create an account?',
    answer: 'No registration or login is required. You can immediately open any tool, calculate your data, and copy your results directly from your browser.'
  },
  {
    question: 'Is my calculation data private and secure?',
    answer: 'Absolutely. All calculations happen entirely inside your web browser on the client side using pure JavaScript. We do not store, log, or transmit your inputs or personal dates to any server.'
  },
  {
    question: 'Can I use ToolKit Pro on my smartphone or tablet?',
    answer: 'Yes, ToolKit Pro is built with a responsive design and touch-friendly controls optimized for iOS, Android, tablets, and desktop computers.'
  },
  {
    question: 'How often are new tools and calculators added?',
    answer: 'We continuously expand our tool repository. Planned additions include loan amortization, currency conversion, QR code generators, and scientific tools.'
  }
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, isDark = false }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>('all');
  const [slatPreset, setSlatPreset] = useState<'swell' | 'tide' | 'storm' | 'signal'>('swell');

  // Filter tools based on search query and category
  const filteredTools = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return TOOLS.filter((tool) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      if (!matchesCategory) return false;

      // Search filter
      if (!query) return true;

      const nameMatch = tool.name.toLowerCase().includes(query);
      const descMatch = tool.shortDescription.toLowerCase().includes(query);
      const keywordMatch = tool.keywords.some((k) => k.toLowerCase().includes(query));
      const categoryMatch = tool.categoryLabel.toLowerCase().includes(query);

      return nameMatch || descMatch || keywordMatch || categoryMatch;
    });
  }, [searchQuery, selectedCategory]);

  // Popular tools list
  const popularTools = useMemo(() => {
    return TOOLS.filter((t) => POPULAR_TOOL_SLUGS.includes(t.slug));
  }, []);

  // Recently added active tools
  const recentTools = useMemo(() => {
    return TOOLS.filter((t) => t.status === 'active' && !t.featured).slice(0, 3);
  }, []);

  return (
    <div className="space-y-16 sm:space-y-20 pb-12">
      {/* 1. Hero Section with Interactive MicroSlats Canvas */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 shadow-xs min-h-[460px] sm:min-h-[500px] flex flex-col justify-center items-center text-center px-4 sm:px-8 py-12 sm:py-16">
          
          {/* MicroSlats WebGL fluid background */}
          <div className="absolute inset-0 z-0 opacity-80 dark:opacity-65 transition-opacity">
            <MicroSlats
              preset={slatPreset}
              color={isDark ? '#3B82F6' : '#2563EB'}
              glintColor={isDark ? '#93C5FD' : '#FFFFFF'}
              backgroundColor="transparent"
              slatWidth={10}
              slatHeight={26}
              gap={3}
              roundness={0.75}
              interactive
              cursorStrength={1.2}
              cursorSize={45}
              swirl={0.3}
              trail={1.4}
              lean={0.2}
              intro
            />
          </div>

          {/* Legibility gradient backdrop scrim */}
          <div className="absolute inset-0 z-1 pointer-events-none bg-gradient-to-b from-white/70 via-white/85 to-white/95 dark:from-slate-950/70 dark:via-slate-950/85 dark:to-slate-950/95" />

          {/* Foreground Hero Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Wave preset selector for interactive enjoyment */}
            <div className="inline-flex items-center gap-1 p-1 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs text-xs">
              <span className="px-2 py-1 text-slate-500 font-medium inline-flex items-center gap-1">
                <Waves className="w-3.5 h-3.5 text-blue-500" />
                <span className="hidden sm:inline">Simulation:</span>
              </span>
              {(['swell', 'tide', 'storm', 'signal'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSlatPreset(p)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors capitalize cursor-pointer ${
                    slatPreset === p
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Hero Main Heading */}
            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white"
              style={{ textWrap: 'balance' }}
            >
              All Your Essential Tools in One Place
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Fast, simple and free online tools for everyday calculations and productivity. Move your cursor to stir the interactive fluid field.
            </p>

            {/* Instant Search Bar */}
            <div className="pt-2">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            {/* Quick search tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
              <span>Popular searches:</span>
              {['Age Calculator', 'GPA Calculator', 'Calculator', 'BMI', 'Word Counter'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setSearchQuery(term)}
                  className="text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:underline cursor-pointer transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* If Search is Active: Show Search Results Section */}
      {searchQuery.trim() !== '' && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Search Results for &ldquo;{searchQuery}&rdquo;
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Found {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Clear Search
            </button>
          </div>

          {filteredTools.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center max-w-md mx-auto space-y-3">
              <p className="text-slate-900 dark:text-white font-semibold">
                No tools found. Try another search.
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Try searching for keywords like &ldquo;age&rdquo;, &ldquo;gpa&rdquo;, &ldquo;calculator&rdquo;, &ldquo;bmi&rdquo;, or &ldquo;words&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onSelect={(slug) => onNavigate({ type: 'tool', slug })}
                />
              ))}
            </div>
          )}
        </section>
      )}

      {/* If Search is NOT Active: Show Standard Homepage Flow */}
      {searchQuery.trim() === '' && (
        <>
          {/* 2. Popular Tools Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Popular Tools
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Our most frequently used calculators for quick daily answers.
                </p>
              </div>

              <button
                type="button"
                onClick={() => onNavigate({ type: 'all-tools' })}
                className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                <span>View All Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {popularTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onSelect={(slug) => onNavigate({ type: 'tool', slug })}
                />
              ))}
            </div>
          </section>

          {/* 3. Tool Categories Explorer */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Explore by Category
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Filter our directory across arithmetic, education, fitness, and daily utilities.
                </p>
              </div>

              {/* Category Segmented Filter Buttons */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto max-w-full">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id as ToolCategory)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categorized Tools Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.id}
                  tool={tool}
                  onSelect={(slug) => onNavigate({ type: 'tool', slug })}
                />
              ))}
            </div>
          </section>

          {/* 4. Why Use ToolKit Pro? */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-xs">
              <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  Why Use ToolKit Pro?
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Engineered from the ground up for speed, privacy, and frictionless utility.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                <div className="space-y-2 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    100% Free to Use
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Zero paywalls, subscriptions, or gated calculations. Always free for everyone.
                  </p>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
                    <Zap className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Fast Calculations
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Calculations run locally in real-time with sub-millisecond execution speeds.
                  </p>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
                    <UserX className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    No Registration
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Skip passwords and email signups. Just open your desired tool and start calculating.
                  </p>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Mobile Friendly
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Custom-tailored touch layouts with large tap targets designed for phone and tablet screens.
                  </p>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto sm:mx-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Privacy Friendly
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Your personal dates, grades, and texts never leave your web browser.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. Recently Added Tools */}
          {recentTools.length > 0 && (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                    Recently Added Tools
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                    Fresh utilities added to help with formatting, health, and productivity.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate({ type: 'all-tools' })}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Explore All ({TOOLS.length}) &rarr;
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {recentTools.map((tool) => (
                  <ToolCard
                    key={tool.id}
                    tool={tool}
                    onSelect={(slug) => onNavigate({ type: 'tool', slug })}
                  />
                ))}
              </div>
            </section>
          )}

          {/* 6. FAQ Section */}
          <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQAccordion faqs={GENERAL_FAQS} title="Frequently Asked Questions" />
          </section>
        </>
      )}
    </div>
  );
};
