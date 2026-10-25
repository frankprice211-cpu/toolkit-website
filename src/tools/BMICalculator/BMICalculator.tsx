import React, { useState } from 'react';
import { Activity, RotateCcw, Info } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');
  // Metric state
  const [heightCm, setHeightCm] = useState<string>('175');
  const [weightKg, setWeightKg] = useState<string>('70');
  // Imperial state
  const [heightFt, setHeightFt] = useState<string>('5');
  const [heightIn, setHeightIn] = useState<string>('9');
  const [weightLbs, setWeightLbs] = useState<string>('154');

  const [bmi, setBmi] = useState<number | null>(22.86);
  const [error, setError] = useState<string | null>(null);

  const calculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    let heightInMeters = 0;
    let weightInKg = 0;

    if (unit === 'metric') {
      const h = parseFloat(heightCm);
      const w = parseFloat(weightKg);
      if (!h || h <= 0 || !w || w <= 0) {
        setError('Please enter positive values for height and weight.');
        setBmi(null);
        return;
      }
      heightInMeters = h / 100;
      weightInKg = w;
    } else {
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inch;
      const lbs = parseFloat(weightLbs);

      if (totalInches <= 0 || !lbs || lbs <= 0) {
        setError('Please enter valid imperial measurements.');
        setBmi(null);
        return;
      }
      heightInMeters = totalInches * 0.0254;
      weightInKg = lbs * 0.45359237;
    }

    const calculated = weightInKg / (heightInMeters * heightInMeters);
    if (isNaN(calculated) || !isFinite(calculated)) {
      setError('Unable to calculate BMI with provided values.');
      setBmi(null);
      return;
    }

    setBmi(Math.round(calculated * 10) / 10);
  };

  const handleReset = () => {
    setHeightCm('170');
    setWeightKg('65');
    setHeightFt('5');
    setHeightIn('7');
    setWeightLbs('143');
    setBmi(null);
    setError(null);
  };

  // Determine category
  let category = 'Normal weight';
  let categoryColor = 'text-emerald-600 dark:text-emerald-400';
  let categoryBg = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
  let advice = 'You are within the recommended healthy weight range for your height.';

  if (bmi !== null) {
    if (bmi < 18.5) {
      category = 'Underweight';
      categoryColor = 'text-sky-600 dark:text-sky-400';
      categoryBg = 'bg-sky-50 dark:bg-sky-950/40 border-sky-200 dark:border-sky-800';
      advice = 'Your weight is below the standard healthy range. Consult a healthcare professional if unintended.';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      categoryColor = 'text-emerald-600 dark:text-emerald-400';
      categoryBg = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
      advice = 'Great news! Your BMI falls within the healthy body mass range according to WHO guidelines.';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      categoryColor = 'text-amber-600 dark:text-amber-400';
      categoryBg = 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
      advice = 'You are slightly above the normal BMI range. Regular physical activity and a balanced diet can help.';
    } else {
      category = 'Obese';
      categoryColor = 'text-rose-600 dark:text-rose-400';
      categoryBg = 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
      advice = 'Your BMI is in the obesity range. Consult a healthcare provider for personalized medical guidance.';
    }
  }

  return (
    <div className="space-y-6">
      {/* Unit switch and form */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100 dark:border-slate-800">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Select Unit System
          </span>
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setUnit('metric')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                unit === 'metric'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Metric (cm, kg)
            </button>
            <button
              type="button"
              onClick={() => setUnit('imperial')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                unit === 'imperial'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Imperial (ft/in, lbs)
            </button>
          </div>
        </div>

        <form onSubmit={calculate} className="space-y-4">
          {unit === 'metric' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Height (cm)
                </label>
                <input
                  type="number"
                  min="50"
                  max="280"
                  value={heightCm}
                  onChange={(e) => setHeightCm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="20"
                  max="350"
                  step="0.1"
                  value={weightKg}
                  onChange={(e) => setWeightKg(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Height
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="2"
                      max="8"
                      value={heightFt}
                      onChange={(e) => setHeightFt(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono"
                    />
                    <span className="text-xs text-slate-500">ft</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightIn}
                      onChange={(e) => setHeightIn(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono"
                    />
                    <span className="text-xs text-slate-500">in</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Weight (lbs)
                </label>
                <input
                  type="number"
                  min="40"
                  max="800"
                  step="0.1"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm font-mono focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  required
                />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 text-xs text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Activity className="w-4 h-4" />
              Calculate BMI
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm rounded-lg transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Result Display */}
      {bmi !== null && (
        <div className={`border rounded-xl p-6 ${categoryBg} transition-all`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Calculated BMI Score
              </span>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-slate-900 dark:text-white mt-1 tabular-nums">
                {bmi} <span className="text-sm font-normal text-slate-500">kg/m²</span>
              </div>
              <p className={`text-sm font-bold mt-1 ${categoryColor}`}>
                {category}
              </p>
            </div>

            <div className="max-w-sm text-xs text-slate-600 dark:text-slate-300 bg-white/70 dark:bg-slate-900/70 p-3 rounded-lg border border-slate-200/60 dark:border-slate-800">
              <p className="font-semibold text-slate-900 dark:text-white mb-1">Health Interpretation</p>
              <p>{advice}</p>
            </div>
          </div>

          {/* Scale bar indicator */}
          <div className="mt-6 pt-4 border-t border-slate-200/50 dark:border-slate-800">
            <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
              <span>Underweight (&lt;18.5)</span>
              <span>Normal (18.5-24.9)</span>
              <span>Overweight (25-29.9)</span>
              <span>Obese (&ge;30)</span>
            </div>
            <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div className="h-full bg-sky-400 w-[18.5%]" title="Underweight" />
              <div className="h-full bg-emerald-500 w-[25%]" title="Normal weight" />
              <div className="h-full bg-amber-400 w-[20%]" title="Overweight" />
              <div className="h-full bg-rose-500 flex-1" title="Obese" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
