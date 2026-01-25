import React, { useState, useEffect } from 'react';
import { Table, Map, FileSpreadsheet, RefreshCw, Truck, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

// Mock Data for JS Bonus Section
const INITIAL_PARCELS = [
  { id: 'TH1001', recipient: 'สมชาย ใจดี', status: 'In Transit', progress: 65, lat: 13.7563, lng: 100.5018 },
  { id: 'TH1002', recipient: 'วิภาดา รักสวย', status: 'Delivered', progress: 100, lat: 18.7883, lng: 98.9853 },
  { id: 'TH1003', recipient: 'บริษัท เอบีซี จำกัด', status: 'In Transit', progress: 30, lat: 16.4322, lng: 102.8236 },
  { id: 'TH1004', recipient: 'ร้านค้าปลีกชุมชน', status: 'Pending', progress: 5, lat: 7.0058, lng: 100.4747 },
  { id: 'TH1005', recipient: 'โรงงานระยอง', status: 'In Transit', progress: 88, lat: 12.6828, lng: 101.2816 },
];

const Tracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'excel' | 'mymaps' | 'js'>('excel');
  const [parcels, setParcels] = useState(INITIAL_PARCELS);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate Real-time updates for JS Bonus
  const refreshData = () => {
    setLastUpdate(new Date());
    setParcels(prev => prev.map(p => {
      if (p.status !== 'In Transit') return p;
      const newProgress = Math.min(100, p.progress + Math.floor(Math.random() * 10));
      return {
        ...p,
        progress: newProgress,
        status: newProgress === 100 ? 'Delivered' : 'In Transit'
      };
    }));
  };

  useEffect(() => {
    // Auto-refresh every 5 seconds (Bonus requirement: setInterval)
    const interval = setInterval(refreshData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">ระบบติดตามพัสดุ (Parcel Tracking)</h1>
        <p className="text-lg text-slate-600 dark:text-gray-300">
          โปรเจกต์บูรณาการ Microsoft Excel ร่วมกับ Web Technology เพื่อจำลองระบบ Logistic Dashboard
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-slate-700 pb-1">
        <button
          onClick={() => setActiveTab('excel')}
          className={`px-6 py-3 rounded-t-lg font-medium flex items-center gap-2 transition-colors ${
            activeTab === 'excel'
              ? 'bg-green-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          <FileSpreadsheet size={18} /> Excel Dashboard
        </button>
        <button
          onClick={() => setActiveTab('mymaps')}
          className={`px-6 py-3 rounded-t-lg font-medium flex items-center gap-2 transition-colors ${
            activeTab === 'mymaps'
              ? 'bg-blue-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          <Map size={18} /> Google My Maps
        </button>
        <button
          onClick={() => setActiveTab('js')}
          className={`px-6 py-3 rounded-t-lg font-medium flex items-center gap-2 transition-colors ${
            activeTab === 'js'
              ? 'bg-purple-600 text-white'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
          }`}
        >
          <RefreshCw size={18} /> JS Real-time (Bonus)
        </button>
      </div>

      {/* Content Sections */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden min-h-[600px]">
        
        {/* Tab 1: Excel Embed */}
        {activeTab === 'excel' && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileSpreadsheet className="text-green-600" /> Live Data from Excel (OneDrive)
              </h2>
              <a href="#" className="text-sm text-primary hover:underline flex items-center gap-1">
                Open in Excel Online <ExternalLink size={14} />
              </a>
            </div>
            
            <div className="bg-gray-100 dark:bg-slate-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-slate-600 h-[600px] flex flex-col items-center justify-center p-8 text-center">
              {/* NOTE FOR STUDENT: Paste your OneDrive Embed Code below this line */}
              <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                scrolling="no" 
                src="https://onedrive.live.com/embed?resid=DUMMY_ID&em=2&wdAllowInteractivity=False&wdHideGridlines=True&wdInConfigurator=True"
                title="Excel Dashboard Simulation"
                className="w-full h-full rounded shadow-sm bg-white"
              ></iframe>
              {/* If you don't have a real link yet, the iframe above shows a broken/dummy link. 
                  Replace 'src' with your actual OneDrive Embed URL. */}
            </div>
            <p className="mt-4 text-sm text-slate-500 text-center">
              * ข้อมูลนี้ดึงมาจากไฟล์ Excel บน OneDrive โดยตรง (File -&gt; Share -&gt; Embed)
            </p>
          </div>
        )}

        {/* Tab 2: Google Maps Embed */}
        {activeTab === 'mymaps' && (
          <div className="p-6">
             <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Map className="text-blue-600" /> Google My Maps Integration
              </h2>
            </div>
            <div className="bg-gray-100 dark:bg-slate-900 rounded-lg h-[600px] overflow-hidden shadow-inner">
               {/* NOTE FOR STUDENT: Paste your Google My Maps Embed Code below */}
               <iframe 
                src="https://www.google.com/maps/d/embed?mid=1vX1wJ5rK8k4y7p9z6lM1nO2q3r4s5t6&ehbc=2E312F" 
                width="100%" 
                height="100%"
                className="w-full h-full border-0"
                title="Google My Maps Simulation"
              ></iframe>
              {/* Replace the src above with your own Google My Maps Embed link */}
            </div>
          </div>
        )}

        {/* Tab 3: JS Bonus */}
        {activeTab === 'js' && (
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <RefreshCw className="text-purple-600 animate-spin-slow" /> JavaScript Real-time Simulation
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  (Bonus: ใช้ JS + setInterval จำลองการดึงข้อมูลทุก 5 วินาที)
                </p>
              </div>
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-slate-700 px-4 py-2 rounded-lg">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">LAST UPDATE:</span>
                <span className="text-sm font-mono text-slate-900 dark:text-white">
                  {lastUpdate.toLocaleTimeString()}
                </span>
                <button onClick={refreshData} className="p-1 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-full transition-colors">
                  <RefreshCw size={14} />
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Parcel List */}
              <div className="lg:col-span-2 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 dark:bg-slate-700/50 text-slate-600 dark:text-gray-300 text-sm uppercase">
                      <th className="p-4 rounded-tl-lg">Tracking ID</th>
                      <th className="p-4">ผู้รับ (Recipient)</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 w-1/3 rounded-tr-lg">Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                    {parcels.map((parcel) => (
                      <tr key={parcel.id} className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors">
                        <td className="p-4 font-mono font-bold text-primary">{parcel.id}</td>
                        <td className="p-4 text-slate-800 dark:text-gray-200">{parcel.recipient}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                            parcel.status === 'Delivered' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                              : parcel.status === 'In Transit'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                          }`}>
                            {parcel.status === 'Delivered' ? <CheckCircle2 size={12} /> : <Truck size={12} />}
                            {parcel.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                            <div 
                              className={`h-2.5 rounded-full transition-all duration-1000 ${
                                parcel.status === 'Delivered' ? 'bg-green-500' : 'bg-primary'
                              }`} 
                              style={{ width: `${parcel.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-right mt-1 text-slate-500">{parcel.progress}%</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Cards */}
              <div className="space-y-4">
                <div className="bg-blue-50 dark:bg-slate-700/50 p-6 rounded-xl border border-blue-100 dark:border-slate-600">
                  <div className="text-blue-600 dark:text-blue-400 font-medium mb-1 flex items-center gap-2">
                    <Truck size={20} /> กำลังขนส่ง
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {parcels.filter(p => p.status === 'In Transit').length}
                  </div>
                  <div className="text-sm text-slate-500">พัสดุ</div>
                </div>

                <div className="bg-green-50 dark:bg-slate-700/50 p-6 rounded-xl border border-green-100 dark:border-slate-600">
                  <div className="text-green-600 dark:text-green-400 font-medium mb-1 flex items-center gap-2">
                    <CheckCircle2 size={20} /> ส่งสำเร็จ
                  </div>
                  <div className="text-3xl font-bold text-slate-900 dark:text-white">
                    {parcels.filter(p => p.status === 'Delivered').length}
                  </div>
                  <div className="text-sm text-slate-500">พัสดุ</div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-700/50 p-6 rounded-xl border border-gray-200 dark:border-slate-600">
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <AlertCircle size={16} /> System Status
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    API Connected
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    ระบบจำลองการทำงาน JavaScript (Client-side)
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;