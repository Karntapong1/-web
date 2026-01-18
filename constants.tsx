import { Brain, Camera, Factory, Scan, ShieldCheck, Zap } from 'lucide-react';
import { CaseStudyData, InnovationItem, QuizQuestion, SlideData } from './types';

export const NAV_ITEMS = [
  { label: 'หน้าแรก', path: '/' },
  { label: 'เนื้อหาหลัก', path: '/topic' },
  { label: 'นวัตกรรม', path: '/innovations' },
  { label: 'กรณีศึกษา', path: '/cases' },
  { label: 'อนาคต', path: '/future' },
  { label: 'อ้างอิง', path: '/references' },
];

export const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    image: 'https://picsum.photos/id/1/1600/900', // Tech workspace
    title: 'Computer Vision ในอุตสาหกรรม',
    description: 'พลิกโฉมการตรวจสอบคุณภาพสินค้าด้วย AI และเทคโนโลยีการมองเห็นของเครื่องจักร',
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/201/1600/900', // Coding/Tech
    title: 'ลดข้อผิดพลาด เพิ่มความแม่นยำ',
    description: 'เปลี่ยนจากการสุ่มตรวจเป็นการตรวจสอบ 100% แบบ Real-time',
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/3/1600/900', // Abstract tech
    title: 'สู่มาตรฐาน Smart Factory',
    description: 'ยกระดับกระบวนการผลิตและ Supply Chain ด้วยเทคโนโลยีอัจฉริยะ',
  },
];

export const INNOVATIONS: InnovationItem[] = [
  {
    id: 1,
    title: 'YOLOv9 Algorithm',
    description: 'อัลกอริทึมตรวจจับวัตถุแบบ Real-time ที่มีความเร็วและความแม่นยำสูง เหมาะสำหรับสายพานการผลิตที่เคลื่อนที่เร็ว',
    icon: Scan,
    tags: ['AI', 'Deep Learning', 'Real-time'],
  },
  {
    id: 2,
    title: 'Smart Cameras (IoT)',
    description: 'กล้องอัจฉริยะที่มีหน่วยประมวลผลในตัว สามารถวิเคราะห์ภาพได้ที่จุดติดตั้ง (Edge Computing) ลดภาระ Server',
    icon: Camera,
    tags: ['IoT', 'Edge Computing', 'Hardware'],
  },
  {
    id: 3,
    title: 'Automated Defect Detection',
    description: 'ระบบ AI ที่เรียนรู้ลักษณะข้อบกพร่อง (Defects) อัตโนมัติ โดยไม่ต้องเขียนโปรแกรมกฎเกณฑ์ตายตัว',
    icon: Brain,
    tags: ['Machine Learning', 'QC'],
  },
];

export const CASE_STUDIES: CaseStudyData[] = [
  {
    id: 1,
    companyType: 'อุตสาหกรรมยานยนต์ (Automotive)',
    title: 'การตรวจหารอยแตกขนาดเล็ก (Micro-cracks)',
    description: 'ในกระบวนการผลิตชิ้นส่วนยานยนต์ที่มีความสำคัญสูง ความผิดพลาดแม้เพียงเล็กน้อยอาจส่งผลถึงชีวิต',
    solution: 'ใช้กล้องความละเอียดสูงร่วมกับ AI Model ที่ฝึกฝนด้วยภาพรอยแตกหลายรูปแบบ',
    result: 'สามารถตรวจจับรอยแตกที่ตาเปล่ามองไม่เห็น และรอยสีที่ผิดเพี้ยน ช่วยลดการส่งมอบสินค้าเสีย',
    image: 'https://picsum.photos/id/111/800/600', // Car/Machine related
  },
  {
    id: 2,
    companyType: 'อาหารและเครื่องดื่ม (F&B)',
    title: 'High-Speed Bottling Inspection',
    description: 'สายการผลิตเครื่องดื่มที่มีความเร็วสูงกว่า 60,000 ขวดต่อชั่วโมง มนุษย์ไม่สามารถตรวจสอบทัน',
    solution: 'ติดตั้งระบบ Computer Vision หลายจุด เพื่อตรวจสอบฝาขวด ระดับน้ำ และฉลาก',
    result: 'ตรวจสอบได้ครอบคลุม 100% (ไม่ใช่สุ่มตรวจ) รักษามาตรฐานความปลอดภัยอาหาร',
    image: 'https://picsum.photos/id/75/800/600', // Food/Life
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'ขั้นตอนแรกของการประมวลผลภาพในระบบตรวจสอบคุณภาพคืออะไร?',
    options: ['Decision', 'Image Acquisition', 'Inference', 'Pre-processing'],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: 'ข้อใดไม่ใช่ประโยชน์หลักของ Computer Vision ใน QC?',
    options: ['ทำงานได้ 24 ชั่วโมง', 'ลดความผิดพลาดจากมนุษย์', 'ราคาถูกกว่าแรงงานคนในระยะสั้น', 'เก็บข้อมูล Real-time'],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'เทคโนโลยีใดช่วยให้คอมพิวเตอร์ "เรียนรู้" ลักษณะข้อบกพร่องได้?',
    options: ['Deep Learning', 'Blockchain', 'Cloud Computing', '5G'],
    correctAnswer: 0,
  },
];
