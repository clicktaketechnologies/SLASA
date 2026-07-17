import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, GraduationCap } from 'lucide-react';
import SlasaLogo from './SlasaLogo';

const Footer = () => {
  return (
    <footer className="bg-neutral-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2">
              <SlasaLogo className="h-12 w-auto" />
              <span className="font-heading font-bold text-2xl tracking-tight">Slasa</span>
            </Link>
            <p className="text-white/80 leading-relaxed">
              Providing expert tuition and academic support for students in Nottingham. Empowering the next generation through quality education and modern teaching methods.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-white/10 p-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-lg">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li><Link to="/courses" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">Our Courses</Link></li>
              <li><Link to="/certifications" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">Certifications</Link></li>
              <li><Link to="/tuition" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">Tuition Methodology</Link></li>
              <li><Link to="/retakes" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">GCSE Retakes</Link></li>
              <li><Link to="/faq" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">FAQs</Link></li>
              <li><Link to="/registration" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">Enrollment</Link></li>
              <li><Link to="/careers" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">Careers</Link></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-8 relative inline-block">
              Popular Courses
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary-light rounded-full"></span>
            </h3>
            <ul className="space-y-4">
              <li><Link to="/courses/ks2" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">KS2 SATs Prep</Link></li>
              <li><Link to="/courses/sats" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">SATs Tuition</Link></li>
              <li><Link to="/courses/gcse" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">GCSE Coaching</Link></li>
              <li><Link to="/courses/11plus" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">11+ Entrance Exam</Link></li>
              <li><Link to="/courses/urdu" className="text-white/80 hover:text-white hover:translate-x-1 inline-block transition-all">Urdu Language</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-8 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-secondary rounded-full"></span>
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-4">
                <div className="bg-white/10 p-2 rounded-lg text-secondary">
                  <MapPin size={20} />
                </div>
                <span className="text-white/80 text-sm leading-relaxed pt-1">64a-66b Northgate New, Basford Nottingham NC7 7FY</span>
              </li>
              <li className="flex items-start space-x-4">
                <div className="bg-white/10 p-2 rounded-lg text-secondary">
                  <Phone size={20} />
                </div>
                <div className="flex flex-col space-y-1 pt-1">
                  <span className="text-white/80 text-sm">07968 046444</span>
                  <span className="text-white/80 text-sm">0115 916 8231</span>
                </div>
              </li>
              <li className="flex items-start space-x-4">
                <div className="bg-white/10 p-2 rounded-lg text-secondary">
                  <Mail size={20} />
                </div>
                <span className="text-white/80 text-sm pt-1">info@slasa.co.uk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/60 text-sm text-center md:text-left">
            <p>© {new Date().getFullYear()} Slasa Academy. All rights reserved.</p>
            <p className="mt-2">
              Powered by <a href="https://www.clicktaketech.com" target="_blank" rel="noopener noreferrer" className="text-secondary hover:text-white transition-colors font-medium">ClickTake Technologies</a>
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
