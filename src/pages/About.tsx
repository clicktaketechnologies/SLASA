import React from 'react';
import { motion } from 'motion/react';
import { Target, Users, Award, BookOpen, CheckCircle, ArrowRight, GraduationCap, Camera, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const team = [
    { name: 'Dr. Sarah Ahmed', role: 'Head of Academy', bio: 'PhD in Education with 15+ years of experience in academic leadership.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
    { name: 'Mr. David Wilson', role: 'Lead Maths Tutor', bio: 'Specialist in GCSE and A-Level Mathematics with a focus on exam techniques.', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },
    { name: 'Ms. Fatima Khan', role: 'Urdu Language Head', bio: 'Native speaker and linguist dedicated to preserving cultural heritage through language.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' }
  ];

  const galleryItems = [
    { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800', title: 'Modern Classrooms', category: 'Facilities' },
    { url: 'https://images.unsplash.com/photo-1523050335392-9bf5674293ca?auto=format&fit=crop&q=80&w=800', title: 'Graduation Day', category: 'Student Life' },
    { url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800', title: 'Interactive Learning', category: 'Facilities' },
    { url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&q=80&w=800', title: 'Library Resources', category: 'Facilities' },
    { url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800', title: 'Group Collaboration', category: 'Student Life' },
    { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800', title: 'Focused Study', category: 'Student Life' },
  ];

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-primary-light to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Our Academy</h1>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Dedicated to academic excellence and student empowerment in Nottingham since 2014.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Empowering the Next Generation</h2>
              <p className="text-black text-lg mb-6 leading-relaxed">
                Slasa was founded with a simple mission: to provide high-quality, accessible tuition that helps every student reach their full potential.
              </p>
              <p className="text-black text-lg mb-10 leading-relaxed">
                Over the past decade, we have grown from a small tutoring group into a leading academic institution, helping hundreds of students achieve top grades in SATs, GCSEs, and entrance exams.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h4 className="text-3xl font-bold text-primary mb-1">10+</h4>
                  <p className="text-sm text-black font-bold uppercase tracking-wider">Years Experience</p>
                </div>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h4 className="text-3xl font-bold text-primary mb-1">500+</h4>
                  <p className="text-sm text-black font-bold uppercase tracking-wider">Students Taught</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1000" 
                alt="Academy life" 
                className="rounded-[3rem] shadow-2xl"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-6 -left-6 bg-secondary p-6 rounded-3xl shadow-xl text-white hidden md:block">
                <GraduationCap size={40} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-primary/10">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                <Target className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-6">Our Mission</h3>
              <p className="text-black text-lg leading-relaxed">
                To inspire a love for learning and provide the tools necessary for academic success through personalized, expert-led tuition in a supportive environment.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-primary/10">
              <div className="bg-secondary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-8">
                <Award className="text-secondary" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-6">Our Vision</h3>
              <p className="text-black text-lg leading-relaxed">
                To be Nottingham's most trusted academic partner, recognized for our commitment to student progress, cultural enrichment, and excellence in education through Slasa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Profiles */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Meet Our Leadership</h2>
            <p className="text-black">The experts behind our students' success.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {team.map((member, idx) => (
              <div key={idx} className="group">
                <div className="relative mb-6 overflow-hidden rounded-[2.5rem]">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full aspect-[4/5] object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <p className="text-white text-sm italic">"{member.bio}"</p>
                  </div>
                </div>
                <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                <p className="text-primary font-bold text-sm uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Gallery Preview */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/gplay.png')] opacity-[0.03] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center space-x-2 bg-primary/5 text-primary px-4 py-2 rounded-full mb-6 border border-primary/10"
              >
                <Camera size={16} className="text-secondary" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Academy Life</span>
              </motion.div>
              <h2 className="text-5xl md:text-6xl font-black text-primary mb-6 tracking-tight leading-tight">
                Inspiring <span className="text-secondary">Environments</span>
              </h2>
              <p className="text-primary/60 text-xl font-medium leading-relaxed">
                A curated glimpse into our modern learning facilities and the vibrant community of students at Slasa Academy.
              </p>
            </div>
            <Link to="/gallery" className="group flex items-center space-x-3 bg-primary text-white px-10 py-5 rounded-full shadow-2xl shadow-primary/20 hover:bg-primary/90 transition-all">
              <span className="font-black uppercase tracking-widest text-xs">Explore Full Gallery</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Feature Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="md:col-span-8 relative group overflow-hidden rounded-[3.5rem] shadow-2xl aspect-[16/10]"
            >
              <img 
                src={galleryItems[0].url} 
                alt={galleryItems[0].title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                referrerPolicy="no-referrer" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-12">
                <span className="text-accent-yellow text-xs font-black uppercase tracking-[0.3em] mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {galleryItems[0].category}
                </span>
                <h4 className="text-white text-4xl font-black translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                  {galleryItems[0].title}
                </h4>
              </div>
            </motion.div>

            {/* Side Column */}
            <div className="md:col-span-4 flex flex-col gap-6">
              {[galleryItems[1], galleryItems[2]].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="relative group overflow-hidden rounded-[2.5rem] shadow-xl flex-1 aspect-square md:aspect-auto"
                >
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    referrerPolicy="no-referrer" 
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-6 text-center">
                    <div>
                      <span className="text-accent-yellow text-[10px] font-black uppercase tracking-[0.2em] mb-2 block">
                        {item.category}
                      </span>
                      <h4 className="text-white text-xl font-black">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row */}
            {[galleryItems[3], galleryItems[4], galleryItems[5]].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.4 }}
                className="md:col-span-4 relative group overflow-hidden rounded-[2.5rem] shadow-lg aspect-[4/3]"
              >
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  referrerPolicy="no-referrer" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <h4 className="text-white font-black">{item.title}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">News & Events</h2>
            <p className="text-black">Stay updated with the latest happenings at Slasa.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { date: 'Oct 15, 2025', title: 'GCSE Revision Workshop', desc: 'Join our intensive weekend workshop focusing on exam board specific techniques.' },
              { date: 'Nov 02, 2025', title: '11+ Mock Exam Series', desc: 'Register for our upcoming mock exams to simulate the real test environment.' },
              { date: 'Dec 10, 2025', title: 'Urdu Cultural Day', desc: 'A celebration of language and culture featuring student performances and traditional food.' }
            ].map((event, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-secondary font-bold text-xs uppercase tracking-widest">{event.date}</span>
                <h4 className="text-xl font-bold mt-3 mb-4">{event.title}</h4>
                <p className="text-black text-sm mb-6">{event.desc}</p>
                <Link to="/news" className="text-primary font-bold text-sm flex items-center hover:underline">
                  Read More <ArrowRight className="ml-2" size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
