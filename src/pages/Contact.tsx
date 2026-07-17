import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram, Linkedin, Send, Award } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-primary-light to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us via phone, email, or visit our Nottingham campus.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Phone className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Call Us</h3>
              <p className="text-black mb-4">Mon-Fri from 9am to 8pm.</p>
              <p className="text-xl font-bold text-primary">0115 916 8231</p>
              <p className="text-lg font-bold text-primary">07968 046444</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <Mail className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Email Us</h3>
              <p className="text-black mb-4">Our team is here to help.</p>
              <p className="text-xl font-bold text-primary">info@slasa.co.uk</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-primary/10 shadow-sm">
              <div className="bg-primary/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="text-primary" size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2">Visit Us</h3>
              <p className="text-black mb-4">Visit our Nottingham campus.</p>
              <p className="text-lg font-bold text-primary leading-tight">64a-66b Northgate New, Basford Nottingham NC7 7FY</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[2.5rem] border border-primary/10 shadow-xl p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-8">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Full Name</label>
                    <input type="text" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Your Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Email Address</label>
                    <input type="email" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Email Address" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Phone Number</label>
                    <input type="tel" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Phone Number" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Subject</label>
                    <select className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all">
                      <option>General Inquiry</option>
                      <option>Course Information</option>
                      <option>Enrollment Help</option>
                      <option>Career Opportunity</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/80">Your Message</label>
                  <textarea rows={6} className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="btn-primary w-full py-5 text-lg flex items-center justify-center">
                  Send Message <Send className="ml-2" size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Find Us in Nottingham</h2>
            <p className="text-black">Conveniently located in the city center.</p>
          </div>
          <div className="bg-primary/10 rounded-[3rem] h-[500px] overflow-hidden relative shadow-inner">
            {/* Placeholder for Google Map */}
            <div className="absolute inset-0 flex items-center justify-center flex-col text-primary/40 p-8 text-center">
              <MapPin size={64} className="mb-4 opacity-20" />
              <p className="text-xl font-bold mb-2">Interactive Map Integration</p>
              <p className="max-w-md">In a production environment, an interactive Google Map would be embedded here showing our Nottingham location.</p>
            </div>
            {/* Simulated map overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="bg-primary text-white px-4 py-2 rounded-lg shadow-xl font-bold text-sm whitespace-nowrap mb-2">
                  Slasa
                </div>
                <div className="w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Trust */}
      <section className="py-20 bg-accent-yellow/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-8 mb-16">
            <div className="flex items-center space-x-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-accent-yellow/20">
              <div className="w-10 h-10 bg-accent-yellow rounded-lg flex items-center justify-center text-primary font-black text-[10px]">OFSTED</div>
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Gold Standard Safety</span>
            </div>
            <div className="flex items-center space-x-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-accent-yellow/20">
              <Award className="text-accent-yellow" size={24} />
              <span className="text-[10px] font-black uppercase tracking-widest text-primary">Highfield Approved</span>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-10">Follow Our Community</h2>
          <div className="flex justify-center space-x-6">
            <a href="#" className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md hover:text-primary transition-all">
              <Facebook size={32} />
            </a>
            <a href="#" className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md hover:text-primary transition-all">
              <Twitter size={32} />
            </a>
            <a href="#" className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md hover:text-primary transition-all">
              <Instagram size={32} />
            </a>
            <a href="#" className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md hover:text-primary transition-all">
              <Linkedin size={32} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
