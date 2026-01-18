import React, { useState } from 'react';
import { Send, TrendingUp, Cpu } from 'lucide-react';

const Future: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, this would send data to backend
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Recommendations Column */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">ข้อเสนอแนะและอนาคต</h1>
          
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 border-primary shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <TrendingUp className="text-primary" /> Metaverse in Supply Chain
              </h3>
              <p className="text-slate-600 dark:text-gray-400">
                การผสานข้อมูล Real-time จาก Computer Vision เข้าสู่โลกเสมือน (Digital Twin) เพื่อให้ผู้บริหารสามารถตรวจสอบโรงงานจากระยะไกลได้เสมือนอยู่ในสถานที่จริง
              </p>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-l-4 border-purple-500 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                <Cpu className="text-purple-500" /> Generative AI for QC
              </h3>
              <p className="text-slate-600 dark:text-gray-400">
                การใช้ Generative AI สร้างภาพจำลองข้อบกพร่อง (Synthetic Data) เพื่อเทรนโมเดลให้ฉลาดขึ้น โดยไม่ต้องรอเก็บภาพของเสียจริงซึ่งเกิดขึ้นยาก
              </p>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">บทสรุป</h3>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed">
              การนำเทคโนโลยี Computer Vision มาใช้ไม่ใช่เพียงแค่การตรวจสอบ แต่เป็นการยกระดับมาตรฐานการผลิต 
              ช่วยสร้างความมั่นใจในคุณภาพสินค้าก่อนเข้าสู่กระบวนการซัพพลายเชน และเป็นพื้นฐานสำคัญของ 
              Smart Factory ในอนาคตที่มุ่งเน้น "ประสิทธิภาพ และ ความแม่นยำ"
            </p>
          </div>
        </div>

        {/* Feedback Form Column */}
        <div className="bg-gray-50 dark:bg-slate-800/50 p-8 rounded-2xl border border-gray-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">แสดงความคิดเห็น</h2>
          <p className="text-slate-500 dark:text-gray-400 mb-6">มีข้อสงสัยหรือข้อเสนอแนะเกี่ยวกับเนื้อหา?</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">ชื่อของคุณ</label>
              <input 
                type="text" 
                id="name" 
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="ระบุชื่อ"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">อีเมล</label>
              <input 
                type="email" 
                id="email" 
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">ข้อความ</label>
              <textarea 
                id="message" 
                rows={4}
                required
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                placeholder="พิมพ์ข้อความของคุณที่นี่..."
              ></textarea>
            </div>
            <button 
              type="submit"
              disabled={submitted}
              className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                submitted 
                ? 'bg-green-500 text-white cursor-default' 
                : 'bg-primary hover:bg-primary-dark text-white'
              }`}
            >
              {submitted ? (
                <>ส่งเรียบร้อยแล้ว!</>
              ) : (
                <>ส่งข้อความ <Send size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Future;
