import React, { useState, useEffect, useCallback } from 'react';
import { ShieldCheck, Copy, Check, RefreshCw } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generate = useCallback(() => {
    let chars = '';
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) chars += '0123456789';
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('');
      return;
    }

    // Cryptographically secure generation
    const randomArray = new Uint32Array(length);
    window.crypto.getRandomValues(randomArray);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(randomArray[i] % chars.length);
    }
    setPassword(result);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  useEffect(() => {
    generate();
  }, [generate]);

  const handleCopy = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Evaluate password strength
  let poolSize = 0;
  if (includeUppercase) poolSize += 26;
  if (includeLowercase) poolSize += 26;
  if (includeNumbers) poolSize += 10;
  if (includeSymbols) poolSize += 28;

  const entropy = Math.round(length * (poolSize > 0 ? Math.log2(poolSize) : 0));

  let strengthLabel = 'Weak';
  let strengthColor = 'bg-rose-500';
  let strengthTextColor = 'text-rose-600 dark:text-rose-400';
  let strengthPercent = 25;

  if (entropy >= 80) {
    strengthLabel = 'Very Strong';
    strengthColor = 'bg-emerald-500';
    strengthTextColor = 'text-emerald-600 dark:text-emerald-400';
    strengthPercent = 100;
  } else if (entropy >= 60) {
    strengthLabel = 'Strong';
    strengthColor = 'bg-blue-500';
    strengthTextColor = 'text-blue-600 dark:text-blue-400';
    strengthPercent = 75;
  } else if (entropy >= 40) {
    strengthLabel = 'Moderate';
    strengthColor = 'bg-amber-500';
    strengthTextColor = 'text-amber-600 dark:text-amber-400';
    strengthPercent = 50;
  }

  return (
    <div className="space-y-6">
      {/* Generated Display Box */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="font-mono text-lg sm:text-xl font-bold text-slate-900 dark:text-white break-all select-all tracking-wider">
            {password || 'Please select at least one character type'}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={generate}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              title="Regenerate"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Strength meter */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-slate-500">Security Strength: <strong className={strengthTextColor}>{strengthLabel}</strong></span>
            <span className="font-mono text-slate-400 tabular-nums">{entropy} bits entropy</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className={`h-full ${strengthColor} transition-all duration-300`}
              style={{ width: `${strengthPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Options */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Password Length: <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">{length}</span>
            </label>
            <span className="text-xs text-slate-400">8 to 64 chars</span>
          </div>
          <input
            type="range"
            min="8"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value, 10))}
            className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer hover:bg-slate-100/50 transition-colors">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-slate-700 dark:text-slate-300">Symbols (!@#$%^&*)</span>
          </label>
        </div>
      </div>
    </div>
  );
};
