import React from 'react';
import {
  Calendar,
  GraduationCap,
  Calculator,
  FileText,
  Activity,
  Percent,
  ShieldCheck,
  Banknote,
  CreditCard,
  TrendingUp,
  Binary,
  QrCode,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ToolDefinition } from '../types';

const ICON_MAP: Record<string, React.ElementType> = {
  Calendar,
  GraduationCap,
  Calculator,
  FileText,
  Activity,
  Percent,
  ShieldCheck,
  Banknote,
  CreditCard,
  TrendingUp,
  Binary,
  QrCode
};

interface ToolCardProps {
  tool: ToolDefinition;
  onSelect: (slug: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onSelect }) => {
  const IconComponent = ICON_MAP[tool.iconName] || Calculator;
  const isComingSoon = tool.status === 'coming-soon';

  return (
    <div
      onClick={() => !isComingSoon && onSelect(tool.slug)}
      className={`group relative flex flex-col justify-between p-5 rounded-xl border transition-all duration-200 ${
        isComingSoon
          ? 'bg-slate-50/70 dark:bg-slate-900/40 border-slate-200/80 dark:border-slate-800/80 opacity-75'
          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600/60 hover:shadow-md cursor-pointer'
      }`}
    >
      <div>
        {/* Card Header: Icon + Category metadata (Zero-Pill discipline: unboxed clean text) */}
        <div className="flex items-center justify-between mb-3.5">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
              isComingSoon
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
            }`}
          >
            <IconComponent className="w-5 h-5" />
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <span>{tool.categoryLabel}</span>
            {isComingSoon && (
              <>
                <span>·</span>
                <span className="text-amber-600 dark:text-amber-400">Coming Soon</span>
              </>
            )}
            {tool.popular && !isComingSoon && (
              <>
                <span>·</span>
                <span className="text-blue-600 dark:text-blue-400">Popular</span>
              </>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-semibold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {tool.name}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
          {tool.shortDescription}
        </p>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
          {isComingSoon ? 'In Development' : 'Free · Instant'}
        </span>
        <button
          type="button"
          disabled={isComingSoon}
          className={`inline-flex items-center gap-1 text-xs font-semibold transition-colors ${
            isComingSoon
              ? 'text-slate-400 cursor-not-allowed'
              : 'text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 duration-150'
          }`}
        >
          <span>{isComingSoon ? 'Preview' : 'Open Tool'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
