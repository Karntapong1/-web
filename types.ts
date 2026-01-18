import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface SlideData {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface InnovationItem {
  id: number;
  title: string;
  description: string;
  icon: LucideIcon;
  tags: string[];
}

export interface CaseStudyData {
  id: number;
  companyType: string;
  title: string;
  description: string;
  solution: string;
  result: string;
  image: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
