import React from 'react';
import { motion } from 'motion/react';
import { RefreshCcw, Award, CheckCircle, ArrowRight, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const Retakes = () => {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">GCSE Retake Programs</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Didn't get the grades you wanted? It's not the end of the road. Start again strong with our intensive improvement courses.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000" 
                alt="Student studying hard" 
                className="rounded-[3rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-3xl shadow-xl border border-primary/10 hidden md:block">
                <div className="flex items-center space-x-4">
                  <div className="bg-accent-green/10 p-3 rounded-2xl">
                    <RefreshCcw className="text-accent-green" />
                  </div>
                  <div>
                    <p className="text-sm text-primary/60">Success Rate</p>
                    <p className="text-2xl font-bold text-primary">98% Improved</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Our Retake Program?</h2>
              <p className="text-primary/70 text-lg mb-8">
                Our GCSE retake courses are designed to identify exactly where things went wrong and provide the specific support needed to turn those grades around.
              </p>
              
              <div className="space-y-6 mb-10">
                {[
                  { title: 'Intensive Revision', desc: 'Focused sessions covering the entire syllabus in a condensed timeframe.' },
                  { title: 'Exam Technique Mastery', desc: 'Learn how to read questions correctly and structure high-scoring answers.' },
                  { title: 'Small Group Support', desc: 'Maximum 6 students per group for personalized attention.' },
                  { title: 'Regular Mock Exams', desc: 'Build exam stamina and reduce anxiety through frequent practice.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <CheckCircle className="text-secondary shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-primary">{item.title}</h4>
                      <p className="text-primary/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link to="/registration" className="btn-primary inline-flex items-center">
                Start Again Strong <ArrowRight className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Core Retake Subjects</h2>
            <p className="text-primary/70">We specialize in the most critical GCSE subjects for college entry.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { subject: 'Mathematics', boards: 'AQA, Edexcel, OCR', focus: 'Algebra, Geometry, Statistics' },
              { subject: 'English Language', boards: 'AQA, Edexcel', focus: 'Creative Writing, Analysis, SPAG' },
              { subject: 'Combined Science', boards: 'AQA, Edexcel', focus: 'Biology, Chemistry, Physics' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm">
                <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <BookOpen className="text-primary" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-primary">{item.subject}</h3>
                <p className="text-secondary text-sm font-bold mb-4">{item.boards}</p>
                <p className="text-primary/60 text-sm mb-6">Key Focus: {item.focus}</p>
                <Link to="/registration" className="text-primary font-bold text-sm flex items-center hover:text-secondary transition-colors">
                  Enroll Now <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-primary/5 p-12 rounded-[3rem] border border-primary/10">
            <Award className="text-secondary mx-auto mb-6" size={48} />
            <h2 className="text-3xl font-bold mb-6">"I went from a Grade 3 to a Grade 7"</h2>
            <p className="text-primary/70 text-lg italic mb-8">
              "I was devastated after my results, but Slasa gave me the confidence I needed. The tutors really understood where I was struggling and helped me master the exam techniques."
            </p>
            <p className="font-bold text-primary">— James D., GCSE Retake Student</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Retakes;
