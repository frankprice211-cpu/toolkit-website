import React, { useState, useId } from 'react';
import { Plus, Trash2, RotateCcw, BookOpen, Award, Check, Sparkles } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  credits: number;
  grade: string;
}

// Configurable grading scales
const GRADE_POINTS_STANDARD: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D': 1.0,
  'F': 0.0
};

const GRADE_POINTS_HONORS: Record<string, number> = {
  'A+': 4.33,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D': 1.0,
  'F': 0.0
};

const INITIAL_COURSES: Course[] = [
  { id: '1', name: 'Mathematics I', credits: 4, grade: 'A' },
  { id: '2', name: 'Computer Science', credits: 4, grade: 'A-' },
  { id: '3', name: 'Physics Mechanics', credits: 3, grade: 'B+' },
  { id: '4', name: 'Technical Writing', credits: 3, grade: 'A' }
];

export const GPACalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [scaleType, setScaleType] = useState<'standard' | 'honors'>('standard');
  const scaleSelectId = useId();

  const gradeTable = scaleType === 'standard' ? GRADE_POINTS_STANDARD : GRADE_POINTS_HONORS;

  const handleAddCourse = () => {
    const newCourse: Course = {
      id: Math.random().toString(36).substring(2, 9),
      name: `Course ${courses.length + 1}`,
      credits: 3,
      grade: 'A'
    };
    setCourses([...courses, newCourse]);
  };

  const handleRemoveCourse = (id: string) => {
    if (courses.length <= 1) return;
    setCourses(courses.filter((c) => c.id !== id));
  };

  const handleUpdateCourse = (id: string, field: keyof Course, value: string | number) => {
    setCourses(
      courses.map((course) => {
        if (course.id !== id) return course;
        if (field === 'credits') {
          const num = typeof value === 'number' ? value : parseFloat(value) || 0;
          return { ...course, credits: Math.max(0, num) };
        }
        return { ...course, [field]: value };
      })
    );
  };

  const handleReset = () => {
    setCourses([
      { id: '1', name: 'Course 1', credits: 3, grade: 'A' }
    ]);
  };

  const handleLoadSample = () => {
    setCourses(INITIAL_COURSES);
  };

  // GPA calculation
  let totalCredits = 0;
  let totalGradePoints = 0;

  courses.forEach((c) => {
    const cred = c.credits > 0 ? c.credits : 0;
    const pt = gradeTable[c.grade] ?? 0;
    totalCredits += cred;
    totalGradePoints += cred * pt;
  });

  const calculatedGPA = totalCredits > 0 ? (totalGradePoints / totalCredits) : 0;
  const formattedGPA = calculatedGPA.toFixed(2);

  // Performance honor classification
  let standing = 'Satisfactory';
  let standingColor = 'text-slate-700 dark:text-slate-300';
  if (calculatedGPA >= 3.8) {
    standing = 'Summa Cum Laude / Highest Distinction';
    standingColor = 'text-emerald-600 dark:text-emerald-400';
  } else if (calculatedGPA >= 3.5) {
    standing = "Magna Cum Laude / Dean's List";
    standingColor = 'text-blue-600 dark:text-blue-400';
  } else if (calculatedGPA >= 3.0) {
    standing = 'Cum Laude / Good Academic Standing';
    standingColor = 'text-indigo-600 dark:text-indigo-400';
  } else if (calculatedGPA >= 2.0) {
    standing = 'Average Academic Standing';
    standingColor = 'text-amber-600 dark:text-amber-400';
  } else if (totalCredits > 0) {
    standing = 'Academic Probation Risk';
    standingColor = 'text-rose-600 dark:text-rose-400';
  }

  return (
    <div className="space-y-6">
      {/* Configuration & Action Bar */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label htmlFor={scaleSelectId} className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Grading Scale:
          </label>
          <div className="inline-flex rounded-lg border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setScaleType('standard')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                scaleType === 'standard'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Standard (4.0 Max)
            </button>
            <button
              type="button"
              onClick={() => setScaleType('honors')}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                scaleType === 'honors'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Honors / AP (4.33 Max)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleLoadSample}
            className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline px-2 py-1 cursor-pointer"
          >
            Load Sample Courses
          </button>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-rose-600 px-2 py-1 cursor-pointer inline-flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset All
          </button>
        </div>
      </div>

      {/* Courses Table / List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Course List</h3>
            <p className="text-xs text-slate-500 mt-0.5">Enter your subjects, credit weight, and earned grade.</p>
          </div>
          <button
            type="button"
            onClick={handleAddCourse}
            className="px-3.5 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Subject
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Subject / Course Name</th>
                <th className="py-3 px-4 w-32">Credits</th>
                <th className="py-3 px-4 w-36">Grade</th>
                <th className="py-3 px-4 w-28 text-right">Points</th>
                <th className="py-3 px-4 w-16 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {courses.map((course, idx) => {
                const ptValue = gradeTable[course.grade] ?? 0;
                const earnedPoints = (course.credits * ptValue).toFixed(1);

                return (
                  <tr key={course.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-xs text-slate-400">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={course.name}
                        onChange={(e) => handleUpdateCourse(course.id, 'name', e.target.value)}
                        placeholder="e.g. Organic Chemistry"
                        className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={course.credits}
                        onChange={(e) => handleUpdateCourse(course.id, 'credits', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm font-mono text-center rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={course.grade}
                        onChange={(e) => handleUpdateCourse(course.id, 'grade', e.target.value)}
                        className="w-full px-2.5 py-1.5 text-sm rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                      >
                        {Object.keys(gradeTable).map((g) => (
                          <option key={g} value={g}>
                            {g} ({gradeTable[g].toFixed(scaleType === 'honors' && g === 'A+' ? 2 : 1)})
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {earnedPoints}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleRemoveCourse(course.id)}
                        disabled={courses.length <= 1}
                        title={courses.length <= 1 ? 'Minimum 1 course required' : 'Remove course'}
                        className={`p-1.5 rounded transition-colors ${
                          courses.length <= 1
                            ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
                            : 'text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Result Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* GPA Hero Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-blue-200">
              Cumulative GPA
            </span>
            <div className="mt-2 text-5xl font-mono font-bold tracking-tight">
              {formattedGPA}
            </div>
            <p className="mt-1 text-xs text-blue-100">
              Calculated on a {scaleType === 'standard' ? '4.00' : '4.33'} grading scale
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-blue-400/30 flex items-center gap-2 text-xs">
            <Award className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-medium text-white">{standing}</span>
          </div>
        </div>

        {/* Total Credits */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Total Credits
            </span>
            <div className="mt-2 text-4xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
              {totalCredits}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Across {courses.length} enrolled {courses.length === 1 ? 'course' : 'courses'}
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Average credits / course:</span>
            <span className="font-mono tabular-nums font-semibold text-slate-900 dark:text-white">
              {courses.length > 0 ? (totalCredits / courses.length).toFixed(1) : 0}
            </span>
          </div>
        </div>

        {/* Total Grade Points */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-500 dark:text-slate-400">
              Quality Points Earned
            </span>
            <div className="mt-2 text-4xl font-mono font-bold text-slate-900 dark:text-white tabular-nums">
              {totalGradePoints.toFixed(1)}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Sum of (Credits × Grade Value)
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
            <span>Formula:</span>
            <span className="font-mono text-slate-700 dark:text-slate-300">
              {totalGradePoints.toFixed(1)} / {totalCredits || 1}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
