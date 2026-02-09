import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Map as MapIcon, FileSpreadsheet, RefreshCw, Truck, CheckCircle2, AlertCircle, ExternalLink, Info, RotateCcw, BookOpen, Navigation, Calculator, MapPin, Gauge, Send, LayoutDashboard } from 'lucide-react';
import L from 'leaflet';

// Fix for default Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// ส่วนที่ 3: การคำนวณ Haversine Formula (หน่วย km)
const calculateHaversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371; // รัศมีโลก
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  // Fix: Replace @google/genai.sin with Math.sin for the standard trigonometric calculation
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ข้อมูลพัสดุ 15 รายการ (ตามโจทย์ส่วนที่ 1)
const INITIAL_PARCELS = [
  { id: 'TH-BK001', sender: 'บจก. เอสดีอู', recipient: 'สมชาย', status: 'In Transit', lat: 13.7563, lng: 100.5018, destLat: 13.8123, destLng: 100.6210, speed: 65 },
  { id: 'TH-CM002', sender: 'คลังสินค้าบางนา', recipient: 'วิภาดา', status: 'Delivered', lat: 18.7883, lng: 98.9853, destLat: 18.7883, destLng: 98.9853, speed: 0 },
  { id: 'TH-KK003', sender: 'ร้านค้าออนไลน์ A', recipient: 'มานะ', status: 'In Transit', lat: 16.4322, lng: 102.8236, destLat: 16.5100, destLng: 102.9100, speed: 80 },
  { id: 'TH-HY004', sender: 'Express Center', recipient: 'จินตนา', status: 'Pending', lat: 7.0058, lng: 100.4747, destLat: 7.0800, destLng: 100.5200, speed: 0 },
  { id: 'TH-RY005', sender: 'บจก. ผลิตภัณฑ์ไทย', recipient: 'บริษัท เอบีซี', status: 'In Transit', lat: 12.6828, lng: 101.2816, destLat: 12.7500, destLng: 101.3500, speed: 72 },
  { id: 'TH-PT006', sender: 'คลังสินค้าคลองเตย', recipient: 'โรงงานระยอง', status: 'In Transit', lat: 13.7262, lng: 100.5601, destLat: 13.8500, destLng: 100.7000, speed: 55 },
  { id: 'TH-NP007', sender: 'Shop DD', recipient: 'นิพนธ์', status: 'In Transit', lat: 13.8140, lng: 100.0373, destLat: 13.9000, destLng: 100.1500, speed: 68 },
  { id: 'TH-SN008', sender: 'ศูนย์กระจายสินค้าภาคอีสาน', recipient: 'มงคล', status: 'In Transit', lat: 14.9737, lng: 102.0827, destLat: 15.1000, destLng: 102.2500, speed: 90 },
  { id: 'TH-PL009', sender: 'บจก. โลจิสติกส์ไทย', recipient: 'ศิริรัตน์', status: 'Delivered', lat: 16.8248, lng: 100.2624, destLat: 16.8248, destLng: 100.2624, speed: 0 },
  { id: 'TH-SR010', sender: 'บจก. เทคโนโลยี', recipient: 'บริษัท สยาม', status: 'Pending', lat: 9.1411, lng: 99.3331, destLat: 9.2500, destLng: 99.4500, speed: 0 },
  { id: 'TH-CN011', sender: 'คลังสินค้ากลาง', recipient: 'วิชัย', status: 'In Transit', lat: 15.2124, lng: 100.1260, destLat: 15.3500, destLng: 100.2500, speed: 75 },
  { id: 'TH-ST012', sender: 'Market Place', recipient: 'ธนาธร', status: 'In Transit', lat: 14.3532, lng: 100.5689, destLat: 14.4500, destLng: 100.6500, speed: 60 },
  { id: 'TH-UD013', sender: 'Udon Hub', recipient: 'กานดา', status: 'In Transit', lat: 17.4138, lng: 102.7872, destLat: 17.5000, destLng: 102.8500, speed: 85 },
  { id: 'TH-PK014', sender: 'Phuket Distribution', recipient: 'สมศักดิ์', status: 'In Transit', lat: 7.8804, lng: 98.3923, destLat: 8.0000, destLng: 98.3500, speed: 50 },
  { id: 'TH-CR015', sender: 'Chiang Rai North', recipient: 'นารี', status: 'Pending', lat: 19.9105, lng: 99.8406, destLat: 19.9500, destLng: 99.9000, speed: 0 },
];

const LeafletMap: React.FC<{ parcels: typeof INITIAL_PARCELS }> = ({ parcels }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (mapRef.current && !leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([13.7563, 100.5018], 6);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap'
      }).addTo(leafletMap.current);
    }
    if (leafletMap.current) {
      markersRef.current.forEach(m => m.remove());
      markersRef.current = parcels.map(p => {
        return L.marker([p.lat, p.lng]).addTo(leafletMap.current!)
          .bindPopup(`
            <div class="font-sans text-xs">
              <b class="text-primary">${p.id}</b><br/>
              <b>ผู้รับ:</b> ${p.recipient}<br/>
              <b>สถานะ:</b> ${p.status}<br/>
              <b>ความเร็ว:</b> ${p.speed} km/h
            </div>
          `);
      });
    }
  }, [parcels]);

  return <div ref={mapRef} className="w-full h-[500px] rounded-2xl z-0 border border-slate-200 dark:border-slate-700 shadow-inner" />;
};

const Tracking: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'js' | 'excel' | 'mymaps'>('js');
  const [parcels, setParcels] = useState(INITIAL_PARCELS);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // ส่วนที่ 6: การนำผลงานไปแสดงบนเว็บไซต์ (Embed Integration)
  const excelUrl = "https://1drv.ms/x/c/eef15125e3e3b40b/IQTK8caJJ91YS5eZHaJ7u10UAaoU4uwt-HTPpN_S-MYD2wo?em=2&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True";
  const mapsUrl = "https://www.google.com/maps/d/u/1/embed?mid=1em7H7pHhZs7uU2qKjkYM_tI8J_Xheh0&ehbc=2E312F&noprof=1";

  // จำลอง Real-time Update ทุก 3 วินาที (Bonus)
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
      setParcels(prev => prev.map(p => {
        if (p.status === 'Pending' && Math.random() > 0.8) return { ...p, status: 'In Transit', speed: 40 };
        if (p.status !== 'In Transit') return p;
        
        const moveStep = 0.005;
        const newLat = p.lat + (p.destLat > p.lat ? moveStep : -moveStep);
        const newLng = p.lng + (p.destLng > p.lng ? moveStep : -moveStep);
        const distRemaining = calculateHaversine(newLat, newLng, p.destLat, p.destLng);
        
        return {
          ...p,
          lat: newLat,
          lng: newLng,
          status: distRemaining < 1 ? 'Delivered' : 'In Transit',
          speed: distRemaining < 1 ? 0 : 60 + Math.floor(Math.random() * 20)
        };
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const resetSimulation = () => {
    setParcels([...INITIAL_PARCELS]);
    setLastUpdate(new Date());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 text-center lg:text-left flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
            ระบบติดตามตำแหน่งพัสดุ (Real-time Tracking)
          </h1>
          <p className="text-lg text-slate-600 dark:text-gray-400 max-w-3xl">
            การบูรณาการข้อมูลพิกัดภูมิศาสตร์ (Lat/Lon) จาก Excel สู่ Web Dashboard พร้อมระบบคำนวณระยะทาง Haversine
          </p>
        </div>
        <Link to="/dashboard" className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 transition-all transform hover:-translate-y-1">
          <LayoutDashboard size={20} /> ดู Dashboard สรุปผล
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-8 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl w-fit mx-auto lg:mx-0">
        <button 
          onClick={() => setActiveTab('js')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'js' ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <RefreshCw size={18} className={activeTab === 'js' ? 'animate-spin-slow' : ''} /> Real-time
        </button>
        <button 
          onClick={() => setActiveTab('excel')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'excel' ? 'bg-white dark:bg-slate-800 text-green-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <FileSpreadsheet size={18} /> Excel Embed
        </button>
        <button 
          onClick={() => setActiveTab('mymaps')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'mymaps' ? 'bg-white dark:bg-slate-800 text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <MapIcon size={18} /> Google My Maps
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden mb-12">
        
        {activeTab === 'js' && (
          <div className="p-6 lg:p-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <MapPin className="text-primary" /> สถานะการจัดส่งสด (Live)
                </h3>
                <p className="text-sm text-slate-500 dark:text-gray-400">จำลองการเคลื่อนที่ของยานพาหนะแบบ Real-time</p>
              </div>
              <button 
                onClick={resetSimulation}
                className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors shadow-sm text-slate-700 dark:text-gray-200"
              >
                <RotateCcw size={16} /> รีเซ็ตการจำลองใหม่
              </button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <LeafletMap parcels={parcels} />
                <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-700">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <tr>
                        <th className="p-4">Tracking Number</th>
                        <th className="p-4">ผู้รับ</th>
                        <th className="p-4">ความเร็ว</th>
                        <th className="p-4">ระยะทางที่เหลือ</th>
                        <th className="p-4">สถานะ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
                      {parcels.map(p => (
                        <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                          <td className="p-4 font-mono font-bold text-primary text-sm">{p.id}</td>
                          <td className="p-4 text-sm font-medium">{p.recipient}</td>
                          <td className="p-4 text-sm">
                            <span className="inline-flex items-center gap-1 font-mono">
                              <Gauge size={14} className="text-slate-400" /> {p.speed}
                            </span>
                          </td>
                          <td className="p-4 text-sm font-mono text-slate-500">
                            {calculateHaversine(p.lat, p.lng, p.destLat, p.destLng).toFixed(2)} km
                          </td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.status === 'Delivered' ? 'bg-green-100 text-green-700' : p.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700">
                  <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">สรุปจำนวนพัสดุ (Real-time)</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm">
                      <span className="text-sm font-bold text-slate-600 dark:text-gray-400">ทั้งหมด</span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white">{parcels.length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border-l-4 border-blue-500">
                      <span className="text-sm font-bold text-slate-600 dark:text-gray-400">กำลังขนส่ง</span>
                      <span className="text-2xl font-black text-blue-600">{parcels.filter(p => p.status === 'In Transit').length}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border-l-4 border-green-500">
                      <span className="text-sm font-bold text-slate-600 dark:text-gray-400">ส่งสำเร็จ</span>
                      <span className="text-2xl font-black text-green-600">{parcels.filter(p => p.status === 'Delivered').length}</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700 text-center">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">อัปเดตล่าสุด</div>
                    <div className="font-mono text-xl font-bold text-primary">{lastUpdate.toLocaleTimeString()}</div>
                  </div>
                </div>
                <div className="p-6 bg-primary rounded-2xl text-white shadow-xl shadow-primary/20">
                  <Calculator size={32} className="mb-4 opacity-50" />
                  <h4 className="font-bold mb-2">Haversine Tool</h4>
                  <p className="text-xs opacity-80 leading-relaxed">ใช้สูตรคำนวณระยะทางบนผิวโลกจากพิกัด Lat/Lon เพื่อแสดงผลระยะทางที่เหลือแบบเรียลไทม์ผ่านเว็บเบราว์เซอร์</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'excel' && (
          <div className="p-6 lg:p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6 bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-slate-700">
                <FileSpreadsheet className="text-green-600" />
                <div>
                  <h3 className="font-bold text-green-800 dark:text-green-400">OneDrive Excel Integration</h3>
                  <p className="text-xs text-green-700/70">แสดงผล Dashboard จาก Excel ที่แชร์ผ่าน OneDrive</p>
                </div>
              </div>

              <div className="w-full h-[500px] bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden shadow-sm">
                {excelUrl ? (
                  <iframe 
                    src={excelUrl} 
                    width="100%" 
                    height="100%" 
                    frameBorder="0" 
                    scrolling="no" 
                    title="Excel Embed"
                  ></iframe>
                ) : (
                  <div className="text-center text-slate-400 p-8">
                    <FileSpreadsheet size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="font-bold">รอการฝังข้อมูลจาก OneDrive</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'mymaps' && (
          <div className="p-6 lg:p-8 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6 bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl border border-blue-100 dark:border-slate-700">
                <MapIcon className="text-blue-600" />
                <div>
                  <h3 className="font-bold text-blue-800 dark:text-blue-400">Google My Maps Visualization</h3>
                  <p className="text-xs text-blue-700/70">แสดงผลพิกัดจริงจากไฟล์ CSV ที่นำเข้าสู่ My Maps</p>
                </div>
              </div>

              <div className="aspect-[4/3] sm:aspect-video bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                {mapsUrl ? (
                  <iframe src={mapsUrl} width="100%" height="100%" frameBorder="0" className="w-full h-full" title="My Maps Embed"></iframe>
                ) : (
                  <div className="text-center text-slate-400 p-8">
                    <MapIcon size={64} className="mx-auto mb-4 opacity-20" />
                    <p className="font-bold">ยังไม่ได้ระบุลิงก์แผนที่</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tracking;