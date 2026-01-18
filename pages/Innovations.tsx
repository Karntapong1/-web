import React, { useState } from 'react';
import { INNOVATIONS } from '../constants';
import { Tag, ExternalLink, Play, Youtube } from 'lucide-react';

const Innovations: React.FC = () => {
  // Requested YouTube Video ID: Google Cloud Tech - What is Computer Vision?
  const VIDEO_ID = "2hXG8v8p0KM";
  const VIDEO_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
  const THUMBNAIL_URL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;
  
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">นวัตกรรมและเทคโนโลยีใหม่</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {INNOVATIONS.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden border border-gray-100 dark:border-slate-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="h-14 w-14 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                <item.icon size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-gray-300">
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
        <div className="grid md:grid-cols-2">
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
               <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                 <Youtube size={14} fill="currentColor" /> VIDEO CONTENT
               </span>
               <span className="text-gray-400 text-sm">Educational</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Computer Vision คืออะไร?</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              วิดีโออธิบายภาพรวมของเทคโนโลยี Computer Vision และวิธีการที่ AI ประมวลผลภาพเพื่อทำความเข้าใจโลกกายภาพ 
              โดย <strong>Google Cloud Tech</strong> อธิบายถึงการนำไปประยุกต์ใช้ในอุตสาหกรรมต่างๆ 
              รวมถึงการตรวจสอบคุณภาพ (Quality Inspection) เพื่อเพิ่มประสิทธิภาพการผลิต
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">Source: Google Cloud Tech</span>
              </div>
              
              <div className="pt-4 border-t border-slate-700">
                <a 
                  href={VIDEO_URL}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary hover:text-primary-dark transition-colors font-medium"
                >
                  เปิดดูใน YouTube <ExternalLink size={16} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
          
          <div className="bg-black flex items-center justify-center min-h-[300px] lg:min-h-[400px] relative group overflow-hidden">
             <div className="w-full h-full absolute inset-0">
               {!isPlaying ? (
                 <div 
                    className="w-full h-full cursor-pointer group relative"
                    onClick={() => setIsPlaying(true)}
                 >
                    <img 
                      src={THUMBNAIL_URL} 
                      alt="Video Thumbnail" 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg pl-1">
                        <Play size={40} fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      Click to Play
                    </div>
                 </div>
               ) : (
                 <iframe
                   width="100%"
                   height="100%"
                   src={`https://www.youtube.com/embed/${VIDEO_ID}?autoplay=1&rel=0`}
                   title="YouTube video player"
                   frameBorder="0"
                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                   referrerPolicy="strict-origin-when-cross-origin"
                   allowFullScreen
                   className="w-full h-full"
                 ></iframe>
               )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Innovations;