import React, { useState, useEffect, useCallback } from 'react';
import { Delete, History, RotateCcw, Copy, Check } from 'lucide-react';

interface CalculationRecord {
  expression: string;
  result: string;
  timestamp: string;
}

export const StandardCalculator: React.FC = () => {
  const [display, setDisplay] = useState<string>('0');
  const [expression, setExpression] = useState<string>('');
  const [isNewNumber, setIsNewNumber] = useState<boolean>(true);
  const [history, setHistory] = useState<CalculationRecord[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Accurate calculation helper to avoid floating point bugs like 0.1 + 0.2 = 0.30000000000000004
  const formatAccurateNumber = (num: number): string => {
    if (isNaN(num)) return 'Error';
    if (!isFinite(num)) return 'Cannot divide by 0';
    // Round to 10 decimal places to eliminate floating point residue
    const rounded = Math.round(num * 1e10) / 1e10;
    // Format if too huge or too tiny
    if (Math.abs(rounded) > 1e14 || (Math.abs(rounded) < 1e-7 && rounded !== 0)) {
      return rounded.toExponential(6);
    }
    return rounded.toString();
  };

  const inputDigit = useCallback((digit: string) => {
    if (isNewNumber) {
      setDisplay(digit);
      setIsNewNumber(false);
    } else {
      if (display === '0') {
        setDisplay(digit);
      } else if (display.length < 16) {
        setDisplay(display + digit);
      }
    }
  }, [display, isNewNumber]);

  const inputDecimal = useCallback(() => {
    if (isNewNumber) {
      setDisplay('0.');
      setIsNewNumber(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  }, [display, isNewNumber]);

  const toggleSign = useCallback(() => {
    if (display === '0' || display === 'Cannot divide by 0' || display === 'Error') return;
    if (display.startsWith('-')) {
      setDisplay(display.slice(1));
    } else {
      setDisplay('-' + display);
    }
  }, [display]);

  const handlePercentage = useCallback(() => {
    const val = parseFloat(display);
    if (isNaN(val)) return;
    const res = val / 100;
    const formatted = formatAccurateNumber(res);
    setDisplay(formatted);
    setIsNewNumber(true);
  }, [display]);

  const handleDelete = useCallback(() => {
    if (display === 'Error' || display === 'Cannot divide by 0' || isNewNumber) {
      setDisplay('0');
      setIsNewNumber(true);
      return;
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
      setIsNewNumber(true);
    }
  }, [display, isNewNumber]);

  const handleClear = useCallback(() => {
    setDisplay('0');
    setExpression('');
    setIsNewNumber(true);
  }, []);

  const evaluateMath = (exprStr: string): number => {
    // Sanitized expression evaluation
    // Replace × with *, ÷ with /
    const sanitized = exprStr
      .replace(/×/g, '*')
      .replace(/÷/g, '/');

    // Only allow digits, decimals, basic operators, parens
    if (!/^[0-9+\-*/. ()]+$/.test(sanitized)) {
      throw new Error('Invalid characters in expression');
    }

    // Function constructor safe arithmetic parser for pure mathematical numbers
    const fn = new Function(`return (${sanitized});`);
    return fn();
  };

  const handleOperator = useCallback((op: string) => {
    if (display === 'Error' || display === 'Cannot divide by 0') return;

    if (expression && isNewNumber) {
      // User is changing operator
      setExpression(expression.slice(0, -2) + `${op} `);
      return;
    }

    if (!expression) {
      setExpression(`${display} ${op} `);
      setIsNewNumber(true);
    } else {
      // Evaluate previous chain
      try {
        const fullExpr = `${expression}${display}`;
        const val = evaluateMath(fullExpr);
        const formatted = formatAccurateNumber(val);
        setDisplay(formatted);
        setExpression(`${formatted} ${op} `);
        setIsNewNumber(true);
      } catch {
        setDisplay('Error');
        setExpression('');
        setIsNewNumber(true);
      }
    }
  }, [display, expression, isNewNumber]);

  const handleEquals = useCallback(() => {
    if (!expression) return;
    if (display === 'Error' || display === 'Cannot divide by 0') return;

    const fullExpr = `${expression}${display}`;
    try {
      const val = evaluateMath(fullExpr);
      const formatted = formatAccurateNumber(val);

      // Add to history
      const record: CalculationRecord = {
        expression: fullExpr,
        result: formatted,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setHistory((prev) => [record, ...prev.slice(0, 19)]);

      setDisplay(formatted);
      setExpression('');
      setIsNewNumber(true);
    } catch {
      setDisplay('Error');
      setExpression('');
      setIsNewNumber(true);
    }
  }, [display, expression]);

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if user is typing in an input element elsewhere
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        inputDigit(e.key);
      } else if (e.key === '.') {
        e.preventDefault();
        inputDecimal();
      } else if (e.key === '+') {
        e.preventDefault();
        handleOperator('+');
      } else if (e.key === '-') {
        e.preventDefault();
        handleOperator('-');
      } else if (e.key === '*' || e.key.toLowerCase() === 'x') {
        e.preventDefault();
        handleOperator('×');
      } else if (e.key === '/') {
        e.preventDefault();
        handleOperator('÷');
      } else if (e.key === '%') {
        e.preventDefault();
        handlePercentage();
      } else if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        handleEquals();
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Escape' || e.key.toLowerCase() === 'c') {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputDigit, inputDecimal, handleOperator, handleEquals, handleDelete, handleClear, handlePercentage]);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl border border-slate-800">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-3 text-xs text-slate-400 border-b border-slate-800/80 mb-3">
          <div className="flex items-center gap-2">
            <span className="font-medium text-slate-300">ToolKit Pro Calc</span>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400">Ready</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleCopy}
              className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors cursor-pointer"
              title="Copy current display value"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                showHistory ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400 hover:text-white'
              }`}
              title="Toggle Calculation History"
            >
              <History className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Display Screen */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 mb-4 text-right overflow-hidden">
          <div className="h-6 text-xs font-mono text-slate-400 tracking-wider truncate">
            {expression || '\u00A0'}
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight break-all">
            {display}
          </div>
        </div>

        {/* History Tray (Collapsible) */}
        {showHistory && (
          <div className="mb-4 p-3 bg-slate-950/80 border border-slate-800 rounded-xl max-h-48 overflow-y-auto text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400 font-semibold pb-1 border-b border-slate-800">
              <span>Recent Calculations</span>
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={() => setHistory([])}
                  className="text-xs text-rose-400 hover:underline cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
            {history.length === 0 ? (
              <p className="text-slate-500 py-3 text-center">No calculations yet</p>
            ) : (
              history.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setDisplay(item.result);
                    setIsNewNumber(true);
                  }}
                  className="w-full text-left p-1.5 rounded hover:bg-slate-800/80 transition-colors flex items-center justify-between font-mono"
                >
                  <span className="text-slate-400 truncate max-w-[200px]">{item.expression} =</span>
                  <span className="text-blue-400 font-bold ml-2">{item.result}</span>
                </button>
              ))
            )}
          </div>
        )}

        {/* Keypad Grid */}
        <div className="grid grid-cols-4 gap-2 text-base font-semibold">
          {/* Row 1 */}
          <button
            type="button"
            onClick={handleClear}
            className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-rose-950/40 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
          >
            AC
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer flex items-center justify-center"
            title="Delete last digit"
          >
            <Delete className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={handlePercentage}
            className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            %
          </button>
          <button
            type="button"
            onClick={() => handleOperator('÷')}
            className="py-3.5 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white transition-colors cursor-pointer text-lg"
          >
            ÷
          </button>

          {/* Row 2 */}
          <button
            type="button"
            onClick={() => inputDigit('7')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            7
          </button>
          <button
            type="button"
            onClick={() => inputDigit('8')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            8
          </button>
          <button
            type="button"
            onClick={() => inputDigit('9')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            9
          </button>
          <button
            type="button"
            onClick={() => handleOperator('×')}
            className="py-3.5 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white transition-colors cursor-pointer text-lg"
          >
            ×
          </button>

          {/* Row 3 */}
          <button
            type="button"
            onClick={() => inputDigit('4')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            4
          </button>
          <button
            type="button"
            onClick={() => inputDigit('5')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            5
          </button>
          <button
            type="button"
            onClick={() => inputDigit('6')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            6
          </button>
          <button
            type="button"
            onClick={() => handleOperator('-')}
            className="py-3.5 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white transition-colors cursor-pointer text-lg"
          >
            -
          </button>

          {/* Row 4 */}
          <button
            type="button"
            onClick={() => inputDigit('1')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            1
          </button>
          <button
            type="button"
            onClick={() => inputDigit('2')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            2
          </button>
          <button
            type="button"
            onClick={() => inputDigit('3')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            3
          </button>
          <button
            type="button"
            onClick={() => handleOperator('+')}
            className="py-3.5 rounded-xl bg-blue-600/90 hover:bg-blue-600 text-white transition-colors cursor-pointer text-lg"
          >
            +
          </button>

          {/* Row 5 */}
          <button
            type="button"
            onClick={toggleSign}
            className="py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer text-sm font-mono"
          >
            +/-
          </button>
          <button
            type="button"
            onClick={() => inputDigit('0')}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer font-mono text-lg"
          >
            0
          </button>
          <button
            type="button"
            onClick={inputDecimal}
            className="py-3.5 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-white transition-colors cursor-pointer text-lg"
          >
            .
          </button>
          <button
            type="button"
            onClick={handleEquals}
            className="py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer shadow-md text-xl"
          >
            =
          </button>
        </div>

        {/* Keyboard Helper */}
        <p className="mt-4 text-center text-[11px] text-slate-500">
          Keyboard shortcuts supported: numbers, +, -, *, /, %, Enter (=), Esc (AC), Backspace.
        </p>
      </div>
    </div>
  );
};
