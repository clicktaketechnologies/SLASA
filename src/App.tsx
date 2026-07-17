import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Registration from './pages/Registration';
import About from './pages/About';
import Contact from './pages/Contact';
import Tuition from './pages/Tuition';
import Pricing from './pages/Pricing';
import Retakes from './pages/Retakes';
import Careers from './pages/Careers';
import FAQ from './pages/FAQ';
import Venue from './pages/Venue';
import Gallery from './pages/Gallery';
import StaffGallery from './pages/StaffGallery';
import News from './pages/News';
import ParentFeedback from './pages/ParentFeedback';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import CookiePolicy from './pages/CookiePolicy';
import Login from './pages/Login';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/Dashboard';
import AdminCMS from './admin/CMS';
import AdminLeads from './admin/Leads';
import AdminUsers from './admin/Users';
import AdminCourses from './admin/Courses';
import AdminSettings from './admin/Settings';
import TeacherPortal from './admin/TeacherPortal';
import StudentPortal from './admin/StudentPortal';
import ParentPortal from './admin/ParentPortal';
import { MessageCircle } from 'lucide-react';

// Admin Pages (Placeholders for now)
const AdminFeedback = () => <div className="p-10 bg-white rounded-[3rem] shadow-sm border border-neutral-100">Feedback Management Coming Soon</div>;

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:slug" element={<Courses />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tuition" element={<Tuition />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/retakes" element={<Retakes />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/venue" element={<Venue />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/staff" element={<StaffGallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/feedback" element={<ParentFeedback />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="cms" element={<AdminCMS />} />
            <Route path="leads" element={<AdminLeads />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="feedback" element={<AdminFeedback />} />
            <Route path="settings" element={<AdminSettings />} />
            
            {/* Teacher Routes */}
            <Route path="teacher/lessons" element={<TeacherPortal />} />
            <Route path="teacher/feedback" element={<div className="p-10 bg-white rounded-[3rem] shadow-sm border border-neutral-100">Teacher Feedback Management Coming Soon</div>} />
            <Route path="teacher/students" element={<div className="p-10 bg-white rounded-[3rem] shadow-sm border border-neutral-100">Teacher Student Management Coming Soon</div>} />

            {/* Student Routes */}
            <Route path="student/lessons" element={<StudentPortal />} />
            <Route path="student/progress" element={<div className="p-10 bg-white rounded-[3rem] shadow-sm border border-neutral-100">Student Progress Tracking Coming Soon</div>} />
            <Route path="student/feedback" element={<div className="p-10 bg-white rounded-[3rem] shadow-sm border border-neutral-100">Student Feedback View Coming Soon</div>} />

            {/* Parent Routes */}
            <Route path="parent/progress" element={<ParentPortal />} />
            <Route path="parent/feedback" element={<div className="p-10 bg-white rounded-[3rem] shadow-sm border border-neutral-100">Parent Teacher Feedback Coming Soon</div>} />
            <Route path="parent/updates" element={<div className="p-10 bg-white rounded-[3rem] shadow-sm border border-neutral-100">Parent Weekly Updates Coming Soon</div>} />
          </Route>
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}

      {/* WhatsApp Floating Button */}
      {!isAdminRoute && (
        <a 
          href="https://wa.me/441151234567" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-8 right-8 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center group"
          title="Chat with us on WhatsApp"
        >
          <MessageCircle size={32} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
            WhatsApp Us
          </span>
        </a>
      )}

      {/* Sticky Enroll Button for Mobile */}
      {!isAdminRoute && (
        <div className="md:hidden fixed bottom-0 left-0 w-full p-4 bg-white/80 backdrop-blur-md border-t border-slate-200 z-40">
          <Link to="/registration" className="btn-secondary w-full block text-center">
            Enroll Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
