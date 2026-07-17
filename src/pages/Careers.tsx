import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, Heart, Zap, Globe, ArrowRight, CheckCircle, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Careers = () => {
  const positions = [
    { title: 'Mathematics Tutor (GCSE)', type: 'Part-time / Full-time', location: 'Nottingham' },
    { title: 'English Language Specialist', type: 'Part-time', location: 'Nottingham' },
    { title: '11+ Entrance Exam Coach', type: 'Weekend', location: 'Nottingham' },
    { title: 'Urdu Language Instructor', type: 'Evening', location: 'Nottingham' }
  ];

  const benefits = [
    { icon: Heart, title: 'Inspiring Environment', desc: 'Work with motivated students and a supportive team of educators.' },
    { icon: Zap, title: 'Professional Growth', desc: 'Regular training sessions and opportunities for career advancement.' },
    { icon: Globe, title: 'Flexible Scheduling', desc: 'Choose shifts that fit your lifestyle and other commitments.' },
    { icon: Briefcase, title: 'Competitive Pay', desc: 'We value expertise and offer industry-leading compensation packages.' }
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-secondary to-accent-yellow text-white py-20 mb-12 relative overflow-hidden shadow-2xl shadow-primary/20">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-orange rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Passionate about education? We're always looking for talented tutors to join our growing academy in Nottingham.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-primary">Why Work With Us?</h2>
            <p className="text-black">We provide more than just a job; we provide a platform to make a real difference.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((b, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm">
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                  <b.icon className="text-primary" size={28} />
                </div>
                <h3 className="text-xl font-bold mb-3">{b.title}</h3>
                <p className="text-black text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 text-primary">Open Positions</h2>
            <p className="text-black">Current opportunities to join our Nottingham campus.</p>
          </div>
          <div className="space-y-4 max-w-4xl mx-auto">
            {positions.map((p, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-primary transition-colors shadow-sm">
                <div>
                  <h4 className="text-xl font-bold mb-1">{p.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-primary/50">
                    <span className="flex items-center"><Briefcase size={14} className="mr-1" /> {p.type}</span>
                    <span className="flex items-center"><Globe size={14} className="mr-1" /> {p.location}</span>
                  </div>
                </div>
                <Link to="/registration" className="btn-outline py-2 px-8 text-sm whitespace-nowrap">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-primary/10">
            <div className="lg:w-1/2 p-12 md:p-16 bg-primary text-white">
              <h2 className="text-3xl font-bold mb-8">Ready to Apply?</h2>
              <p className="text-white/80 text-lg mb-10 leading-relaxed">
                Fill out our teacher registration form and we'll get back to you to schedule an interview.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <CheckCircle className="text-secondary" />
                  <span>DBS Check Required</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="text-secondary" />
                  <span>Subject Expertise Essential</span>
                </div>
                <div className="flex items-center space-x-4">
                  <CheckCircle className="text-secondary" />
                  <span>Passion for Teaching</span>
                </div>
              </div>
              <div className="mt-12 pt-12 border-t border-white/10">
                <p className="text-sm text-white/70 mb-4">Direct Inquiries:</p>
                <div className="flex items-center space-x-4 mb-2">
                  <Mail size={18} className="text-secondary" />
                  <span className="font-bold">careers@nottinghamacademy.co.uk</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone size={18} className="text-secondary" />
                  <span className="font-bold">+44 115 123 4567</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 p-12 md:p-16 flex flex-col justify-center items-center text-center">
              <div className="bg-primary/5 p-10 rounded-[2rem] border border-primary/10">
                <h3 className="text-2xl font-bold mb-6">Start Your Application</h3>
                <p className="text-black mb-10">Use our specialized teacher registration portal to submit your details and CV.</p>
                <Link to="/registration" className="btn-primary inline-flex items-center">
                  Go to Application Form <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
