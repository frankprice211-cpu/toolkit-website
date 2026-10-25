import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FAQAccordion } from '../components/FAQAccordion';
import { ToolCard } from '../components/ToolCard';
import { AgeCalculator } from '../tools/AgeCalculator/AgeCalculator';
import { GPACalculator } from '../tools/GPACalculator/GPACalculator';
import { StandardCalculator } from '../tools/StandardCalculator/StandardCalculator';
import { BMICalculator } from '../tools/BMICalculator/BMICalculator';
import { WordCounter } from '../tools/WordCounter/WordCounter';
import { PercentageCalculator } from '../tools/PercentageCalculator/PercentageCalculator';
import { PasswordGenerator } from '../tools/PasswordGenerator/PasswordGenerator';
import { TOOLS } from '../data/tools';
import { ToolDefinition, PageRoute } from '../types';
import { HelpCircle, BookOpen, Layers } from 'lucide-react';

interface ToolViewPageProps {
  tool: ToolDefinition;
  onNavigate: (route: PageRoute) => void;
}

export const ToolViewPage: React.FC<ToolViewPageProps> = ({ tool, onNavigate }) => {
  // Update document title for SEO on tool page
  useEffect(() => {
    document.title = tool.metaTitle || `${tool.name} | ToolKit Pro`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tool]);

  // Render appropriate tool component
  const renderCalculator = () => {
    switch (tool.slug) {
      case 'age-calculator':
        return <AgeCalculator />;
      case 'gpa-calculator':
        return <GPACalculator />;
      case 'calculator':
        return <StandardCalculator />;
      case 'bmi-calculator':
        return <BMICalculator />;
      case 'word-counter':
        return <WordCounter />;
      case 'percentage-calculator':
        return <PercentageCalculator />;
      case 'password-generator':
        return <PasswordGenerator />;
      default:
        return (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center">
            <p className="text-slate-500 mb-2">This tool is currently under scheduled release.</p>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'home' })}
              className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Return to All Tools
            </button>
          </div>
        );
    }
  };

  // Related tools from same or popular category
  const relatedTools = TOOLS.filter(
    (t) => t.slug !== tool.slug && (t.category === tool.category || t.popular)
  ).slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Breadcrumb Navigation */}
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate({ type: 'home' }) },
          { label: tool.categoryLabel, onClick: () => onNavigate({ type: 'all-tools', initialCategory: tool.category }) },
          { label: tool.name }
        ]}
      />

      {/* Header section with H1 and Description */}
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          {tool.name}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">
          {tool.fullDescription}
        </p>
      </header>

      {/* Primary Calculator Interface Component */}
      <section aria-label={`${tool.name} Interface`}>
        {renderCalculator()}
      </section>

      {/* How to Use Section */}
      {tool.howToUse && tool.howToUse.length > 0 && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              How to Use the {tool.name}
            </h2>
          </div>
          <ol className="list-decimal list-inside space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {tool.howToUse.map((step, index) => (
              <li key={index} className="pl-1">
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* How It Works & Calculation Mechanics */}
      {tool.howItWorks && (
        <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              How It Works & Methodology
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {tool.howItWorks}
          </p>
        </section>
      )}

      {/* Tool-specific FAQs */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section aria-label="Tool FAQs">
          <FAQAccordion faqs={tool.faqs} title={`${tool.name} FAQ`} />
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-slate-500" />
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Related Online Tools
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onNavigate({ type: 'all-tools' })}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
            >
              Browse All Tools &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedTools.map((t) => (
              <ToolCard
                key={t.id}
                tool={t}
                onSelect={(slug) => onNavigate({ type: 'tool', slug })}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
