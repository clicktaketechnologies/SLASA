import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SlasaLogo from './SlasaLogo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { 
      name: 'Courses', 
      path: '/courses',
      dropdown: [
        { name: 'KS1', path: '/courses/ks1' },
        { name: 'KS2', path: '/courses/ks2' },
        { name: 'KS3', path: '/courses/ks3' },
        { name: 'GCSE', path: '/courses/gcse' },
        { name: '11 Plus Exam', path: '/courses/11plus' },
        { name: 'SATs Tuition', path: '/courses/sats' },
        { name: 'Urdu Language', path: '/courses/urdu' },
      ]
    },
    { 
      name: 'Registration', 
      path: '/registration',
      dropdown: [
        { name: 'Student Enrollment', path: '/registration?type=student' },
        { name: 'Teacher Application', path: '/registration?type=teacher' },
      ]
    },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Structured Tuition', path: '/tuition' },
    { name: 'Retake', path: '/retakes' },
    { name: 'Career', path: '/careers' },
    { 
      name: 'About', 
      path: '/about',
      dropdown: [
        { name: 'Our Story', path: '/about' },
        { name: 'Gallery', path: '/gallery' },
        { name: 'Teacher/Staff Gallery', path: '/staff' },
        { name: 'News & Events', path: '/news' },
        { name: 'Parent Feedback', path: '/feedback' },
        { name: 'FAQ', path: '/faq' },
      ]
    },
    { name: 'Contact', path: '/contact' },
  ];

  const isTransparent = false; // Always solid now for consistency

  return (
    <header className="fixed w-full z-50 transition-all duration-300">
      {/* Top Bar */}
      <div className={`hidden lg:block transition-all duration-300 bg-primary/95 text-white/80 py-2 border-b border-white/10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center gap-4 text-sm font-medium">
          <div className="flex items-center space-x-6">
            <a href="tel:01159168231" className="flex items-center hover:text-secondary transition-colors">
              <Phone size={14} className="mr-2 text-secondary" /> 0115 916 8231
            </a>
            <a href="mailto:info@slasa.co.uk" className="flex items-center hover:text-secondary transition-colors">
              <Mail size={14} className="mr-2 text-secondary" /> info@slasa.co.uk
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <span>⭐ Rated 5.0 by Parents</span>
            <span className="text-secondary">|</span>
            <span>📍 Nottingham, UK</span>
          </div>
        </div>
      </div>

      <nav className={`transition-all duration-300 bg-white shadow-lg py-2`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center gap-4">
            <Link to="/" className="flex items-center space-x-3 shrink-0">
              <SlasaLogo className="h-10 w-auto" />
              <span className={`font-heading font-bold text-xl tracking-tight text-primary hidden sm:block lg:hidden xl:block`}>
                Slasa
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center xl:space-x-6 lg:space-x-1.5">
              {navLinks.map((link) => (
                <div 
                  key={link.name} 
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(link.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    to={link.path}
                    className={`flex items-center font-bold xl:text-[13px] lg:text-[10px] uppercase tracking-wider transition-all hover:text-secondary py-4 whitespace-nowrap ${
                      location.pathname === link.path 
                        ? 'text-secondary' 
                        : 'text-black'
                    }`}
                  >
                    {link.name}
                    {link.dropdown && <ChevronDown size={10} className={`ml-0.5 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />}
                  </Link>

                  {link.dropdown && (
                    <AnimatePresence>
                      {activeDropdown === link.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute left-0 w-56 bg-white rounded-2xl shadow-xl border border-primary/10 py-4 z-50"
                        >
                          {link.dropdown.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.path}
                              className="block px-6 py-2.5 text-sm font-medium text-black/70 hover:text-primary hover:bg-primary/5 transition-colors"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
              <Link to="/registration" className="btn-secondary py-2.5 xl:px-6 lg:px-3 text-xs shadow-secondary/20 whitespace-nowrap">
                Enroll Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-primary p-2 hover:bg-primary/5 rounded-full transition-colors"
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 lg:hidden bg-white z-[60] flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-primary/10">
                <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
                  <SlasaLogo className="h-10 w-auto" />
                  <span className="font-heading font-bold text-xl text-primary">Slasa</span>
                </Link>
                <button onClick={() => setIsOpen(false)} className="p-2 text-primary/60 hover:bg-primary/5 rounded-full">
                  <X size={28} />
                </button>
              </div>
              
              <div className="flex-grow overflow-y-auto py-8 px-6 space-y-2">
                {navLinks.map((link) => (
                  <div key={link.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Link
                        to={link.path}
                        onClick={() => !link.dropdown && setIsOpen(false)}
                        className={`flex-grow px-4 py-3 text-lg font-bold rounded-2xl transition-all ${
                          location.pathname === link.path 
                            ? 'bg-primary/5 text-primary' 
                            : 'text-black hover:bg-primary/5'
                        }`}
                      >
                        {link.name}
                      </Link>
                      {link.dropdown && (
                        <button 
                          onClick={() => setActiveDropdown(activeDropdown === link.name ? null : link.name)}
                          className="p-3 text-primary/40"
                        >
                          <ChevronDown size={20} className={`transition-transform ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                    
                    {link.dropdown && activeDropdown === link.name && (
                      <div className="pl-6 space-y-1">
                        {link.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-base font-semibold text-black/60 hover:text-primary transition-colors"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="p-6 border-t border-primary/10 bg-primary/5">
                <Link
                  to="/registration"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center btn-primary py-4 text-lg mb-4"
                >
                  Enroll Now
                </Link>
                <div className="flex justify-center space-x-6 text-primary/40">
                  <a href="tel:01159168231"><Phone size={20} /></a>
                  <a href="mailto:info@slasa.co.uk"><Mail size={20} /></a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;

