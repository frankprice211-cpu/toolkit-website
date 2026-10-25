import React, { useState } from 'react';
import { Percent, RotateCcw } from 'lucide-react';

export const PercentageCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'of' | 'isWhat' | 'change'>('of');

  // Mode 1: What is X% of Y
  const [m1Pct, setM1Pct] = useState<string>('20');
  const [m1Val, setM1Val] = useState<string>('150');

  // Mode 2: X is what % of Y
  const [m2Part, setM2Part] = useState<string>('25');
  const [m2Total, setM2Total] = useState<string>('200');

  // Mode 3: Percentage change from X to Y
  const [m3Old, setM3Old] = useState<string>('80');
  const [m3New, setM3New] = useState<string>('100');

  // Calculations
  const r1 = (() => {
    const p = parseFloat(m1Pct);
    const v = parseFloat(m1Val);
    if (isNaN(p) || isNaN(v)) return null;
    return (p / 100) * v;
  })();

  const r2 = (() => {
    const part = parseFloat(m2Part);
    const total = parseFloat(m2Total);
    if (isNaN(part) || isNaN(total) || total === 0) return null;
    return (part / total) * 100;
  })();

  const r3 = (() => {
    const o = parseFloat(m3Old);
    const n = parseFloat(m3New);
    if (isNaN(o) || isNaN(n) || o === 0) return null;
    const diff = n - o;
    const pct = (diff / Math.abs(o)) * 100;
    return {
      diff,
      pct,
      isIncrease: diff >= 0
    };
  })();

  return (
    <div className="space-y-6">
      {/* Mode Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setActiveTab('of')}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'of'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-slate-800/60'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          What is X% of Y?
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('isWhat')}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'isWhat'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-slate-800/60'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          X is what % of Y?
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('change')}
          className={`px-4 py-2 text-xs font-semibold rounded-t-lg transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'change'
              ? 'border-b-2 border-blue-600 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-slate-800/60'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          % Increase / Decrease
        </button>
      </div>

      {/* Tab 1: What is X% of Y */}
      {activeTab === 'of' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold text-slate-700 dark:text-slate-300">What is</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={m1Pct}
                onChange={(e) => setM1Pct(e.target.value)}
                className="w-24 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-center focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
              />
              <span className="font-bold text-slate-500">%</span>
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">of</span>
            <input
              type="number"
              value={m1Val}
              onChange={(e) => setM1Val(e.target.value)}
              className="w-32 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-center focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300">?</span>
          </div>

          {r1 !== null && (
            <div className="p-4 bg-blue-50 dark:bg-slate-800/80 rounded-xl border border-blue-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold uppercase">Result</span>
                <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                  {r1.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                Formula: ({m1Pct} ÷ 100) × {m1Val} = {r1}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: X is what % of Y */}
      {activeTab === 'isWhat' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <input
              type="number"
              value={m2Part}
              onChange={(e) => setM2Part(e.target.value)}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-center focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300">is what percent of</span>
            <input
              type="number"
              value={m2Total}
              onChange={(e) => setM2Total(e.target.value)}
              className="w-32 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-center focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300">?</span>
          </div>

          {r2 !== null && (
            <div className="p-4 bg-emerald-50 dark:bg-slate-800/80 rounded-xl border border-emerald-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold uppercase">Result</span>
                <div className="text-3xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                  {r2.toFixed(2)}%
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                Formula: ({m2Part} ÷ {m2Total}) × 100 = {r2.toFixed(2)}%
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: % Increase / Decrease */}
      {activeTab === 'change' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Initial value:</span>
            <input
              type="number"
              value={m3Old}
              onChange={(e) => setM3Old(e.target.value)}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-center"
            />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Final value:</span>
            <input
              type="number"
              value={m3New}
              onChange={(e) => setM3New(e.target.value)}
              className="w-28 px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono text-center"
            />
          </div>

          {r3 !== null && (
            <div className="p-4 bg-indigo-50 dark:bg-slate-800/80 rounded-xl border border-indigo-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold uppercase">
                  {r3.isIncrease ? 'Percentage Increase' : 'Percentage Decrease'}
                </span>
                <div className={`text-3xl font-mono font-bold tabular-nums ${r3.isIncrease ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {r3.isIncrease ? '+' : ''}{r3.pct.toFixed(2)}%
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                Difference: {r3.diff > 0 ? `+${r3.diff}` : r3.diff}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
