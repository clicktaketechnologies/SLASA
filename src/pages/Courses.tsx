import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, GraduationCap, Users, Award, Target, Languages, 
  ArrowRight, CheckCircle, Clock, PoundSterling, Calendar, 
  Play, Star, TrendingUp, BarChart3, MessageSquare, 
  MapPin, HelpCircle, ShieldCheck, 
  Zap, Sparkles, ChevronRight, ChevronLeft, Quote, Upload
} from 'lucide-react';
import { COURSES, TESTIMONIALS } from '../constants';
import TuitionCalculator from '../components/TuitionCalculator';

const Courses = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [activeCourse, setActiveCourse] = useState(slug || 'gcse');

  useEffect(() => {
    if (slug) {
      setActiveCourse(slug);
    }
  }, [slug]);

  const course = COURSES.find(c => c.slug === activeCourse) || COURSES[3];
  
  const iconMap: Record<string, any> = {
    BookOpen, GraduationCap, Users, Award, Target, Languages
  };
  const Icon = iconMap[course.icon] || BookOpen;

  const handleCourseChange = (newSlug: string) => {
    setActiveCourse(newSlug);
    navigate(`/courses/${newSlug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="pt-20 bg-white">
      {/* 1. HERO SECTION (COURSE SPECIFIC) */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-secondary text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/10"
          >
            <Sparkles className="text-accent-yellow" size={16} />
            <span className="text-xs font-black uppercase tracking-widest">Premium Tuition Nottingham</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight"
          >
            {course.title} in <span className="text-secondary">Nottingham</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Build confidence and achieve top grades with expert tutors and smart learning tools.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link to="/registration" className="btn-secondary px-12 py-6 text-xl shadow-2xl shadow-secondary/30 w-full sm:w-auto">
              Book Free Trial
            </Link>
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/100?img=${i+10}`} className="w-10 h-10 rounded-full border-2 border-primary" alt="Student" />
                ))}
              </div>
              <p className="text-white text-sm font-bold">Join 500+ successful students</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. VIDEO / IMAGE SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[4rem] blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl aspect-video bg-primary/5">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1920" 
                alt="Learning Environment" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <button className="w-24 h-24 bg-white text-primary rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform group/play">
                  <Play size={40} fill="currentColor" className="ml-2" />
                </button>
              </div>
            </div>
          </div>
          <div className="text-center mt-12">
            <h3 className="text-2xl md:text-3xl font-black text-primary tracking-tight">
              Helping students succeed with structured and personalized learning
            </h3>
          </div>
        </div>
      </section>

      {/* 3. TUTOR TRUST BLOCK */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
                <ShieldCheck className="text-primary" size={16} />
                <span className="text-xs font-black uppercase tracking-widest text-primary">Expert Tutors</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 tracking-tight">
                Learn from the Best in Nottingham
              </h2>
              <p className="text-black text-lg mb-10 leading-relaxed font-medium">
                Our tutors are not just experts in their subjects; they are passionate educators committed to your child's success. Every tutor undergoes a rigorous selection process and enhanced DBS checks.
              </p>
              <div className="space-y-6">
                {[
                  { title: 'Qualified Tutors', desc: 'Subject specialists with UK teaching experience.' },
                  { title: 'Years of Experience', desc: 'Proven track record of helping students achieve top grades.' },
                  { title: 'DBS Checked', desc: 'Safety and security are our top priorities.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-green-100 p-2 rounded-lg mt-1">
                      <CheckCircle className="text-secondary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-primary uppercase tracking-tight text-sm mb-1">{item.title}</h4>
                      <p className="text-black text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent-yellow/20 rounded-full blur-3xl"></div>
              <div className="bg-white p-8 rounded-[3rem] shadow-2xl border border-primary/10 relative z-10">
                <div className="flex items-center space-x-6 mb-8">
                  <img src="https://i.pravatar.cc/150?img=32" className="w-24 h-24 rounded-2xl object-cover shadow-lg" alt="Tutor" />
                  <div>
                    <h4 className="text-2xl font-black text-primary tracking-tight">Dr. Sarah Mitchell</h4>
                    <p className="text-primary font-bold">Senior GCSE Specialist</p>
                    <div className="flex items-center space-x-1 mt-2">
                      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="#FFD700" className="text-accent-yellow" />)}
                      <span className="text-primary/40 font-bold ml-2">(4.9/5)</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-primary/5 rounded-2xl border border-primary/10">
                  <p className="text-black italic font-medium">
                    "My goal is to make complex topics simple and build the confidence students need to excel in their exams."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PERSONALIZED LEARNING SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1000" 
                className="rounded-[3rem] shadow-2xl" 
                alt="Personalized Learning" 
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-black text-primary mb-8 tracking-tight">
                Every student gets a <span className="text-primary">tailored learning plan</span>
              </h2>
              <div className="space-y-8">
                {[
                  { icon: Target, title: 'Weak Area Focus', desc: 'We identify and target specific gaps in knowledge.' },
                  { icon: TrendingUp, title: 'Progress Tracking', desc: 'Real-time monitoring of student performance.' },
                  { icon: MessageSquare, title: 'Regular Feedback', desc: 'Consistent updates for both students and parents.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-6">
                    <div className="bg-primary/5 p-4 rounded-2xl text-primary shadow-inner">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-primary mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-black font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RESULTS / PERFORMANCE SECTION */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Proven Results & Performance</h2>
            <p className="text-white text-lg max-w-2xl mx-auto font-medium">We take pride in our students' achievements and consistent growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 text-center group hover:bg-white/10 transition-all">
              <div className="text-6xl font-black text-secondary mb-4">85%</div>
              <p className="text-white font-bold uppercase tracking-widest text-xs">Average Improvement</p>
              <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '85%' }}
                  className="h-full bg-secondary"
                ></motion.div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 text-center group hover:bg-white/10 transition-all">
              <div className="text-6xl font-black text-accent-yellow mb-4">90%</div>
              <p className="text-white font-bold uppercase tracking-widest text-xs">Student Satisfaction</p>
              <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '90%' }}
                  className="h-full bg-accent-yellow"
                ></motion.div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-10 rounded-[3rem] border border-white/10 text-center group hover:bg-white/10 transition-all">
              <div className="text-6xl font-black text-brand-orange mb-4">95%</div>
              <p className="text-white font-bold uppercase tracking-widest text-xs">Pass Rate</p>
              <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '95%' }}
                  className="h-full bg-brand-orange"
                ></motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 & 7. PRICING & CALCULATOR SECTION */}
      <section className="py-24 bg-white" id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 tracking-tight">
                Transparent Pricing for <span className="text-secondary">Premium Tuition</span>
              </h2>
              <p className="text-black text-lg mb-12 leading-relaxed font-medium">
                We believe in providing high-quality education that is accessible. Our plans are flexible and designed to fit your needs.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  'Plans starting from £' + (course.pricingStart || '60') + '/month',
                  'Weekly sessions with expert tutors',
                  'Full progress reports & parent updates'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-4 text-primary/80 font-bold">
                    <CheckCircle className="text-accent-green" size={24} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/registration" className="btn-primary px-12 py-6 text-xl shadow-2xl shadow-primary/30">
                Get Started
              </Link>
            </div>
            <div>
              <TuitionCalculator initialCourse={course.id} />
            </div>
          </div>
        </div>
      </section>

      {/* 8. REVIEWS SECTION */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-primary mb-6 tracking-tight">What Parents & Students Say</h2>
            <div className="flex items-center justify-center space-x-2 text-accent-yellow">
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <Star fill="currentColor" size={24} />
              <span className="text-primary font-black ml-4 text-xl">4.9/5 on Trustpilot</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-10 rounded-[3rem] shadow-sm border border-primary/10 relative group hover:shadow-xl transition-all">
                <Quote className="absolute top-8 right-8 text-primary/5 group-hover:text-primary/10 transition-colors" size={64} />
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#FFD700" className="text-accent-yellow" />)}
                </div>
                <p className="text-black text-lg mb-8 leading-relaxed font-medium relative z-10">"{t.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-black text-primary">{t.name}</h4>
                    <p className="text-primary/40 text-sm font-bold uppercase tracking-widest">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-primary mb-6 tracking-tight">How It Works</h2>
            <p className="text-black font-medium">Three simple steps to academic success.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-primary/5 -translate-y-1/2 z-0"></div>
            {[
              { step: '01', title: 'Book Free Trial', desc: 'Schedule a free assessment and trial session.' },
              { step: '02', title: 'Initial Assessment', desc: 'We identify strengths and areas for improvement.' },
              { step: '03', title: 'Start Classes', desc: 'Begin your personalized learning journey.' }
            ].map((item, i) => (
              <div key={i} className="relative z-10 text-center">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-8 text-2xl font-black shadow-xl shadow-primary/30 border-8 border-white">
                  {item.step}
                </div>
                <h4 className="text-2xl font-black text-primary mb-4 tracking-tight">{item.title}</h4>
                <p className="text-black font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. STRUCTURED PROGRAM SECTION */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-primary mb-6 tracking-tight">Structured Program</h2>
            <p className="text-black font-medium">Focus: {course.programFocus}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {course.syllabus.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm hover:shadow-md transition-all">
                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                  <CheckCircle size={24} />
                </div>
                <h4 className="text-xl font-black text-primary mb-2 tracking-tight">{item}</h4>
                <p className="text-black text-sm font-medium">Mastering core concepts through structured modules.</p>
              </div>
            ))}
            <div className="bg-primary p-8 rounded-3xl text-white shadow-xl shadow-primary/20 flex flex-col justify-center">
              <h4 className="text-xl font-black mb-4 tracking-tight">Exam Prep & Mock Tests</h4>
              <p className="text-white text-sm font-medium mb-6">Regular assessments to ensure exam readiness.</p>
              <Link to="/registration" className="text-white font-black flex items-center hover:translate-x-2 transition-transform">
                View Full Syllabus <ArrowRight className="ml-2" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 11. MEET OUR TUTORS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <h2 className="text-4xl font-black text-primary mb-4 tracking-tight">Meet Our Expert Tutors</h2>
              <p className="text-black font-medium">The brilliant minds behind our students' success.</p>
            </div>
            <div className="flex space-x-4">
              <button className="p-4 rounded-full border border-primary/10 hover:bg-primary/5 transition-colors">
                <ChevronLeft size={24} />
              </button>
              <button className="p-4 rounded-full bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-colors">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'James Wilson', subject: 'Mathematics', exp: '8+ Years', img: 'https://i.pravatar.cc/150?img=11' },
              { name: 'Dr. Emily Chen', subject: 'Sciences', exp: '12+ Years', img: 'https://i.pravatar.cc/150?img=24' },
              { name: 'Robert Taylor', subject: 'English Literature', exp: '10+ Years', img: 'https://i.pravatar.cc/150?img=12' }
            ].map((tutor, i) => (
              <div key={i} className="bg-white rounded-[3rem] border border-primary/10 shadow-sm overflow-hidden group hover:shadow-xl transition-all">
                <div className="h-64 overflow-hidden">
                  <img src={tutor.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={tutor.name} />
                </div>
                <div className="p-8">
                  <h4 className="text-2xl font-black text-primary tracking-tight">{tutor.name}</h4>
                  <p className="text-primary font-bold mb-4">{tutor.subject}</p>
                  <div className="flex items-center justify-between pt-6 border-t border-primary/5">
                    <span className="text-primary/40 font-black uppercase tracking-widest text-[10px]">Experience</span>
                    <span className="text-primary font-black">{tutor.exp}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. LOCATION SECTION */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl font-black text-primary mb-8 tracking-tight">
                Find a Centre <span className="text-primary">Near You</span>
              </h2>
              <p className="text-black text-lg mb-10 leading-relaxed font-medium">
                We are conveniently located in the heart of Nottingham, providing a safe and inspiring environment for learning.
              </p>
              <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm mb-10">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-primary mt-1" size={24} />
                  <div>
                    <h4 className="font-black text-primary mb-2">Nottingham City Centre</h4>
                    <p className="text-black text-sm font-medium mb-4">123 Learning Lane, Nottingham, NG1 2AB</p>
                    <a href="https://maps.google.com" target="_blank" rel="noreferrer" className="text-primary font-black text-sm hover:underline">Get Directions</a>
                  </div>
                </div>
              </div>
              <Link to="/venue" className="btn-outline px-10 py-4">
                View All Locations
              </Link>
            </div>
            <div className="rounded-[3rem] overflow-hidden shadow-2xl h-[500px] bg-primary/10 relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d153835.6548590146!2d-1.28485295!3d52.9548174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4879c1d875418571%3A0x42e685b9e27f010!2sNottingham!5e0!3m2!1sen!2suk!4v1710680000000!5m2!1sen!2suk" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 13. WHAT IS THIS COURSE (SEO GOLD) */}
      <section className="py-24 bg-white border-t border-primary/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-primary mb-8 tracking-tight">What is {course.title}?</h2>
          <div className="prose prose-lg mx-auto text-black font-medium leading-relaxed">
            <p>{course.seoContent}</p>
          </div>
        </div>
      </section>

      {/* 14. FAQ SECTION */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-primary mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-black font-medium">Everything you need to know about our {course.title} program.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'What age group is this for?', a: 'This course is specifically designed for students in the relevant age bracket for ' + course.title + '.' },
              { q: 'What are the fees?', a: 'Our fees are competitive and start from ' + course.fees + '. We offer flexible monthly plans.' },
              { q: 'What are the timings?', a: 'We offer flexible timings including after-school sessions and weekends: ' + course.timings + '.' },
              { q: 'Is online tuition available?', a: 'Yes, we offer both in-person sessions at our Nottingham centre and interactive online classes.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-primary/10 overflow-hidden transition-all">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-black text-primary list-none">
                  {faq.q}
                  <ChevronRight className="group-open:rotate-90 transition-transform text-primary/40" size={20} />
                </summary>
                <div className="px-6 pb-6 text-black font-medium leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 15. TRUST BADGES */}
      <section className="py-16 bg-white border-y border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center space-x-3">
              <ShieldCheck className="text-primary" size={32} />
              <span className="font-black text-primary uppercase tracking-widest text-xs">Certified Tutors</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="text-secondary" size={32} />
              <span className="font-black text-primary uppercase tracking-widest text-xs">Secure Learning</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="text-accent-yellow" size={32} />
              <span className="font-black text-primary uppercase tracking-widest text-xs">Parent Approved</span>
            </div>
            <div className="flex items-center space-x-3">
              <ShieldCheck className="text-primary" size={32} />
              <span className="font-black text-primary uppercase tracking-widest text-xs">DBS Checked</span>
            </div>
          </div>
        </div>
      </section>

      {/* 16. FINAL CTA SECTION */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-black text-primary mb-8 tracking-tight">
            Ready to <span className="text-primary">Succeed?</span>
          </h2>
          <p className="text-black text-xl mb-12 font-medium leading-relaxed">
            Join Nottingham's most trusted tuition centre and give your child the academic advantage they deserve.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/registration" className="btn-secondary px-12 py-6 text-xl shadow-2xl shadow-secondary/30 w-full sm:w-auto">
              Book Free Trial
            </Link>
            <Link to="/contact" className="btn-outline px-12 py-6 text-xl w-full sm:w-auto">
              Contact Us
            </Link>
          </div>
          <div className="mt-16 pt-16 border-t border-primary/10 flex flex-col md:flex-row items-center justify-center gap-12">
            <div>
              <p className="text-primary/40 font-black uppercase tracking-widest text-[10px] mb-2">Other Courses</p>
              <div className="flex flex-wrap justify-center gap-3">
                {COURSES.filter(c => c.slug !== activeCourse).map(c => (
                  <button 
                    key={c.id} 
                    onClick={() => handleCourseChange(c.slug)}
                    className="px-4 py-2 bg-primary/5 text-primary/70 rounded-full text-xs font-bold hover:bg-primary hover:text-white transition-all"
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Courses;
