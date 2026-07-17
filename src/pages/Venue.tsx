import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Users, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Venue = () => {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Class & Venue</h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Discover our modern learning facilities in the heart of Nottingham.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Learning Environment</h2>
            <p className="text-primary/70 text-lg mb-8 leading-relaxed">
              At Slasa, we believe that the environment plays a crucial role in a student's ability to learn. Our venue is designed to be bright, quiet, and inspiring.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start space-x-4">
                <div className="bg-primary/10 p-3 rounded-xl">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Central Location</h4>
                  <p className="text-primary/60">64a-66b Northgate New, Basford Nottingham NC7 7FY. Easily accessible via public transport.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-secondary/10 p-3 rounded-xl">
                  <Shield className="text-secondary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Safe & Secure</h4>
                  <p className="text-primary/60">Enhanced security measures, CCTV, and supervised entry/exit for all students.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-accent-purple/10 p-3 rounded-xl">
                  <Users className="text-accent-purple" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Modern Classrooms</h4>
                  <p className="text-primary/60">Equipped with the latest educational tools and comfortable seating.</p>
                </div>
              </div>
            </div>

            <Link to="/contact" className="btn-primary inline-flex items-center">
              Get Directions <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800" 
              alt="Classroom" 
              className="rounded-3xl w-full h-64 object-cover shadow-lg"
              referrerPolicy="no-referrer"
            />
            <img 
              src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=800" 
              alt="Library" 
              className="rounded-3xl w-full h-64 object-cover shadow-lg mt-8"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <section className="py-20 bg-primary/5 rounded-[3rem] px-8 md:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Class Timings</h2>
            <p className="text-primary/70">Flexible sessions to accommodate busy family schedules.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/10 hover:border-secondary transition-colors">
              <div className="bg-secondary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-secondary" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Weekday Afternoons</h3>
              <p className="text-primary/60 mb-2">Monday - Friday</p>
              <p className="text-secondary font-bold">4:00 PM - 6:00 PM</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/10 hover:border-accent-green transition-colors">
              <div className="bg-accent-green/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-accent-green" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Weekday Evenings</h3>
              <p className="text-primary/60 mb-2">Monday - Friday</p>
              <p className="text-accent-green font-bold">6:00 PM - 8:00 PM</p>
            </div>
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-primary/10 hover:border-accent-purple transition-colors">
              <div className="bg-accent-purple/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-accent-purple" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Weekend Sessions</h3>
              <p className="text-primary/60 mb-2">Saturday - Sunday</p>
              <p className="text-accent-purple font-bold">10:00 AM - 4:00 PM</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Venue;
