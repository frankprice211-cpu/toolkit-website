import React, { useState } from 'react';
import { Calendar, RotateCcw, Copy, Check, Info, Sparkles, Clock } from 'lucide-react';

interface AgeBreakdown {
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  dayOfWeekBorn: string;
  zodiacSign: string;
  zodiacElement: string;
  nextBirthdayDate: string;
  nextBirthdayDay: string;
  daysToNextBirthday: number;
  nextAge: number;
}

const ZODIAC_SIGNS = [
  { name: 'Capricorn', start: [12, 22], end: [1, 19], element: 'Earth ⛰' },
  { name: 'Aquarius', start: [1, 20], end: [2, 18], element: 'Air 💨' },
  { name: 'Pisces', start: [2, 19], end: [3, 20], element: 'Water 🌊' },
  { name: 'Aries', start: [3, 21], end: [4, 19], element: 'Fire 🔥' },
  { name: 'Taurus', start: [4, 20], end: [5, 20], element: 'Earth ⛰' },
  { name: 'Gemini', start: [5, 21], end: [6, 20], element: 'Air 💨' },
  { name: 'Cancer', start: [6, 21], end: [7, 22], element: 'Water 🌊' },
  { name: 'Leo', start: [7, 23], end: [8, 22], element: 'Fire 🔥' },
  { name: 'Virgo', start: [8, 23], end: [9, 22], element: 'Earth ⛰' },
  { name: 'Libra', start: [9, 23], end: [10, 22], element: 'Air 💨' },
  { name: 'Scorpio', start: [10, 23], end: [11, 21], element: 'Water 🌊' },
  { name: 'Sagittarius', start: [11, 22], end: [12, 21], element: 'Fire 🔥' }
];

function getZodiac(month: number, day: number) {
  // month is 1-indexed
  for (const z of ZODIAC_SIGNS) {
    const [sm, sd] = z.start;
    const [em, ed] = z.end;
    if (sm === 12 && em === 1) {
      if ((month === 12 && day >= sd) || (month === 1 && day <= ed)) return z;
    } else {
      if ((month === sm && day >= sd) || (month === em && day <= ed)) return z;
    }
  }
  return { name: 'Capricorn', element: 'Earth ⛰' };
}

export const AgeCalculator: React.FC = () => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [dob, setDob] = useState<string>('1998-05-15');
  const [targetDate, setTargetDate] = useState<string>(todayStr);
  const [result, setResult] = useState<AgeBreakdown | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Auto calculate on first load or when triggered
  const calculateAge = (birthStr: string, asOfStr: string) => {
    setError(null);

    if (!birthStr) {
      setError('Please select your Date of Birth.');
      setResult(null);
      return;
    }

    if (!asOfStr) {
      setError('Please select an "Age as of" target date.');
      setResult(null);
      return;
    }

    const birth = new Date(birthStr + 'T00:00:00');
    const target = new Date(asOfStr + 'T00:00:00');

    if (isNaN(birth.getTime())) {
      setError('Invalid Date of Birth format.');
      setResult(null);
      return;
    }

    if (birth > target) {
      setError('Date of birth cannot be in the future relative to the target date.');
      setResult(null);
      return;
    }

    // Precise year/month/day calculation
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      // borrow days from previous month of target
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
      months--;
    }

    if (months < 0) {
      months += 12;
      years--;
    }

    // Total milliseconds elapsed
    const diffTime = target.getTime() - birth.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Day of the week born
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeekBorn = daysOfWeek[birth.getDay()];

    // Zodiac
    const zodiac = getZodiac(birth.getMonth() + 1, birth.getDate());

    // Next birthday calculation relative to target date
    const currentYear = target.getFullYear();
    let nextBday = new Date(currentYear, birth.getMonth(), birth.getDate());

    if (nextBday < target) {
      nextBday = new Date(currentYear + 1, birth.getMonth(), birth.getDate());
    }

    const msToNext = nextBday.getTime() - target.getTime();
    const daysToNextBirthday = Math.ceil(msToNext / (1000 * 60 * 60 * 24));
    const nextAge = years + (daysToNextBirthday === 0 ? 0 : 1);
    const nextBirthdayDate = nextBday.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const nextBirthdayDay = daysOfWeek[nextBday.getDay()];

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      dayOfWeekBorn,
      zodiacSign: zodiac.name,
      zodiacElement: zodiac.element,
      nextBirthdayDate,
      nextBirthdayDay,
      daysToNextBirthday,
      nextAge
    });
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    calculateAge(dob, targetDate);
  };

  const handleReset = () => {
    setDob('');
    setTargetDate(todayStr);
    setResult(null);
    setError(null);
  };

  const handleCopy = () => {
    if (!result) return;
    const text = `Age: ${result.years} Years, ${result.months} Months, ${result.days} Days\nTotal Days Lived: ${result.totalDays.toLocaleString()}\nBorn on: ${result.dayOfWeekBorn}\nNext Birthday: ${result.nextBirthdayDate} (${result.daysToNextBirthday} days remaining)\nCalculated with ToolKit Pro`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Run initial calculation once on mount if empty
  React.useEffect(() => {
    calculateAge(dob, targetDate);
  }, []);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="dob" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Date of Birth <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  max={todayStr}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-slate-500">Enter the day, month, and year you were born.</p>
            </div>

            <div>
              <label htmlFor="targetDate" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Calculate Age As Of
              </label>
              <input
                id="targetDate"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-sm focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
              <p className="mt-1 text-xs text-slate-500">Defaults to today, or choose any reference date.</p>
            </div>
          </div>

          {error && (
            <div className="p-3 text-sm text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg flex items-center gap-2">
              <Info className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg shadow-sm transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Calculate Age
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

      {/* Result Section */}
      {result && (
        <div className="space-y-6">
          {/* Primary Highlight Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-slate-900 dark:to-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Primary Age Result
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Result'}</span>
              </button>
            </div>

            <div className="text-center py-3">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Your Exact Age Is</p>
              <div className="flex flex-wrap items-baseline justify-center gap-2 md:gap-4 font-bold text-slate-900 dark:text-white">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-mono tabular-nums text-blue-600 dark:text-blue-400">
                    {result.years}
                  </span>
                  <span className="text-base font-normal text-slate-600 dark:text-slate-400">Years</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-mono tabular-nums text-blue-600 dark:text-blue-400">
                    {result.months}
                  </span>
                  <span className="text-base font-normal text-slate-600 dark:text-slate-400">Months</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-mono tabular-nums text-blue-600 dark:text-blue-400">
                    {result.days}
                  </span>
                  <span className="text-base font-normal text-slate-600 dark:text-slate-400">Days</span>
                </div>
              </div>
            </div>

            {/* Next Birthday Strip */}
            <div className="mt-5 pt-4 border-t border-blue-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 dark:text-slate-300 gap-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Next Birthday:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {result.nextBirthdayDate} ({result.nextBirthdayDay})
                </span>
              </div>
              <div className="font-mono tabular-nums text-blue-700 dark:text-blue-300 font-semibold bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-blue-200 dark:border-slate-700">
                {result.daysToNextBirthday === 0
                  ? '🎉 Happy Birthday Today!'
                  : `${result.daysToNextBirthday} days until age ${result.nextAge}`}
              </div>
            </div>
          </div>

          {/* Detailed Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Months</p>
              <p className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {result.totalMonths.toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Weeks</p>
              <p className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {result.totalWeeks.toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Days</p>
              <p className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {result.totalDays.toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Total Hours</p>
              <p className="text-xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                {result.totalHours.toLocaleString()}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Day You Were Born</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">
                {result.dayOfWeekBorn}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Zodiac Sign</p>
              <p className="text-base font-bold text-slate-900 dark:text-white">
                {result.zodiacSign}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
