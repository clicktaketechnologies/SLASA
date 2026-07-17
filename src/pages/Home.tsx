import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, CheckCircle, Star, Users, BookOpen, GraduationCap, 
  Award, Target, Languages, ShieldCheck, Zap, Brain, MessageSquare, 
  Mic, BarChart3, Clock, Sparkles, PlayCircle, X, Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { COURSES, TESTIMONIALS, STATS } from '../constants';

const Home = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = sessionStorage.getItem('hasSeenAnnouncement');
    if (!hasSeenAnnouncement) {
      const timer = setTimeout(() => {
        setShowAnnouncement(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeAnnouncement = () => {
    setShowAnnouncement(false);
    sessionStorage.setItem('hasSeenAnnouncement', 'true');
  };

  return (
    <div className="overflow-hidden">
      {/* Announcement Modal */}
      <AnimatePresence>
        {showAnnouncement && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-primary/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[3rem] shadow-2xl max-w-lg w-full overflow-hidden"
            >
              <button 
                onClick={closeAnnouncement}
                className="absolute top-6 right-6 p-2 rounded-full bg-primary/5 text-primary/60 hover:bg-primary/10 transition-colors z-10"
              >
                <X size={20} />
              </button>
              
              <div className="bg-primary p-12 text-center text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Bell size={32} className="text-white" />
                </div>
                <h3 className="text-3xl font-black mb-2 tracking-tight">Important Announcement</h3>
                <p className="text-white font-medium uppercase tracking-widest text-xs">Academic Year 2026</p>
              </div>
              
              <div className="p-12 text-center">
                <h4 className="text-2xl font-bold text-primary mb-4">Enrollment Now Open!</h4>
                <p className="text-black text-lg leading-relaxed mb-8">
                  Secure your child's place for the upcoming term. Limited spaces available for KS1-GCSE and 11+ preparation.
                </p>
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/registration" 
                    onClick={closeAnnouncement}
                    className="btn-primary w-full py-4 text-lg"
                  >
                    Register Interest
                  </Link>
                  <button 
                    onClick={closeAnnouncement}
                    className="text-primary/40 font-bold hover:text-primary/60 transition-colors"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 lg:pt-32 pb-20 bg-gradient-to-br from-primary via-primary-light to-primary overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[150px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Left: Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 text-white text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8"
              >
                <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest">Ofsted Registered: 2864735</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                Trusted Tuition in <br />
                <span className="text-accent-yellow">Nottingham</span>, <br />
                Proven Results
              </h1>
              
              <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed font-medium">
                KS1 to GCSE | 11+ | Urdu Language
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10">
                <Link to="/registration" className="btn-secondary text-lg px-10 py-5">
                  Book Free Assessment
                </Link>
                <Link to="/courses" className="btn-outline border-white text-white hover:bg-white/10 text-lg px-10 py-5">
                  View Courses
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6">
                <motion.a 
                  href="https://reports.ofsted.gov.uk/provider/16/2864735" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-4 border-2 border-secondary/20 group transition-all"
                >
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xs shadow-lg group-hover:bg-secondary transition-colors">OFSTED</div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-primary/60">Registered Provider</span>
                    <span className="block text-sm font-black text-primary">URN: 2864735</span>
                  </div>
                </motion.a>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-white p-4 rounded-2xl shadow-xl flex items-center space-x-4 border-2 border-accent-yellow/20 group transition-all"
                >
                  <div className="w-14 h-14 bg-accent-yellow rounded-xl flex items-center justify-center text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-colors">
                    <Award size={32} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-primary/60">Highfield Approved</span>
                    <span className="block text-sm font-black text-primary">Training Centre</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Image/Video Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white/10 group">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200" 
                  alt="Students learning" 
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                <button className="absolute inset-0 flex items-center justify-center group">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                    <PlayCircle size={48} className="text-white fill-white/20" />
                  </div>
                </button>
              </div>
              
              {/* Floating Stats Card */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-3xl shadow-2xl border border-primary/10 hidden sm:block"
              >
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-3 rounded-2xl">
                    <Users className="text-primary" size={24} />
                  </div>
                  <div>
                    <p className="text-2xl font-black text-primary">40k+</p>
                    <p className="text-xs font-bold text-black uppercase tracking-widest">Students Taught</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ACCREDITATIONS & TRUST SECTION */}
      <section className="py-24 bg-white border-b border-primary/5 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/gplay.png')]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-primary/5 text-primary px-4 py-2 rounded-full mb-4 border border-primary/10"
            >
              <ShieldCheck size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified & Accredited</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-6 tracking-tight">Our Accreditations & Trust</h2>
            <p className="text-black/70 max-w-2xl mx-auto font-medium text-lg">
              SLASA Academy is committed to the highest standards of education and safety. We are proud to be recognized by leading UK educational bodies and ranked among the best in the country.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Ofsted Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-accent-yellow/5 to-white p-10 rounded-[3.5rem] border-2 border-accent-yellow/20 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-yellow/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform"></div>
              <div className="w-36 h-36 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-accent-yellow font-black text-3xl border-4 border-accent-yellow/20 shrink-0 relative z-10 overflow-hidden">
                {/* Fallback logic: If logo exists, show logo. Else show text. */}
                <span className="drop-shadow-sm">OFSTED</span>
              </div>
              <div className="text-center md:text-left relative z-10">
                <h3 className="text-2xl font-black text-primary mb-2">Ofsted Registered</h3>
                <p className="text-accent-yellow mb-4 font-black italic tracking-widest text-xs uppercase">Gold Standard Safety & Quality</p>
                <p className="text-sm text-black/80 mb-6 leading-relaxed font-medium">
                  As an Ofsted registered provider, we adhere to strict government standards for safety, quality, and educational excellence.
                </p>
                <a 
                  href="https://reports.ofsted.gov.uk/provider/16/2864735" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-accent-yellow font-black hover:underline group/link"
                >
                  View Official Report <ArrowRight size={16} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </a>
              </div>
            </motion.div>

            {/* Highfield Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-accent-yellow/5 to-white p-10 rounded-[3.5rem] border-2 border-accent-yellow/20 flex flex-col md:flex-row items-center gap-8 shadow-sm hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-accent-yellow/10 rounded-full -mr-20 -mt-20 blur-3xl group-hover:scale-150 transition-transform"></div>
              <div className="w-36 h-36 bg-white rounded-[2.5rem] shadow-xl flex items-center justify-center text-accent-yellow border-4 border-accent-yellow/20 shrink-0 relative z-10 overflow-hidden">
                <Award size={72} className="drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]" />
              </div>
              <div className="text-center md:text-left relative z-10">
                <h3 className="text-2xl font-black text-primary mb-2">Highfield Approved</h3>
                <p className="text-accent-yellow mb-4 font-black italic tracking-widest text-xs uppercase">Regulated Training Centre</p>
                <p className="text-sm text-black/80 mb-6 leading-relaxed font-medium">
                  SLASA is an approved centre of Highfield Qualifications for delivering regulated qualifications across multiple levels.
                </p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {["British Values", "Functional Skills", "English L1/L2"].map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-primary border border-accent-yellow/20 uppercase tracking-tighter shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Trust Badges Grid - Premium Design */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
            {[
              { 
                title: "Top 3 Ranked UK", 
                subtitle: "Tuition Excellence 2026", 
                icon: Star, 
                text: "TOP 3 UK",
                logo: null,
                verified: true,
                color: "text-accent-yellow"
              },
              { 
                title: "Best Rated Academy", 
                subtitle: "Verified by Parents", 
                icon: Award, 
                text: "BEST RANK",
                logo: null,
                verified: true,
                color: "text-secondary"
              },
              { 
                title: "UKRLP Registered", 
                subtitle: "Provider: 10094251", 
                icon: GraduationCap, 
                text: "UKRLP",
                logo: null,
                verified: true,
                color: "text-primary"
              },
              { 
                title: "DBS Verified", 
                subtitle: "Safeguarding Gold", 
                icon: ShieldCheck, 
                text: "DBS SAFE",
                logo: null,
                verified: true,
                color: "text-brand-red"
              },
              { 
                title: "Local Verified", 
                subtitle: "Community Trusted", 
                icon: CheckCircle, 
                text: "VERIFIED",
                logo: null,
                verified: true,
                color: "text-secondary"
              },
              { 
                title: "Premium Quality", 
                subtitle: "UK Design Standard", 
                icon: Sparkles, 
                text: "PREMIUM",
                logo: null,
                verified: true,
                color: "text-brand-orange"
              }
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-[2.5rem] border border-primary/5 shadow-sm hover:shadow-2xl transition-all text-center group relative flex flex-col h-full"
              >
                {badge.verified && (
                  <div className="absolute top-4 right-4 text-secondary">
                    <CheckCircle size={14} fill="currentColor" className="text-secondary fill-secondary/20" />
                  </div>
                )}
                <div className="w-20 h-20 bg-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-all duration-500 relative overflow-hidden shadow-inner shrink-0">
                  {badge.logo ? (
                    <img src={badge.logo} alt={badge.title} className="w-full h-full object-contain p-3" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="flex flex-col items-center justify-center">
                      <badge.icon size={28} className={`${badge.color} group-hover:text-white mb-1 transition-colors`} />
                      <span className="text-[8px] font-black text-primary group-hover:text-white uppercase tracking-tighter transition-colors">{badge.text}</span>
                    </div>
                  )}
                </div>
                <h4 className="text-sm font-black text-primary mb-1 tracking-tight leading-tight">{badge.title}</h4>
                <p className="text-[9px] font-bold text-black/30 uppercase tracking-[0.1em] mt-auto">{badge.subtitle}</p>
              </motion.div>
            ))}
          </div>

          {/* Regulated Qualifications List - Premium Dark Card */}
          <div className="bg-primary text-white p-12 rounded-[4rem] relative overflow-hidden shadow-2xl shadow-primary/30">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-[100px]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full -ml-48 -mb-48 blur-[100px]"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                <div className="text-center md:text-left">
                  <h4 className="text-3xl font-black mb-2 tracking-tight">Regulated Qualifications</h4>
                  <p className="text-white/60 font-medium">Nationally recognized certifications delivered with excellence.</p>
                </div>
                <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 flex items-center space-x-3">
                  <Award className="text-accent-yellow" size={24} />
                  <span className="text-sm font-black uppercase tracking-widest">Highfield Approved Centre</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "Highfield Entry Level Award in Fundamental British Values (Entry 3) (RQF)",
                  "Highfield Functional Skills Qualification in English at Entry Level 1",
                  "Highfield Functional Skills Qualification in English at Entry Level 2",
                  "Highfield Functional Skills Qualification in English at Entry Level 3",
                  "Highfield Functional Skills Qualification in English at Level 1",
                  "Highfield Functional Skills Qualification in English at Level 2"
                ].map((qual, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 bg-white/5 backdrop-blur-sm p-5 rounded-3xl border border-white/10 hover:bg-white/15 transition-all group"
                  >
                    <div className="w-8 h-8 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors shrink-0">
                      <CheckCircle size={16} />
                    </div>
                    <span className="text-sm font-bold leading-snug text-white/90">{qual}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GOLD STANDARD EXCELLENCE SECTION */}
      <section className="py-24 bg-gradient-to-b from-white to-primary/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Left: Visuals */}
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-accent-yellow/20 rounded-[4rem] blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600" 
                    alt="Student learning" 
                    className="w-full h-full object-cover aspect-[4/5]"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="space-y-4 mt-12">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white"
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600" 
                      alt="Classroom" 
                      className="w-full h-full object-cover aspect-square"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                  <div className="bg-accent-yellow p-8 rounded-[3rem] text-primary shadow-xl flex flex-col items-center justify-center text-center">
                    <ShieldCheck size={48} className="mb-4" />
                    <p className="text-2xl font-black leading-tight">100% Secure Environment</p>
                  </div>
                </div>
              </div>
              
              {/* Floating Trust Badge */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-10 -right-10 z-20 bg-white p-8 rounded-[3rem] shadow-2xl border-2 border-accent-yellow/30 flex flex-col items-center text-center max-w-[200px]"
              >
                <div className="w-16 h-16 bg-accent-yellow rounded-2xl flex items-center justify-center text-primary mb-4 shadow-lg">
                  <Star size={32} fill="currentColor" />
                </div>
                <p className="font-black text-primary text-sm uppercase tracking-widest">Gold Standard Tuition</p>
              </motion.div>
            </div>

            {/* Right: Text Content */}
            <div className="lg:w-1/2">
              <div className="inline-flex items-center space-x-2 bg-accent-yellow/10 text-accent-yellow px-4 py-2 rounded-full mb-8 border border-accent-yellow/20">
                <Award size={18} />
                <span className="text-xs font-black uppercase tracking-widest">The SLASA Advantage</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tight text-primary">
                Excellence in Every <br />
                <span className="text-accent-yellow">Learning Moment</span>
              </h2>
              <p className="text-black/80 text-xl mb-10 leading-relaxed font-medium">
                At SLASA Academy, we don't just teach; we inspire. Our "Gold Standard" approach combines traditional UK curriculum excellence with modern educational support to ensure every child reaches their full potential.
              </p>
              
              <div className="space-y-6 mb-12">
                {[
                  { title: 'Ofsted Registered Excellence', desc: 'Meeting and exceeding national standards for safety and quality.' },
                  { title: 'Highfield Approved Qualifications', desc: 'Delivering regulated qualifications that carry real-world weight.' },
                  { title: 'DBS Checked Professionals', desc: 'Every member of our team is fully vetted for your peace of mind.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4 group">
                    <div className="bg-accent-yellow/20 p-2 rounded-lg text-accent-yellow group-hover:bg-accent-yellow group-hover:text-primary transition-all">
                      <CheckCircle size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-primary text-lg">{item.title}</h4>
                      <p className="text-black/60 font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/registration" className="btn-secondary bg-accent-yellow text-primary hover:bg-primary hover:text-white border-accent-yellow">
                  Start Your Journey
                </Link>
                <div className="flex items-center space-x-2 px-6 py-4 rounded-full bg-white border-2 border-primary/5 shadow-sm">
                  <div className="flex text-accent-yellow">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-xs font-black text-primary">5.0 Parent Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GOLDEN TRUST BAR */}
      <section className="py-12 bg-primary border-y border-accent-yellow/30 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-wrap justify-center md:justify-between items-center gap-8 md:gap-4">
            {[
              { icon: Award, text: 'Highfield Approved' },
              { icon: ShieldCheck, text: 'Ofsted Registered' },
              { icon: Star, text: 'Gold Standard Tuition' },
              { icon: CheckCircle, text: 'DBS Checked Staff' },
              { icon: GraduationCap, text: 'UK Curriculum' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.1, y: -5 }}
                className="flex items-center space-x-3 text-accent-yellow group cursor-default"
              >
                <div className="bg-accent-yellow/10 p-2 rounded-lg group-hover:bg-accent-yellow group-hover:text-primary transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                  <item.icon size={24} />
                </div>
                <span className="font-black uppercase tracking-widest text-[10px] md:text-xs text-white group-hover:text-accent-yellow transition-colors">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3 CORE FEATURES */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: Clock, 
                title: 'Weekly Sessions', 
                desc: 'Structured weekly sessions with expert tutors who are passionate about student success.',
                color: 'bg-secondary/10 text-secondary'
              },
              { 
                icon: Target, 
                title: 'Personalized Learning', 
                desc: 'We adapt our teaching style to every student, ensuring no one is left behind.',
                color: 'bg-primary/10 text-primary'
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-10 rounded-[2.5rem] border transition-all duration-300 border-primary/10 shadow-sm hover:shadow-md"
              >
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-8`}>
                  <feature.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-black leading-relaxed text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. COURSES SECTION */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6">Our Academic Programs</h2>
            <p className="text-black text-xl">High-quality tuition tailored for every key stage of your child's education.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { id: 'ks1', title: 'KS1', desc: 'Building strong foundations in core subjects.', icon: BookOpen },
              { id: 'ks2', title: 'KS2', desc: 'Preparing for the transition to secondary school.', icon: GraduationCap },
              { id: 'ks3', title: 'KS3', desc: 'Mastering advanced concepts and skills.', icon: Award },
              { id: 'gcse', title: 'GCSE', desc: 'Intensive preparation for final examinations.', icon: Target },
              { id: '11plus', title: '11 Plus', desc: 'Specialized coaching for grammar school entry.', icon: Sparkles },
              { id: 'sats', title: 'SATs Tuition', desc: 'Expert preparation for Year 2 and Year 6 SATs.', icon: Award },
              { id: 'urdu', title: 'Urdu Language', desc: 'Cultural and linguistic mastery for all ages.', icon: Languages },
            ].map((course) => (
              <motion.div
                key={course.id}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-primary/10 group hover:border-primary transition-all"
              >
                <div className="bg-primary/10 w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <course.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-2">{course.title}</h3>
                <p className="text-black mb-6">{course.desc}</p>
                <Link to={`/courses/${course.id}`} className="text-primary font-bold flex items-center group-hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight size={18} className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW IT WORKS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">How to Get Started</h2>
            <p className="text-black">Your journey to academic excellence in 3 simple steps.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 z-0"></div>
            
            {[
              { step: '01', title: 'Find Course', desc: 'Browse our range of courses and register your interest online.' },
              { step: '02', title: 'Book Free Trial', desc: 'Experience our teaching style first-hand with a no-obligation trial.' },
              { step: '03', title: 'Start Learning', desc: 'Join our academy and begin your path to proven results.' }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 text-center">
                <div className="w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-8 shadow-xl shadow-primary/20">
                  {item.step}
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-black text-lg leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRICING / OFFER SECTION */}
      <section className="py-24 bg-primary/5 px-4">
        <div className="max-w-5xl mx-auto bg-primary rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <span className="bg-secondary text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-8 inline-block">
              Limited Time Offer
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              Tuition from <span className="text-secondary font-black">£15</span> per session
            </h2>
            <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-medium">
              Premium education shouldn't be a luxury. Start your child's journey today with our affordable, high-impact tuition.
            </p>
            <Link to="/registration" className="btn-secondary bg-white text-primary hover:bg-white/90 text-xl px-12 py-6">
              Book Free Trial Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 6. PROVEN RESULTS */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { value: '1000+', label: 'Parent Reviews', icon: Star, color: 'text-accent-yellow' },
              { value: '40,000+', label: 'Students Taught', icon: Users, color: 'text-white' },
              { value: '90%', label: 'Success Rate', icon: Award, color: 'text-secondary' }
            ].map((stat, idx) => (
              <div key={idx} className="p-8">
                <div className="flex justify-center mb-6">
                  <stat.icon size={48} className={stat.color} />
                </div>
                <div className="text-6xl font-black mb-2 tracking-tight">{stat.value}</div>
                <p className="text-white text-lg font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY STUDENTS LOVE US */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Why Students Love Us</h2>
            <p className="text-black">We create an environment where learning is engaging and rewarding.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: 'Perfect Level of Challenge', 
                desc: 'We push students just enough to grow, without overwhelming them.',
                image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=600'
              },
              { 
                title: 'Visible Progress', 
                desc: 'Regular assessments and feedback show exactly how much they are improving.',
                image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600'
              },
              { 
                title: 'Confidence Building', 
                desc: 'Our positive environment helps students believe in their own potential.',
                image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600'
              }
            ].map((item, idx) => (
              <div key={idx} className="group rounded-[2.5rem] overflow-hidden shadow-sm border border-primary/10 hover:shadow-xl transition-all">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-10">
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-black leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TRUST / SAFETY SECTION */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">Your Child's Safety is <br /><span className="text-secondary">Our Absolute Priority</span></h2>
                <p className="text-white/80 text-xl mb-12 leading-relaxed font-medium">
                  We maintain the highest standards of safety and professionalism to ensure a secure learning environment for every student.
                </p>
                
                <div className="space-y-8 mb-12">
                  {[
                    { icon: GraduationCap, title: 'Qualified Teachers', desc: 'All our tutors are fully qualified professionals with academic expertise.' },
                    { icon: ShieldCheck, title: 'DBS Checked', desc: 'Every staff member undergoes rigorous background checks for your peace of mind.' },
                    { icon: Users, title: 'Secure Environment', desc: 'Our centre features 24/7 monitoring and strict safety protocols.' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-6 group">
                      <div className="bg-white/10 p-4 rounded-2xl text-secondary group-hover:bg-secondary group-hover:text-white transition-all shadow-lg">
                        <item.icon size={28} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black mb-2 text-white">{item.title}</h4>
                        <p className="text-white/70 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Link to="/staff" className="inline-flex items-center text-secondary font-black hover:underline group text-lg">
                  Meet Our Entire Teaching Team <ArrowRight size={20} className="ml-2 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
            </div>
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-secondary/20 rounded-[4rem] blur-3xl opacity-30 animate-pulse"></div>
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
                  alt="Safe learning environment" 
                  className="relative z-10 rounded-[4rem] shadow-2xl border-8 border-white/10"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="flex text-accent-yellow">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
              </div>
              <span className="text-2xl font-black text-primary">Trustpilot</span>
            </div>
            <h2 className="text-4xl font-black mb-4">What Our Community Says</h2>
            <p className="text-black">Rated 5.0/5 based on 1000+ parent reviews.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div key={t.id} className="bg-primary/5 p-10 rounded-[2.5rem] border border-primary/10 relative">
                <div className="flex text-accent-yellow mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                </div>
                <p className="text-black italic mb-8 leading-relaxed text-lg">"{t.content}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center font-black text-xl">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{t.name}</h4>
                    <p className="text-black font-medium">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. REAL STUDENT STORIES */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Real Student Success Stories</h2>
            <p className="text-black">See the tangible impact of our tuition on real students.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Adam S.', subject: 'GCSE Maths', result: 'Grade 4 → Grade 9', desc: 'Adam struggled with confidence but achieved top marks after 6 months with us.' },
              { name: 'Sara K.', subject: '11 Plus', result: 'Pass (Grammar Entry)', desc: 'Sara secured her place at her first-choice grammar school with our specialized prep.' },
              { name: 'Zain M.', subject: 'KS2 English', result: 'Exceeding Expectations', desc: 'Zain went from falling behind to being top of his class in literacy.' }
            ].map((story, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-primary/10">
                <div className="bg-secondary/10 text-secondary px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6 inline-block">
                  Case Study
                </div>
                <h3 className="text-2xl font-bold mb-2">{story.name}</h3>
                <p className="text-primary font-bold mb-4">{story.subject}</p>
                <div className="bg-primary/5 p-6 rounded-2xl mb-6">
                  <p className="text-sm font-bold text-black uppercase mb-1">Improvement</p>
                  <p className="text-2xl font-black text-primary">{story.result}</p>
                </div>
                <p className="text-black leading-relaxed">{story.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. FINAL CTA */}
      <section className="py-24 px-4 bg-primary/5">
        <div className="max-w-7xl mx-auto bg-primary rounded-[4rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">
              Ready to See <br /> Real Results?
            </h2>
            <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto font-medium">
              Join Nottingham’s most trusted academy today. Limited spaces available for our premium tuition programs.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link to="/contact" className="btn-secondary bg-white text-primary hover:bg-primary/5 text-xl px-12 py-6">
                Contact Us
              </Link>
              <Link to="/registration" className="btn-primary text-xl px-12 py-6">
                Book Free Trial
              </Link>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white font-bold uppercase tracking-widest text-sm">
              <span className="flex items-center"><CheckCircle size={18} className="mr-2 text-secondary" /> Qualified Tutors</span>
              <span className="flex items-center"><CheckCircle size={18} className="mr-2 text-secondary" /> DBS Checked</span>
              <span className="flex items-center"><CheckCircle size={18} className="mr-2 text-secondary" /> Proven Success</span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
