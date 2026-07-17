import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle, Star, ShieldCheck, Clock, 
  CreditCard, Zap, HelpCircle, ArrowRight, 
  Users, Target, Award, Sparkles, ChevronRight,
  Minus, Plus, Info, LayoutGrid, List, Quote, GraduationCap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { TESTIMONIALS } from '../constants';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<'centre' | 'online'>('centre');

  const pricingPlans = {
    centre: [
      {
        id: '1hr-centre',
        title: '1 Hour A Week',
        price: '85',
        desc: 'Classes set in ability',
        features: ['Weekly Feedback', 'Following school syllabus', '10% Sibling Discount'],
        cta: 'Book Assessment',
        color: 'bg-primary/5 border-primary/10',
        iconColor: 'text-primary'
      },
      {
        id: '2hr-centre',
        title: '2 Hours A Week',
        price: '155',
        desc: 'Classes set in ability',
        features: ['Weekly Feedback', 'Following school syllabus', '10% Sibling Discount'],
        cta: 'Book Assessment',
        color: 'bg-primary/5 border-primary/10',
        iconColor: 'text-secondary',
        highlight: true
      },
      {
        id: '3hr-centre',
        title: '3 Hours A Week',
        price: '200',
        desc: 'Classes set in ability',
        features: ['Weekly Feedback', 'Following school syllabus', '10% Sibling Discount'],
        cta: 'Book Assessment',
        color: 'bg-accent-yellow/5 border-accent-yellow/10',
        iconColor: 'text-accent-yellow'
      },
      {
        id: '4hr-centre',
        title: '4 Hours A Week',
        price: '250',
        desc: 'Classes set in ability',
        features: ['Weekly Feedback', 'Following school syllabus', '10% Sibling Discount'],
        cta: 'Book Assessment',
        color: 'bg-accent-green/5 border-accent-green/10',
        iconColor: 'text-secondary'
      }
    ],
    online: [
      {
        id: '1hr-online',
        title: '1 Hour A Week',
        price: '120',
        desc: '£28 per hour (One to One)',
        features: ['Weekly Feedback', 'Following school syllabus', 'Dedicated Tutor'],
        cta: 'Book Online Trial',
        color: 'bg-primary/5 border-primary/10',
        iconColor: 'text-primary'
      },
      {
        id: '2hr-online',
        title: '2 Hours A Week',
        price: '220',
        desc: '£25 per hour (One to One)',
        features: ['Weekly Feedback', 'Following school syllabus', 'Dedicated Tutor'],
        cta: 'Book Online Trial',
        color: 'bg-primary/5 border-primary/10',
        iconColor: 'text-secondary',
        highlight: true
      },
      {
        id: '3hr-online',
        title: '3 Hours A Week',
        price: '305',
        desc: '£23 per hour (One to One)',
        features: ['Weekly Feedback', 'Following school syllabus', 'Dedicated Tutor'],
        cta: 'Book Online Trial',
        color: 'bg-accent-yellow/5 border-accent-yellow/10',
        iconColor: 'text-accent-yellow'
      },
      {
        id: '4hr-online',
        title: '4 Hours A Week',
        price: '390',
        desc: '£22 per hour (One to One)',
        features: ['Weekly Feedback', 'Following school syllabus', 'Dedicated Tutor'],
        cta: 'Book Online Trial',
        color: 'bg-accent-green/5 border-accent-green/10',
        iconColor: 'text-secondary'
      }
    ]
  };

  const highfieldQualifications = [
    "Highfield Entry Level Award in Fundamental British Values (Entry 3) (RQF)",
    "Highfield Functional Skills Qualification in English at Entry Level 1",
    "Highfield Functional Skills Qualification in English at Entry Level 2",
    "Highfield Functional Skills Qualification in English at Entry Level 3",
    "Highfield Functional Skills Qualification in English at Level 1",
    "Highfield Functional Skills Qualification in English at Level 2"
  ];

  return (
    <div className="pt-20 bg-white">
      {/* 1. HERO SECTION (TOP) */}
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
            Flexible Tuition Plans for <span className="text-secondary">Every Student</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-xl md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-medium"
          >
            Choose the perfect plan for KS1 to GCSE, 11+ & Urdu courses.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link to="/registration" className="btn-secondary px-12 py-6 text-xl shadow-2xl shadow-secondary/30">
              Book Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. IMAGE / INTRO SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[3.5rem] overflow-hidden shadow-2xl aspect-[21/9] mb-16">
            <img 
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1920" 
              alt="Classroom Environment" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-12">
              <p className="text-white text-2xl font-black tracking-tight">Inspiring learning environments in Nottingham</p>
            </div>
          </div>
          
          <div className="bg-primary/5 p-8 rounded-[2.5rem] border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Info size={24} />
              </div>
              <span className="font-black text-primary uppercase tracking-tight">Jump to:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {['Plans', 'What\'s Included', 'Financial Support'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="px-8 py-3 bg-white border border-primary/10 rounded-full text-sm font-bold text-primary/70 hover:border-primary hover:text-primary transition-all shadow-sm"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. “YOU’RE IN CONTROL” (TRUST SECTION) */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-primary mb-4 tracking-tight">You're in Control</h2>
            <p className="text-primary/60 font-medium">Building trust through transparency and flexibility.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Star, title: 'Free trial session', desc: 'Experience our tuition before you commit.' },
              { icon: Clock, title: 'Cancel anytime', desc: 'No long-term contracts or hidden fees.' },
              { icon: CreditCard, title: 'No joining fee', desc: 'Start your journey without upfront costs.' },
              { icon: LayoutGrid, title: 'Flexible plans', desc: 'Switch between plans as your needs change.' }
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-primary/10 text-center group hover:shadow-xl transition-all">
                <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform">
                  <item.icon size={32} />
                </div>
                <h4 className="text-xl font-black text-primary mb-4 tracking-tight">{item.title}</h4>
                <p className="text-primary/60 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRICING CARDS (MAIN SECTION) */}
      <section className="py-24 bg-white" id="plans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-primary mb-8 tracking-tight">Our Tuition Plans</h2>
            
            {/* Tabs */}
            <div className="inline-flex bg-primary/10 p-2 rounded-[2rem] mb-12">
              <button 
                onClick={() => setBillingCycle('centre')}
                className={`px-10 py-4 rounded-full text-sm font-black transition-all ${billingCycle === 'centre' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-primary/60 hover:text-primary/80'}`}
              >
                Centre-Based
              </button>
              <button 
                onClick={() => setBillingCycle('online')}
                className={`px-10 py-4 rounded-full text-sm font-black transition-all ${billingCycle === 'online' ? 'bg-secondary text-white shadow-xl shadow-secondary/20' : 'text-primary/60 hover:text-primary/80'}`}
              >
                One to One Online
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans[billingCycle].map((plan) => (
              <div key={plan.id} className={`rounded-[3rem] border p-10 flex flex-col h-full transition-all hover:shadow-2xl ${plan.color} ${plan.highlight ? 'ring-4 ring-primary/20 border-primary' : ''}`}>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-black text-primary tracking-tight">{plan.title}</h3>
                    <div className="bg-white p-2 rounded-lg shadow-sm">
                      <Zap className={plan.iconColor} size={20} />
                    </div>
                  </div>
                  <p className="text-primary/60 text-sm font-medium leading-relaxed mb-6">{plan.desc}</p>
                  
                  <div className="flex items-baseline space-x-1 mb-6">
                    <span className="text-5xl font-black text-primary">£{plan.price}</span>
                    <span className="text-primary/40 font-bold text-lg">/month</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center space-x-3 text-primary/70">
                      <CheckCircle size={18} className="text-secondary shrink-0" />
                      <span className="text-sm font-bold">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to="/registration" className={`w-full py-5 rounded-2xl font-black text-center transition-all ${billingCycle === 'centre' ? 'bg-primary text-white hover:opacity-90' : 'bg-secondary text-white hover:opacity-90'} shadow-xl shadow-black/5`}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
          {billingCycle === 'centre' && (
            <p className="text-center mt-12 text-primary/60 font-medium italic">
              Note: Prices can vary depending on a location/branch.
            </p>
          )}
        </div>
      </section>

      {/* Highfield Qualifications Section */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 rounded-[3.5rem] border border-primary/10 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/3">
                <div className="bg-primary/10 p-6 rounded-3xl inline-block mb-6">
                  <Award className="text-primary" size={48} />
                </div>
                <h2 className="text-3xl font-black text-primary mb-4 tracking-tight">Highfield Approved Training Centre</h2>
                <p className="text-primary/60 font-medium leading-relaxed">
                  SLASA is an approved centre of Highfield Qualifications for delivering regulated qualifications.
                </p>
              </div>
              <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {highfieldQualifications.map((qual, i) => (
                  <div key={i} className="flex items-start space-x-4 p-4 bg-primary/5 rounded-2xl border border-primary/5">
                    <CheckCircle className="text-secondary shrink-0 mt-1" size={18} />
                    <span className="text-sm font-bold text-primary/80">{qual}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHAT’S INCLUDED (VALUE SECTION) */}
      <section className="py-24 bg-primary text-white overflow-hidden relative" id="whats-included">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-secondary px-4 py-2 rounded-full mb-8">
                <Sparkles className="text-white" size={16} />
                <span className="text-xs font-black uppercase tracking-widest text-white">Maximum Value</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight">What's Included in <span className="text-secondary">Every Plan</span></h2>
              <p className="text-white/60 text-lg mb-12 leading-relaxed font-medium">
                We provide a comprehensive learning ecosystem that goes far beyond just weekly sessions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {[
                  { title: 'Unlimited Practice', desc: 'Access to thousands of practice questions and materials.' },
                  { title: 'Progress Reports', desc: 'Detailed monthly analysis of student performance.' },
                  { title: 'Parent Feedback', desc: 'Regular consultations to keep you informed.' },
                  { title: 'Homework Support', desc: 'Guidance on school assignments and extra work.' },
                  { title: 'Exam Strategies', desc: 'Proven techniques to master UK exams.' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start space-x-4">
                    <div className="bg-white/10 p-2 rounded-lg mt-1">
                      <CheckCircle className="text-secondary" size={20} />
                    </div>
                    <div>
                      <h4 className="font-black text-white uppercase tracking-tight text-sm mb-1">{item.title}</h4>
                      <p className="text-white/40 text-xs font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-10 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="relative bg-white/5 backdrop-blur-xl p-12 rounded-[4rem] border border-white/10 shadow-2xl">
                <div className="text-center">
                  <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-secondary/30">
                    <GraduationCap className="text-white" size={40} />
                  </div>
                  <h3 className="text-2xl font-black mb-4">Academic Excellence</h3>
                  <p className="text-white/60 font-medium">Proven results for every student</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FLEXIBLE PLAN EXPLAINER */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black text-primary mb-8 tracking-tight">Choose sessions per week based on your child’s needs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-10 bg-primary/5 rounded-[3rem] border border-primary/10">
              <div className="text-4xl font-black text-primary mb-4">1 Session</div>
              <p className="text-primary/60 font-bold uppercase tracking-widest text-xs mb-4">Basic Plan</p>
              <p className="text-primary/70 font-medium leading-relaxed">Perfect for maintaining steady progress and reinforcing school learning.</p>
            </div>
            <div className="p-10 bg-primary text-white rounded-[3rem] shadow-2xl shadow-primary/20">
              <div className="text-4xl font-black mb-4">2 Sessions</div>
              <p className="text-white/80 font-bold uppercase tracking-widest text-xs mb-4">Faster Progress</p>
              <p className="text-white/70 font-medium leading-relaxed">Ideal for intensive exam preparation and rapid improvement in weak areas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINANCIAL SUPPORT SECTION */}
      <section className="py-24 bg-primary/5" id="financial-support">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-sm border border-primary/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl font-black text-primary mb-8 tracking-tight">Financial Support & Discounts</h2>
                <p className="text-primary/70 text-lg mb-10 leading-relaxed font-medium">
                  We are committed to making quality tuition affordable for all families in Nottingham.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Sibling Discount', desc: 'Save 10% on fees for each additional child enrolled.' },
                    { title: 'Multi-Course Offer', desc: 'Special rates when you enroll in 3 or more subjects.' },
                    { title: 'Flexible Payments', desc: 'Monthly membership model with no long-term contracts.' },
                    { title: 'Free Trial Available', desc: 'Start with a zero-cost assessment and trial session.' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start space-x-4">
                      <div className="bg-accent-yellow/10 p-2 rounded-lg mt-1">
                        <Award className="text-accent-yellow" size={20} />
                      </div>
                      <div>
                        <h4 className="font-black text-primary uppercase tracking-tight text-sm mb-1">{item.title}</h4>
                        <p className="text-primary/60 text-sm font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary p-12 rounded-[3rem] text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <h3 className="text-2xl font-black mb-6 relative z-10">Special Offers</h3>
                <p className="text-white/60 mb-8 relative z-10">Contact us to find out about our latest seasonal promotions and community discounts.</p>
                <Link to="/contact" className="btn-secondary w-full py-5 text-center block relative z-10">
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS (TRUSTPILOT STYLE) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-primary mb-6 tracking-tight">Trusted by Parents</h2>
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
            {TESTIMONIALS.slice(0, 3).map((t) => (
              <div key={t.id} className="bg-primary/5 p-10 rounded-[3rem] border border-primary/10 relative group hover:shadow-xl transition-all">
                <Quote className="absolute top-8 right-8 text-primary/10 group-hover:text-primary/20 transition-colors" size={64} />
                <div className="flex items-center space-x-1 mb-6">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={16} fill="#FFD700" className="text-accent-yellow" />)}
                </div>
                <p className="text-primary/70 text-lg mb-8 leading-relaxed font-medium relative z-10">"{t.content}"</p>
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

      {/* 9. FAQ SECTION */}
      <section className="py-24 bg-primary/5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-primary mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-primary/60 font-medium">Everything you need to know about our pricing and plans.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: 'When do I pay?', a: 'Fees are collected monthly in advance via secure direct debit or card payment.' },
              { q: 'Is there a contract?', a: 'No, we operate on a flexible monthly membership basis. You can cancel at any time with 30 days notice.' },
              { q: 'Can I cancel anytime?', a: 'Yes, we believe in our quality and don\'t need to lock you into long-term contracts.' },
              { q: 'What\'s included in the price?', a: 'The price includes weekly sessions, all learning materials, and regular progress reports.' },
              { q: 'Do you offer sibling discounts?', a: 'Yes, we offer a 10% discount for each additional child from the same family.' }
            ].map((faq, i) => (
              <details key={i} className="group bg-white rounded-2xl border border-primary/10 overflow-hidden transition-all">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-black text-primary list-none">
                  {faq.q}
                  <ChevronRight className="group-open:rotate-90 transition-transform text-primary/40" size={20} />
                </summary>
                <div className="px-6 pb-6 text-primary/60 font-medium leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 10. TRUST & ACCREDITATIONS */}
      <section className="py-24 bg-white border-y border-primary/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/gplay.png')]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-primary/5 text-primary px-4 py-2 rounded-full mb-4 border border-primary/10"
          >
            <ShieldCheck size={16} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified & Accredited</span>
          </motion.div>
          <h3 className="text-4xl md:text-5xl font-black text-primary mb-4 tracking-tight">The Gold Standard of Trust</h3>
          <p className="text-primary/60 font-medium text-lg max-w-2xl mx-auto">Your child's safety and education are our absolute top priorities at Slasa Academy.</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {[
              { 
                title: "Top 3 Ranked UK", 
                subtitle: "Tuition Excellence 2026", 
                icon: Star, 
                text: "TOP 3 UK",
                color: "text-accent-yellow"
              },
              { 
                title: "Best Rated Academy", 
                subtitle: "Verified by Parents", 
                icon: Award, 
                text: "BEST RANK",
                color: "text-secondary"
              },
              { 
                title: "UKRLP Registered", 
                subtitle: "Provider: 10094251", 
                icon: GraduationCap, 
                text: "UKRLP",
                color: "text-primary"
              },
              { 
                title: "DBS Verified", 
                subtitle: "Safeguarding Gold", 
                icon: ShieldCheck, 
                text: "DBS SAFE",
                color: "text-brand-red"
              }
            ].map((badge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-[3rem] border border-primary/5 shadow-sm hover:shadow-2xl transition-all text-center group"
              >
                <div className="w-24 h-24 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-primary transition-all duration-500 relative overflow-hidden shadow-inner">
                  <div className="flex flex-col items-center justify-center">
                    <badge.icon size={32} className={`${badge.color} group-hover:text-white mb-1 transition-colors`} />
                    <span className="text-[10px] font-black text-primary group-hover:text-white uppercase tracking-tighter transition-colors">{badge.text}</span>
                  </div>
                </div>
                <h4 className="text-lg font-black text-primary mb-1 tracking-tight">{badge.title}</h4>
                <p className="text-[10px] font-bold text-black/30 uppercase tracking-[0.2em]">{badge.subtitle}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-8 items-center">
            <motion.a 
              href="https://reports.ofsted.gov.uk/provider/16/2864735" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ y: -5 }}
              className="flex items-center space-x-6 bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-accent-yellow/20 transition-all group w-full md:w-auto"
            >
              <div className="w-20 h-20 bg-accent-yellow rounded-2xl flex items-center justify-center text-primary font-black text-lg shadow-lg group-hover:bg-primary group-hover:text-white transition-colors">
                OFSTED
              </div>
              <div>
                <span className="block font-black text-accent-yellow uppercase tracking-widest text-[10px] mb-1">Gold Standard Safety</span>
                <span className="block text-primary text-xl font-black">URN: 2864735</span>
              </div>
            </motion.a>

            <motion.div 
              whileHover={{ y: -5 }}
              className="flex items-center space-x-6 bg-white p-8 rounded-[2.5rem] shadow-xl border-2 border-accent-yellow/20 transition-all group w-full md:w-auto"
            >
              <div className="w-20 h-20 bg-accent-yellow rounded-2xl flex items-center justify-center text-primary shadow-lg group-hover:bg-primary group-hover:text-white transition-colors">
                <Award size={40} />
              </div>
              <div>
                <span className="block font-black text-accent-yellow uppercase tracking-widest text-[10px] mb-1">Highfield Approved</span>
                <span className="block text-primary text-xl font-black">Training Centre</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 11. FINAL CTA SECTION */}
      <section className="py-32 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-6xl font-black text-primary mb-8 tracking-tight">
            Ready to <span className="text-primary">Start?</span>
          </h2>
          <p className="text-primary/60 text-xl mb-12 font-medium leading-relaxed">
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
        </div>
      </section>
    </div>
  );
};

export default Pricing;
