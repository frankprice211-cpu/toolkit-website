import React, { useState } from 'react';
import { FileText, Copy, Check, RotateCcw, Clock, Volume2 } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState<string>(
    'ToolKit Pro provides fast, simple, and free online tools for everyday calculations and productivity.'
  );
  const [copied, setCopied] = useState(false);

  // Text metrics
  const trimmed = text.trim();
  const words = trimmed.length === 0 ? 0 : trimmed.split(/\s+/).length;
  const charactersWithSpaces = text.length;
  const charactersWithoutSpaces = text.replace(/\s+/g, '').length;
  const sentences = trimmed.length === 0 ? 0 : (text.match(/[^.!?]+[.!?]+(\s|$)/g) || [1]).length;
  const paragraphs = trimmed.length === 0 ? 0 : text.split(/\n+/).filter((p) => p.trim().length > 0).length;

  // Reading time at ~225 wpm
  const readingTimeSeconds = Math.ceil((words / 225) * 60);
  const readingTimeMinutes = (readingTimeSeconds / 60).toFixed(1);

  // Speaking time at ~130 wpm
  const speakingTimeSeconds = Math.ceil((words / 130) * 60);
  const speakingTimeMinutes = (speakingTimeSeconds / 60).toFixed(1);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  const toUppercase = () => setText(text.toUpperCase());
  const toLowercase = () => setText(text.toLowerCase());
  const toTitleCase = () => {
    setText(
      text.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Real-time Metric Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-center shadow-xs">
          <p className="text-xs text-slate-500 mb-1">Words</p>
          <p className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400 tabular-nums">
            {words.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-center shadow-xs">
          <p className="text-xs text-slate-500 mb-1">Characters</p>
          <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
            {charactersWithSpaces.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-center shadow-xs">
          <p className="text-xs text-slate-500 mb-1">No Spaces</p>
          <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
            {charactersWithoutSpaces.toLocaleString()}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-center shadow-xs">
          <p className="text-xs text-slate-500 mb-1">Sentences</p>
          <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
            {sentences}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-center shadow-xs">
          <p className="text-xs text-slate-500 mb-1">Paragraphs</p>
          <p className="text-2xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
            {paragraphs}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 text-center shadow-xs">
          <p className="text-xs text-slate-500 mb-1">Reading Time</p>
          <p className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
            {readingTimeMinutes} min
          </p>
        </div>
      </div>

      {/* Editor & Actions */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        {/* Editor Toolbar */}
        <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toUppercase}
              className="px-2.5 py-1 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300 transition-colors"
            >
              UPPERCASE
            </button>
            <button
              type="button"
              onClick={toLowercase}
              className="px-2.5 py-1 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300 transition-colors"
            >
              lowercase
            </button>
            <button
              type="button"
              onClick={toTitleCase}
              className="px-2.5 py-1 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300 transition-colors"
            >
              Title Case
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-1 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-300 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="px-3 py-1 text-xs font-medium rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-600 dark:text-slate-400 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* Text Area */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here to analyze words, characters, sentences, and reading duration..."
          rows={9}
          className="w-full p-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none resize-y font-sans leading-relaxed"
        />

        {/* Speech duration footer */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-wrap items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Silent reading: ~{readingTimeMinutes} min
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              Speaking duration: ~{speakingTimeMinutes} min
            </span>
          </div>
          <span>Client-side only · Zero data saved</span>
        </div>
      </div>
    </div>
  );
};
