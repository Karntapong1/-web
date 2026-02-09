import React from 'react';
import { FileSpreadsheet } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
          <FileSpreadsheet className="text-green-600" size={32} /> 
          Dashboard (Excel)
        </h1>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 p-6 sm:p-10 flex justify-center">
        <div className="w-full max-w-5xl overflow-hidden bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-700">
           {/* ใช้ iframe ที่ผู้ใช้ระบุ แต่ปรับ width เป็น 100% เพื่อความ responsive */}
           <iframe 
                width="100%" 
                height="600" 
                frameBorder="0" 
                scrolling="no" 
                src="https://1drv.ms/x/c/eef15125e3e3b40b/IQSOjeEUTaOyT7ES1Brv_lLMAcZLIdk_HfOLKd7ZDXrLI8Q?em=2&AllowTyping=True&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True&edaebf=rslc0"
                className="w-full h-[500px] sm:h-[600px] md:h-[700px]"
                title="Excel Dashboard"
           ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;