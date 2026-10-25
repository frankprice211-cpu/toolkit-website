export type ToolCategory = 'all' | 'calculators' | 'finance' | 'health' | 'productivity';

export interface ToolFAQ {
  question: string;
  answer: string;
}

export interface ToolDefinition {
  id: string;
  slug: string;
  name: string;
  category: 'calculators' | 'finance' | 'health' | 'productivity';
  categoryLabel: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  popular?: boolean;
  featured?: boolean;
  keywords: string[];
  status: 'active' | 'coming-soon';
  howToUse: string[];
  howItWorks: string;
  faqs: ToolFAQ[];
  metaTitle: string;
  metaDescription: string;
}

export type PageRoute =
  | { type: 'home' }
  | { type: 'tool'; slug: string }
  | { type: 'all-tools'; initialCategory?: ToolCategory }
  | { type: 'popular' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'privacy' }
  | { type: 'terms' };
