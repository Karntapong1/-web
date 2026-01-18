import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">CV & AI Project</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              โครงการนี้เป็นส่วนหนึ่งของวิชาการจัดการโลจิสติกส์และซัพพลายเชน<br/>ด้วยเทคโนโลยีสมัยใหม่
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              จัดทำโดย นาย กานตพงศ์ พงษ์ศิริโสภาพร (6611011940038)
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยสวนดุสิต
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 text-center text-xs text-slate-400">
          &copy; {new Date().getFullYear()} CV & AI Inspection Project. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
