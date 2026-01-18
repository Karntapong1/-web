import React from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

const References: React.FC = () => {
  const references = [
    { 
      author: 'กรมส่งเสริมอุตสาหกรรม.', 
      year: '2566', 
      title: 'คู่มือระบบอัตโนมัติในโรงงาน.', 
      source: 'กระทรวงอุตสาหกรรม' 
    },
    { 
      author: 'Techsource Groups.', 
      year: '2025', 
      title: 'AI Visual Inspection: The Future of Quality Control.', 
      url: 'https://example.com/techsource' 
    },
    { 
      author: 'McKinsey & Company.', 
      year: '2022', 
      title: 'Smart Quality Management: Capturing the value of Industry 4.0.', 
      url: 'https://mckinsey.com/smart-quality' 
    },
    {
        author: 'Szeliski, R.',
        year: '2022',
        title: 'Computer Vision: Algorithms and Applications.',
        source: 'Springer'
    },
    {
        author: 'Gartner.',
        year: '2024',
        title: 'Top Strategic Technology Trends for 2024: AI Trust, Risk and Security Management.',
        source: 'Gartner Research'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 border-b border-gray-200 dark:border-slate-700 pb-4">
        เอกสารอ้างอิง (References)
      </h1>

      <div className="space-y-6">
        {references.map((ref, index) => (
          <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-slate-700 flex items-start gap-4">
            <div className="mt-1 text-primary hidden sm:block">
              <BookOpen size={20} />
            </div>
            <div className="flex-1">
              <p className="text-slate-800 dark:text-gray-200 font-medium">
                {ref.author} ({ref.year}). 
              </p>
              <p className="text-slate-600 dark:text-gray-300 italic mb-2">
                {ref.title}
              </p>
              <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                {ref.source && <span>{ref.source}</span>}
                {ref.url && (
                    <a href={ref.url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1">
                        Visit Source <ExternalLink size={12} />
                    </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default References;
