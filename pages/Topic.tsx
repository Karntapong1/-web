import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CheckCircle, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../constants';

const efficiencyData = [
  { name: 'ความเร็ว (ชิ้น/นาที)', Human: 50, AI: 1200 },
  { name: 'ความแม่นยำ (%)', Human: 85, AI: 99.9 },
  { name: 'ชั่วโมงทำงาน (ชม./วัน)', Human: 8, AI: 24 },
];

const Topic: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(0);
  const [quizAnswers, setQuizAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);

  const steps = [
    { title: '1. Image Acquisition', desc: 'กล้องอุตสาหกรรมและระบบแสงสว่างจับภาพสินค้าทันทีที่เซ็นเซอร์ตรวจพบ (Capture)' },
    { title: '2. Pre-processing', desc: 'ปรับปรุงคุณภาพของภาพ ลดสัญญาณรบกวน ปรับแสงให้เหมาะสมเพื่อให้ AI วิเคราะห์ได้ง่ายขึ้น' },
    { title: '3. Inference (AI)', desc: 'ซอฟต์แวร์ Vision วิเคราะห์หาความผิดปกติ (Defects) ด้วยโมเดล Deep Learning ที่ผ่านการฝึกฝน' },
    { title: '4. Decision & Action', desc: 'ตัดสินใจว่าเป็นสินค้าดี (OK) หรือเสีย (NG) และสั่งการระบบคัดแยกโดยอัตโนมัติ' },
  ];

  const handleAnswer = (qId: number, aId: number) => {
    setQuizAnswers(prev => ({ ...prev, [qId]: aId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) score++;
    });
    return score;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">เนื้อหาหลัก: Computer Vision & QC</h1>
        <p className="text-lg text-slate-600 dark:text-gray-300">
          เรียนรู้หลักการทำงานของการตรวจสอบคุณภาพด้วยปัญญาประดิษฐ์ ตั้งแต่แนวคิดพื้นฐานไปจนถึงกระบวนการทำงานจริง
        </p>
      </div>

      {/* Intro Context */}
      <section className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-sm mb-12 border border-gray-200 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
          <RefreshCw className="w-6 h-6" /> ที่มาและความสำคัญ
        </h2>
        <p className="text-slate-700 dark:text-gray-300 mb-4 leading-relaxed">
          ในยุคอุตสาหกรรม 4.0 การแข่งขันทางธุรกิจทวีความรุนแรงขึ้น สินค้าที่มีข้อบกพร่อง (Defects) 
          ไม่เพียงทำลายชื่อเสียง แต่ยังสร้างต้นทุนมหาศาลจาก <strong>Reverse Logistics</strong> และ <strong>Product Recall</strong>. 
          การตรวจสอบด้วยมนุษย์ (Manual Inspection) มีข้อจำกัดเรื่องความเหนื่อยล้าและความเร็ว 
          จึงเกิดการนำ <strong>Computer Vision</strong> มาใช้เพื่อปิดช่องโหว่เหล่านี้
        </p>
      </section>

      {/* Process Interactive Tabs */}
      <section className="grid lg:grid-cols-2 gap-12 mb-16 items-start">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">หลักการทำงานของระบบ</h2>
          <div className="space-y-4">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`cursor-pointer border-l-4 p-4 transition-all duration-300 ${
                  activeStep === index 
                    ? 'border-primary bg-blue-50 dark:bg-slate-700/50' 
                    : 'border-gray-200 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
                onClick={() => setActiveStep(index)}
              >
                <h3 className={`font-bold ${activeStep === index ? 'text-primary' : 'text-slate-600 dark:text-gray-400'}`}>
                  {step.title}
                </h3>
                <div className={`mt-2 text-sm text-slate-600 dark:text-gray-300 overflow-hidden transition-all duration-300 ${
                  activeStep === index ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {step.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-bold text-center mb-6 text-slate-900 dark:text-white">เปรียบเทียบประสิทธิภาพ: มนุษย์ vs AI</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={efficiencyData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#ccc" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={100} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f1f5f9' }} 
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Legend />
                <Bar dataKey="Human" fill="#94a3b8" name="มนุษย์" radius={[0, 4, 4, 0]} />
                <Bar dataKey="AI" fill="#0ea5e9" name="AI System" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 border border-indigo-100 dark:border-slate-700">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2">
            <Zap className="text-yellow-500" /> ทดสอบความรู้ (Quiz)
          </h2>
          <p className="text-slate-600 dark:text-gray-400">ลองตอบคำถามเพื่อตรวจสอบความเข้าใจของคุณ</p>
        </div>

        <div className="max-w-2xl mx-auto space-y-8">
          {QUIZ_QUESTIONS.map((q) => (
            <div key={q.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">{q.question}</h3>
              <div className="space-y-2">
                {q.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => !showResults && handleAnswer(q.id, idx)}
                    disabled={showResults}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors border ${
                      showResults
                        ? idx === q.correctAnswer
                          ? 'bg-green-100 border-green-500 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : quizAnswers[q.id] === idx
                          ? 'bg-red-100 border-red-500 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : 'border-gray-200 dark:border-slate-700 text-slate-500'
                        : quizAnswers[q.id] === idx
                        ? 'bg-primary/10 border-primary text-primary'
                        : 'border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-slate-700 dark:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResults && idx === q.correctAnswer && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {showResults && quizAnswers[q.id] === idx && idx !== q.correctAnswer && <AlertCircle className="w-5 h-5 text-red-600" />}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center pt-4">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={Object.keys(quizAnswers).length !== QUIZ_QUESTIONS.length}
                className="bg-primary hover:bg-primary-dark disabled:bg-gray-300 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md"
              >
                ส่งคำตอบ
              </button>
            ) : (
              <div className="text-center animate-fade-in">
                <p className="text-xl font-bold mb-4 text-slate-800 dark:text-white">
                  คะแนนของคุณ: <span className="text-primary">{calculateScore()}</span> / {QUIZ_QUESTIONS.length}
                </p>
                <button
                  onClick={() => {
                    setShowResults(false);
                    setQuizAnswers({});
                  }}
                  className="text-primary hover:underline"
                >
                  ทำแบบทดสอบอีกครั้ง
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Topic;
