import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle, Target, Users, Award, BookOpen, Clock, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tuition = () => {
  const methodology = [
    {
      title: 'Assessment & Goal Setting',
      desc: 'We start with a comprehensive assessment to identify strengths and areas for improvement.',
      icon: Target
    },
    {
      title: 'Personalized Learning Plan',
      desc: 'A tailored roadmap is created for each student based on their unique learning style.',
      icon: BookOpen
    },
    {
      title: 'Expert Instruction',
      desc: 'Small group sessions led by subject specialists ensure deep understanding of concepts.',
      icon: Users
    },
    {
      title: 'Continuous Monitoring',
      desc: 'Regular testing and feedback loops to track progress and adjust the learning path.',
      icon: BarChart3
    }
  ];

  const timeline = [
    { week: 'Week 1-2', task: 'Diagnostic Testing & Baseline Assessment' },
    { week: 'Week 3-6', task: 'Core Concept Mastery & Foundation Building' },
    { week: 'Week 7-10', task: 'Advanced Problem Solving & Application' },
    { week: 'Week 11-12', task: 'Mock Exams & Intensive Revision' }
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Structured Tuition Methodology</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Our proven approach to academic success, combining expert instruction with data-driven progress tracking.
          </p>
        </div>
      </section>

      {/* Methodology Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How We Teach</h2>
            <p className="text-black">A four-step process designed for maximum impact.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {methodology.map((m, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <m.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{m.title}</h3>
                <p className="text-black text-sm leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Progress Tracking */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Real-Time Progress Tracking</h2>
              <p className="text-black text-lg mb-8">
                We believe in transparency. Parents receive regular reports and can track their child's progress through our digital portal.
              </p>
              <ul className="space-y-4">
                {[
                  'Weekly performance reports',
                  'Monthly parent-teacher consultations',
                  'Digital homework tracking',
                  'Mock exam analytics'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="text-secondary" size={20} />
                    <span className="font-medium text-primary/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-primary/10">
              <div className="flex items-center justify-between mb-8">
                <h4 className="font-bold text-lg">Sample Progress Chart</h4>
                <TrendingUp className="text-secondary" />
              </div>
              <div className="space-y-6">
                {[
                  { label: 'Mathematics', value: 85 },
                  { label: 'English Literature', value: 72 },
                  { label: 'Science', value: 91 },
                  { label: 'Verbal Reasoning', value: 78 }
                ].map((stat, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm font-bold mb-2">
                      <span>{stat.label}</span>
                      <span className="text-primary">{stat.value}%</span>
                    </div>
                    <div className="w-full bg-primary/10 h-3 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="bg-primary h-full rounded-full"
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Timeline */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">The Learning Journey</h2>
            <p className="text-black">A typical 12-week intensive cycle.</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/10 hidden md:block"></div>
            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div key={idx} className={`flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="md:w-1/2"></div>
                  <div className="z-10 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 border-white shadow-lg">
                    {idx + 1}
                  </div>
                  <div className="md:w-1/2 p-6">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/10 hover:border-primary transition-colors">
                      <span className="text-secondary font-bold text-sm uppercase tracking-wider">{item.week}</span>
                      <h4 className="text-xl font-bold mt-2">{item.task}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-secondary rounded-[3rem] p-12 text-center text-white shadow-xl shadow-secondary/20">
            <h2 className="text-3xl font-bold mb-6">Experience Our Methodology Firsthand</h2>
            <p className="text-white/80 text-lg mb-10">Book a free assessment session for your child today.</p>
            <Link to="/registration" className="btn-primary bg-primary border-none hover:bg-primary/90">
              Book Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tuition;
