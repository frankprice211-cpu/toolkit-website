import { ToolDefinition } from '../types';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'age-calculator',
    slug: 'age-calculator',
    name: 'Age Calculator',
    category: 'calculators',
    categoryLabel: 'Calculators',
    shortDescription: 'Calculate your exact age in years, months, days, weeks, and hours from your date of birth.',
    fullDescription: 'Calculate your precise chronological age in years, months, and days with down-to-the-second details. Get a breakdown of total days lived, your next birthday countdown, day of the week you were born, and astrological details.',
    iconName: 'Calendar',
    popular: true,
    featured: true,
    keywords: ['age', 'birthday', 'dob', 'chronological age', 'date of birth', 'days alive', 'birth date'],
    status: 'active',
    metaTitle: 'Age Calculator – Calculate Your Exact Age Online | ToolKit Pro',
    metaDescription: 'Calculate your exact age in years, months and days with our free online Age Calculator. Fast, accurate, and easy to use.',
    howToUse: [
      'Select your Date of Birth using the calendar input or manual entry.',
      'Optionally adjust the "Calculate Age As Of" target date if you want to know your age at a specific past or future date.',
      'Click "Calculate Age" to instantly generate your exact age breakdown and statistics.',
      'Review total months, weeks, days lived, and your upcoming birthday countdown.',
      'Use the Copy button to quickly save or share your calculation result.'
    ],
    howItWorks: 'The Age Calculator uses chronological date subtraction according to Gregorian calendar rules. It accurately accounts for leap years (29 days in February) and variable month lengths (28, 30, or 31 days). If the current day is smaller than the birth day, it borrows the exact number of days from the preceding month to ensure mathematical precision without rounding errors.',
    faqs: [
      {
        question: 'Does this calculator account for leap years?',
        answer: 'Yes, our calculation engine strictly verifies leap years and variable month days to ensure exact accuracy down to the day.'
      },
      {
        question: 'Can I calculate what age I was on a specific historical date?',
        answer: 'Yes! Toggle the "Custom target date" field to compute your age on any specific date in history or the future.'
      },
      {
        question: 'Is any of my birth date information stored or sent to a server?',
        answer: 'No. All calculations run strictly in your web browser. We never collect, store, or transmit your personal dates.'
      }
    ]
  },
  {
    id: 'gpa-calculator',
    slug: 'gpa-calculator',
    name: 'GPA Calculator',
    category: 'calculators',
    categoryLabel: 'Calculators',
    shortDescription: 'Calculate high school or college semester and cumulative Grade Point Average (GPA) with course credits.',
    fullDescription: 'Quickly compute your semester and cumulative Grade Point Average (GPA). Add any number of courses, assign credit hours and letter grades, and view your weighted GPA, total quality points, and honor standing.',
    iconName: 'GraduationCap',
    popular: true,
    featured: true,
    keywords: ['gpa', 'grade point average', 'college gpa', 'grades', 'semester gpa', 'credit hours', 'transcript', 'school'],
    status: 'active',
    metaTitle: 'GPA Calculator – College & High School Grade Calculator | ToolKit Pro',
    metaDescription: 'Calculate your cumulative and semester Grade Point Average (GPA) easily. Supports custom credit weights, letter grades, and standard 4.0 or 4.33 scales.',
    howToUse: [
      'Enter the course or subject name for each class (optional or descriptive).',
      'Input the credit weight / course credit hours (typically 1 to 5 credits per course).',
      'Select the letter grade achieved from the dropdown (A+, A, A-, B+, etc.).',
      'Click "Add Course" to append additional classes, or click the trash icon to remove any.',
      'Toggle between Standard 4.0 and Honors 4.33 grading systems depending on your institution.',
      'View your updated cumulative GPA, total credits earned, and honors standing in real time.'
    ],
    howItWorks: 'GPA is calculated by taking the sum of Grade Points Earned divided by Total Credit Hours. For each course, Grade Points = Course Credits × Numeric Grade Value (e.g., A = 4.0, B = 3.0). Formula: Cumulative GPA = Total Grade Points ÷ Total Credits.',
    faqs: [
      {
        question: 'What is the difference between the 4.0 scale and 4.33 scale?',
        answer: 'On the standard 4.0 scale, both an A+ and an A equal 4.0. On the 4.33 scale used by many honors and AP programs, an A+ is awarded 4.33 points.'
      },
      {
        question: 'How do pass/fail or non-credit courses affect GPA?',
        answer: 'Courses with 0 credit hours do not contribute to your GPA divisor or grade point total. You can safely exclude non-graded credits.'
      },
      {
        question: 'Can I export or reset my GPA calculation?',
        answer: 'Yes, you can reset all courses with one click, or use our "Load Sample Transcript" button to quickly see how it works.'
      }
    ]
  },
  {
    id: 'calculator',
    slug: 'calculator',
    name: 'Standard Calculator',
    category: 'calculators',
    categoryLabel: 'Calculators',
    shortDescription: 'Clean, modern standard arithmetic calculator with keyboard support, percentage, and history tray.',
    fullDescription: 'A responsive digital desktop calculator supporting addition, subtraction, multiplication, division, percentages, negation, and decimals. Includes an expression preview, clear history log, and full keyboard shortcut integration.',
    iconName: 'Calculator',
    popular: true,
    featured: true,
    keywords: ['calculator', 'math', 'arithmetic', 'standard calculator', 'addition', 'subtraction', 'percentage', 'calc'],
    status: 'active',
    metaTitle: 'Standard Online Calculator – Fast & Free Desktop Calculator | ToolKit Pro',
    metaDescription: 'Use our clean, responsive standard online calculator for everyday math, percentages, and arithmetic with calculation history and keyboard support.',
    howToUse: [
      'Click the on-screen buttons or use your physical keyboard to enter numbers and arithmetic operations.',
      'Use "+", "-", "×", and "÷" to chain operations.',
      'Use "%" for quick percentage calculations and "+/-" to toggle positive or negative signs.',
      'Press "=" or the Return/Enter key on your keyboard to evaluate the expression.',
      'Press "DEL" or Backspace to delete the last digit, or "AC" / Escape to reset the display.',
      'Open the "History" panel to review past calculations and restore any previous answer with one click.'
    ],
    howItWorks: 'The standard calculator evaluates mathematical operations maintaining operator precedence and sanitizing inputs to eliminate IEEE 754 floating-point inaccuracies (such as 0.1 + 0.2 yielding 0.30000000000000004). Calculations are performed strictly client-side.',
    faqs: [
      {
        question: 'Can I use physical keyboard keys?',
        answer: 'Yes! Numbers 0-9, +, -, *, /, %, Enter (equals), Backspace (delete), and Escape (clear) are fully supported.'
      },
      {
        question: 'How does the history feature work?',
        answer: 'Every calculated expression is saved to a local session history list. You can click on any previous equation to reload its result directly into your current calculation.'
      },
      {
        question: 'Does this calculator prevent division by zero?',
        answer: 'Yes, dividing any number by zero displays a graceful "Cannot divide by 0" notice instead of crashing.'
      }
    ]
  },
  {
    id: 'word-counter',
    slug: 'word-counter',
    name: 'Word Counter',
    category: 'productivity',
    categoryLabel: 'Productivity',
    shortDescription: 'Count words, characters, sentences, paragraphs, reading time, and speaking time in real time.',
    fullDescription: 'Comprehensive text analysis utility for writers, students, and professionals. Instantly measures words, characters (with and without spaces), sentences, paragraphs, estimated reading duration, and speaking time.',
    iconName: 'FileText',
    popular: true,
    featured: false,
    keywords: ['word counter', 'words', 'characters', 'reading time', 'text counter', 'sentence counter', 'essay', 'editor'],
    status: 'active',
    metaTitle: 'Word Counter – Free Online Word, Character & Text Counter | ToolKit Pro',
    metaDescription: 'Count words, characters, sentences, paragraphs, and reading time in real time. Fast, free, and privacy-friendly text counter.',
    howToUse: [
      'Type or paste your text into the editor area.',
      'Statistics update automatically in real time as you write.',
      'Inspect character count, words, sentences, and estimated reading/speaking duration.',
      'Use the formatting quick-actions (UPPERCASE, lowercase, Title Case) or Copy button.'
    ],
    howItWorks: 'The text analyzer breaks input strings into whitespace-separated tokens, filters punctuation, and computes metrics using natural language sentence boundary heuristics.',
    faqs: [
      {
        question: 'Is my text private?',
        answer: 'Yes, 100% private. Text is processed in your browser memory and never uploaded to any remote server.'
      }
    ]
  },
  {
    id: 'bmi-calculator',
    slug: 'bmi-calculator',
    name: 'BMI Calculator',
    category: 'health',
    categoryLabel: 'Health',
    shortDescription: 'Calculate Body Mass Index (BMI) for adults using metric (cm/kg) or imperial (ft/in/lbs) units.',
    fullDescription: 'Calculate your Body Mass Index (BMI) instantly. Supports both Metric (centimeters/kilograms) and US Imperial (feet, inches, pounds) units, showing your WHO health category and ideal target weight range.',
    iconName: 'Activity',
    popular: false,
    featured: false,
    keywords: ['bmi', 'body mass index', 'weight', 'height', 'health', 'fitness', 'ideal weight', 'healthy weight'],
    status: 'active',
    metaTitle: 'BMI Calculator – Body Mass Index & Healthy Weight Range | ToolKit Pro',
    metaDescription: 'Free BMI calculator for adults. Compute your Body Mass Index using metric or imperial units, with WHO category guidelines and ideal weight targets.',
    howToUse: [
      'Choose between Metric (cm, kg) or Imperial (feet, inches, lbs) unit systems.',
      'Enter your height and current body weight.',
      'Click "Calculate BMI" to see your score, category, and healthy weight range.'
    ],
    howItWorks: 'BMI is defined as body mass divided by the square of body height: BMI = kg / (m)². Categories correspond to World Health Organization standards (Underweight < 18.5, Normal 18.5-24.9, Overweight 25-29.9, Obese ≥ 30).',
    faqs: [
      {
        question: 'What is a normal BMI range?',
        answer: 'According to the World Health Organization, a BMI between 18.5 and 24.9 indicates a normal, healthy weight for adults.'
      }
    ]
  },
  {
    id: 'percentage-calculator',
    slug: 'percentage-calculator',
    name: 'Percentage Calculator',
    category: 'calculators',
    categoryLabel: 'Calculators',
    shortDescription: 'Quickly solve everyday percentage problems, discounts, percentage change, and proportions.',
    fullDescription: 'Solve any percentage question with three dedicated modes: What is X% of Y, X is what percent of Y, and percentage increase/decrease from value A to value B.',
    iconName: 'Percent',
    popular: false,
    featured: false,
    keywords: ['percentage', 'percent', 'discount', 'percentage change', 'proportion', 'increase', 'decrease'],
    status: 'active',
    metaTitle: 'Percentage Calculator – Fast & Easy Percent Math | ToolKit Pro',
    metaDescription: 'Calculate percentages easily with three helpful modes: percentage of a number, ratio percentage, and percentage increase or decrease.',
    howToUse: [
      'Select which percentage calculation mode you need from the tabs.',
      'Enter the two input numbers.',
      'View the instant result, step-by-step formula explanation, and rounded answers.'
    ],
    howItWorks: 'Applies standard algebraic percentage formulas: (P/100) × V for percentage of a number, (A/B) × 100 for ratio percentage, and ((New - Old) / Old) × 100 for percentage difference.',
    faqs: [
      {
        question: 'How do I calculate a sale discount?',
        answer: 'Use the "X% of Y" mode: enter the discount percentage and the original price. Subtract the resulting discount from the original price.'
      }
    ]
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Password Generator',
    category: 'productivity',
    categoryLabel: 'Productivity',
    shortDescription: 'Generate secure, cryptographically random passwords with custom lengths and symbol rules.',
    fullDescription: 'Generate strong, unpredictable passwords using browser cryptographic randomness (crypto.getRandomValues). Customize character length, uppercase, lowercase, numbers, and symbols.',
    iconName: 'ShieldCheck',
    popular: false,
    featured: false,
    keywords: ['password', 'password generator', 'random password', 'security', 'crypto', 'strong password', 'credentials'],
    status: 'active',
    metaTitle: 'Password Generator – Secure Random Password Generator | ToolKit Pro',
    metaDescription: 'Generate ultra-secure, cryptographically random passwords with custom lengths, symbols, and entropy strength meters. 100% client-side security.',
    howToUse: [
      'Choose the desired password length (8 to 64 characters).',
      'Toggle character sets: Uppercase (A-Z), Lowercase (a-z), Numbers (0-9), and Symbols (!@#$%).',
      'Click "Generate Password" to generate a new key.',
      'Click the Copy button to immediately copy the generated password to your clipboard.'
    ],
    howItWorks: 'Uses the browser Web Crypto API (crypto.getRandomValues) for cryptographically strong pseudorandom number generation (CSPRNG), preventing predictable patterns.',
    faqs: [
      {
        question: 'Are generated passwords saved anywhere?',
        answer: 'Never. Passwords exist only in your browser memory for the moment you need them. No logging or transmission occurs.'
      }
    ]
  },
  // Upcoming Architecture Tools (Roadmap)
  {
    id: 'loan-calculator',
    slug: 'loan-calculator',
    name: 'Loan Calculator',
    category: 'finance',
    categoryLabel: 'Finance',
    shortDescription: 'Calculate monthly loan payments, total interest, and amortization schedule.',
    fullDescription: 'Estimate monthly repayment amounts, total interest payable, and overall loan cost for personal, auto, or mortgage loans.',
    iconName: 'Banknote',
    popular: false,
    keywords: ['loan', 'interest', 'mortgage', 'monthly payment', 'borrow', 'principal'],
    status: 'coming-soon',
    metaTitle: 'Loan Calculator | ToolKit Pro',
    metaDescription: 'Plan and estimate monthly loan payments and interest costs.',
    howToUse: [],
    howItWorks: '',
    faqs: []
  },
  {
    id: 'emi-calculator',
    slug: 'emi-calculator',
    name: 'EMI Calculator',
    category: 'finance',
    categoryLabel: 'Finance',
    shortDescription: 'Compute Equated Monthly Installments (EMI) for home and car financing.',
    fullDescription: 'Quickly find out your exact EMI for any loan amount, tenure, and interest rate with visual principal vs interest breakdown.',
    iconName: 'CreditCard',
    popular: false,
    keywords: ['emi', 'equated monthly installment', 'home loan', 'car loan'],
    status: 'coming-soon',
    metaTitle: 'EMI Calculator | ToolKit Pro',
    metaDescription: 'Calculate equated monthly installments for personal or vehicle loans.',
    howToUse: [],
    howItWorks: '',
    faqs: []
  },
  {
    id: 'interest-calculator',
    slug: 'interest-calculator',
    name: 'Compound Interest Calculator',
    category: 'finance',
    categoryLabel: 'Finance',
    shortDescription: 'Project investment growth with monthly compound interest and annual returns.',
    fullDescription: 'Visualize how your initial deposit and regular monthly contributions compound over 5, 10, 20, or 30 years.',
    iconName: 'TrendingUp',
    popular: false,
    keywords: ['compound interest', 'investing', 'savings', 'future value', 'wealth'],
    status: 'coming-soon',
    metaTitle: 'Compound Interest Calculator | ToolKit Pro',
    metaDescription: 'Project compound interest growth and investment returns over time.',
    howToUse: [],
    howItWorks: '',
    faqs: []
  },
  {
    id: 'scientific-calculator',
    slug: 'scientific-calculator',
    name: 'Scientific Calculator',
    category: 'calculators',
    categoryLabel: 'Calculators',
    shortDescription: 'Advanced scientific functions including trigonometry, logarithms, exponents, and constants.',
    fullDescription: 'Perform complex mathematical functions including sin, cos, tan, log, ln, powers, roots, and factorial calculations.',
    iconName: 'Binary',
    popular: false,
    keywords: ['scientific', 'trig', 'log', 'sin', 'cos', 'advanced math'],
    status: 'coming-soon',
    metaTitle: 'Scientific Calculator | ToolKit Pro',
    metaDescription: 'Advanced online scientific calculator for engineering and calculus.',
    howToUse: [],
    howItWorks: '',
    faqs: []
  },
  {
    id: 'qr-code-generator',
    slug: 'qr-code-generator',
    name: 'QR Code Generator',
    category: 'productivity',
    categoryLabel: 'Productivity',
    shortDescription: 'Generate custom downloadable QR codes for URLs, WiFi credentials, and plain text.',
    fullDescription: 'Create instant high-resolution QR codes that scan reliably on mobile cameras and QR readers.',
    iconName: 'QrCode',
    popular: false,
    keywords: ['qr code', 'barcode', 'scan', 'url qr', 'wifi qr'],
    status: 'coming-soon',
    metaTitle: 'QR Code Generator | ToolKit Pro',
    metaDescription: 'Create free high-resolution QR codes for websites and text.',
    howToUse: [],
    howItWorks: '',
    faqs: []
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Tools' },
  { id: 'calculators', label: 'Calculators' },
  { id: 'finance', label: 'Finance' },
  { id: 'health', label: 'Health' },
  { id: 'productivity', label: 'Productivity' }
] as const;

export const POPULAR_TOOL_SLUGS = ['age-calculator', 'gpa-calculator', 'calculator', 'word-counter'];
