import React from 'react';
import { CASE_STUDIES } from '../constants';
import { MapPin } from 'lucide-react';

const CaseStudies: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">กรณีศึกษา (Case Studies)</h1>
      <p className="text-slate-600 dark:text-gray-400 mb-12">การประยุกต์ใช้จริงในภาคอุตสาหกรรม</p>

      <div className="space-y-16">
        {CASE_STUDIES.map((study, index) => (
          <div key={study.id} className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-8 lg:gap-12 items-center`}>
            <div className="lg:w-1/2 w-full">
              <div className="relative rounded-2xl overflow-hidden shadow-lg group">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-64 lg:h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <MapPin size={14} className="mr-1" /> Global Industry
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 w-full">
              <span className="text-primary font-bold tracking-wider text-sm uppercase mb-2 block">{study.companyType}</span>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{study.title}</h2>
              <p className="text-slate-600 dark:text-gray-300 mb-6 leading-relaxed">
                {study.description}
              </p>
              
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-gray-100 dark:border-slate-700 p-6 shadow-sm">
                <div className="mb-4">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1">โซลูชัน (Solution)</h4>
                  <p className="text-sm text-slate-600 dark:text-gray-400">{study.solution}</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 dark:text-white mb-1">ผลลัพธ์ (Result)</h4>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">{study.result}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
