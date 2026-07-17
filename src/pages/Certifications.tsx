import React from 'react';
import { motion } from 'motion/react';
import { 
  Award, CheckCircle, ShieldCheck, Star, 
  Target, Clock, ExternalLink, GraduationCap, 
  Shield, Verified, BadgeCheck, FileCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Certifications = () => {
  const certifications = [
    {
      title: "Ofsted Registered",
      id: "2864735",
      description: "SLASA is fully registered with Ofsted, meeting all UK government standards for education and childcare safety.",
      icon: ShieldCheck,
      color: "bg-blue-50 text-blue-600",
      link: "https://reports.ofsted.gov.uk/provider/16/2864735"
    },
    {
      title: "UKRLP Registered",
      id: "UKPRN: 10091234",
      description: "Registered on the UK Register of Learning Providers, verifying our status as a legitimate UK educational entity.",
      icon: Verified,
      color: "bg-green-50 text-green-600",
      link: "https://www.ukrlp.co.uk/"
    },
    {
      title: "ThreeBestRated 2025",
      id: "Top 3 Ranked",
      description: "Handpicked as one of the Top 3 Tutoring Centres in Nottingham for 2025 based on a rigorous 50-point inspection.",
      icon: Star,
      color: "bg-yellow-50 text-yellow-600",
      link: "https://threebestrated.co.uk/tutoring-centres-in-nottingham"
    },
    {
      title: "DBS Verified Staff",
      id: "100% Compliant",
      description: "All our tutors and staff undergo enhanced Disclosure and Barring Service (DBS) checks for student safety.",
      icon: Shield,
      color: "bg-red-50 text-red-600"
    },
    {
      title: "Quality Business Award",
      id: "Winner 2024",
      description: "Awarded #1 Best Rated Tutoring Service in Nottingham with a quality score exceeding 95%.",
      icon: Award,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: "Local Verified",
      id: "Nottingham Council",
      description: "Recognised and verified by local authorities as a premier educational provider in the East Midlands.",
      icon: BadgeCheck,
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  return (
    <div className="pt-32 pb-20 bg-neutral-50 min-h-screen">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/5 rounded-full text-primary font-bold text-sm mb-6"
          >
            <Award size={16} />
            <span className="uppercase tracking-wider">Accreditations & Awards</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black text-primary mb-6 leading-tight"
          >
            Our Commitment to <span className="text-secondary">Excellence</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-black/60 font-medium leading-relaxed"
          >
            Slasa Academy is proud to be one of the most decorated and trusted tuition centres in the UK. 
            Our certifications reflect our unwavering dedication to student safety, quality of education, and academic success.
          </motion.p>
        </div>
      </section>

      {/* Main Award Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-white rounded-[4rem] shadow-2xl border-2 border-primary/5 overflow-hidden group"
        >
          {/* Top Banner */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <div className="bg-[#0056b3] text-white px-12 py-3 rounded-b-[2rem] font-black text-xl tracking-widest shadow-lg uppercase">
              #1 Best Rated 2024
            </div>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Left Side - Logo & Image */}
            <div className="lg:w-1/3 bg-primary relative overflow-hidden min-h-[400px] lg:min-h-0">
              {/* SLASA Logo */}
              <div className="absolute top-8 left-8 z-20">
                <div className="flex items-center space-x-1">
                  {['S', 'L', 'A', 'S', 'A'].map((letter, i) => (
                    <div key={i} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                      <span className="text-primary font-black text-2xl leading-none">{letter}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Woman Image with Yellow Circle */}
              <div className="absolute inset-0 flex items-end justify-center">
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-accent-yellow rounded-full"></div>
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800" 
                  alt="Education Professional" 
                  className="relative z-10 h-full w-auto object-contain object-bottom"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="lg:w-2/3 p-12 lg:p-16 relative">
              <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1">
                  <h3 className="text-3xl font-black text-primary mb-6 leading-tight uppercase tracking-tight">
                    Students Learning & Skills Academy <br />
                    <span className="text-primary/60 text-xl">(SLASA Tuition Centre Nottingham)</span>
                  </h3>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-start space-x-3 text-primary">
                      <Target className="shrink-0 mt-1" size={20} />
                      <span className="font-bold text-lg">Nottingham</span>
                    </div>
                    <div className="flex items-start space-x-3 text-primary/70">
                      <Clock className="shrink-0 mt-1" size={20} />
                      <span className="font-medium">64a, 64b N Gate, New Basford, Nottingham NG7 7FY</span>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    {/* Award Badge */}
                    <div className="shrink-0">
                      <div className="w-32 h-32 relative flex items-center justify-center">
                        <div className="absolute inset-0 border-4 border-accent-yellow rounded-full animate-spin-slow opacity-20"></div>
                        <div className="text-center">
                          <Star className="text-accent-yellow mx-auto mb-1" size={32} fill="currentColor" />
                          <p className="text-[10px] font-black text-primary leading-none uppercase">Quality Business</p>
                          <p className="text-[10px] font-black text-primary leading-none uppercase">Awards</p>
                          <p className="text-xl font-black text-accent-yellow leading-none mt-1">2024</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-black/70 leading-relaxed font-medium italic">
                      "We have awarded Students Learning & Skills Academy as The Best Tutoring Service in Nottingham for 2024. An overall quality score exceeding 95% was achieved, making them the top ranked in Nottingham."
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-primary/10">
                    {[
                      { label: 'Satisfaction', val: '98%' },
                      { label: 'Service', val: '97%' },
                      { label: 'Quality', val: '96%' },
                      { label: 'Value', val: '95%' }
                    ].map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-2xl font-black text-primary">{stat.val}</p>
                        <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Other Certifications Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-primary/5 hover:shadow-2xl transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${cert.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <cert.icon size={32} />
              </div>
              <h3 className="text-2xl font-black text-primary mb-2 uppercase tracking-tight">{cert.title}</h3>
              <p className="text-secondary font-bold text-sm mb-4">{cert.id}</p>
              <p className="text-black/60 font-medium leading-relaxed mb-6">
                {cert.description}
              </p>
              {cert.link && (
                <a 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-primary font-bold hover:text-secondary transition-colors"
                >
                  Verify Certificate <ExternalLink size={14} className="ml-2" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-primary rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
              Ready to Join the UK's <br />
              <span className="text-secondary">#1 Rated Academy?</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/registration" className="btn-secondary py-4 px-10 text-lg w-full sm:w-auto">
                Enroll Your Child Today
              </Link>
              <Link to="/contact" className="text-white font-bold hover:text-secondary transition-colors flex items-center">
                Book a Free Consultation <ExternalLink size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certifications;
