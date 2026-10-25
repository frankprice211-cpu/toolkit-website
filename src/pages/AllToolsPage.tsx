import React, { useState } from 'react';
import { ToolCard } from '../components/ToolCard';
import { SearchBar } from '../components/SearchBar';
import { TOOLS, CATEGORIES } from '../data/tools';
import { ToolCategory, PageRoute } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

interface AllToolsPageProps {
  initialCategory?: ToolCategory;
  onNavigate: (route: PageRoute) => void;
}

export const AllToolsPage: React.FC<AllToolsPageProps> = ({ initialCategory = 'all', onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<ToolCategory>(initialCategory);
  const [search, setSearch] = useState('');

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCat = selectedCategory === 'all' || tool.category === selectedCategory;
    if (!matchesCat) return false;

    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      tool.name.toLowerCase().includes(q) ||
      tool.shortDescription.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Home', onClick: () => onNavigate({ type: 'home' }) },
          { label: 'All Tools' }
        ]}
      />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            All Online Tools Directory
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Browse our full suite of fast, free client-side calculators and utilities.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id as ToolCategory)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <SearchBar value={search} onChange={setSearch} placeholder="Filter all tools by name, tag, or function..." />
      </div>

      {filteredTools.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
          <p className="font-semibold text-slate-800 dark:text-slate-200">No matching tools found.</p>
          <p className="text-xs text-slate-500">Try adjusting your search keywords or switching category filters.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Reset Filters
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
    </div>
  );
};
