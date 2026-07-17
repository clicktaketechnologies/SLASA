import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, CheckCircle2 } from 'lucide-react';

interface TuitionCalculatorProps {
  initialCourse?: string;
}

const TuitionCalculator: React.FC<TuitionCalculatorProps> = ({ initialCourse = 'gcse' }) => {
  const [course, setCourse] = useState(initialCourse);
  const [sessions, setSessions] = useState(1);

  const courses = [
    { id: 'ks1', name: 'KS1 Tuition', price: 15 },
    { id: 'ks2', name: 'KS2 Tuition', price: 15 },
    { id: 'ks3', name: 'KS3 Tuition', price: 18 },
    { id: 'gcse', name: 'GCSE Coaching', price: 20 },
    { id: '11plus', name: '11+ Preparation', price: 20 },
    { id: 'sats', name: 'SATs Tuition', price: 15 },
    { id: 'urdu', name: 'Urdu Language', price: 12 },
  ];

  const selectedCourse = courses.find(c => c.id === course) || courses[3];
  const monthlyPrice = selectedCourse.price * sessions * 4;

  return (
    <div className="bg-white rounded-[3rem] border border-primary/10 shadow-2xl overflow-hidden">
      <div className="bg-primary p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <Calculator size={24} />
          <h3 className="text-2xl font-black tracking-tight uppercase">Tuition Calculator</h3>
        </div>
        <p className="text-white/80 font-medium">Estimate your monthly investment in your child's future.</p>
      </div>
      
      <div className="p-8 space-y-8">
        <div>
          <label className="block text-sm font-black text-primary uppercase tracking-widest mb-4">Select Course</label>
          <div className="grid grid-cols-2 gap-3">
            {courses.map((c) => (
              <button
                key={c.id}
                onClick={() => setCourse(c.id)}
                className={`px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                  course === c.id 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-primary/5 text-primary/70 hover:bg-primary/10'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-black text-primary uppercase tracking-widest mb-4">Sessions Per Week: {sessions}</label>
          <input 
            type="range" 
            min="1" 
            max="5" 
            value={sessions} 
            onChange={(e) => setSessions(parseInt(e.target.value))}
            className="w-full h-3 bg-primary/10 rounded-full appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between mt-2 text-xs font-bold text-primary/40">
            <span>1 Session</span>
            <span>5 Sessions</span>
          </div>
        </div>

        <div className="bg-primary/5 p-8 rounded-3xl border border-primary/10 text-center">
          <p className="text-primary/50 font-bold uppercase tracking-widest text-xs mb-2">Estimated Monthly Total</p>
          <div className="text-5xl font-black text-primary mb-2">£{monthlyPrice}</div>
          <p className="text-primary/40 text-sm font-medium">Based on 4 weeks per month</p>
        </div>

        <div className="space-y-3">
          {[
            'Weekly sessions with expert tutors',
            'Personalized learning materials',
            'Detailed progress reports',
            'Parent-teacher updates'
          ].map((item, i) => (
            <div key={i} className="flex items-center space-x-3 text-sm font-bold text-primary/70">
              <CheckCircle2 className="text-accent-green" size={18} />
              <span>{item}</span>
            </div>
          ))}
        </div>

        <button className="btn-secondary w-full py-5 text-lg shadow-xl shadow-secondary/20">
          Book Free Trial Now
        </button>
      </div>
    </div>
  );
};

export default TuitionCalculator;
