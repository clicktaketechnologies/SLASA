import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, GraduationCap, Phone, Mail, Calendar, BookOpen, FileText, CheckCircle, Clock, Award, Upload, AlertCircle } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

const Registration = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const type = params.get('type');
    if (type === 'teacher') {
      setActiveTab('teacher');
    } else if (type === 'student') {
      setActiveTab('student');
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(e.target as HTMLFormElement);
    const data: any = {
      type: activeTab,
      createdAt: serverTimestamp(),
    };

    if (activeTab === 'student') {
      data.firstName = formData.get('firstName');
      data.middleName = formData.get('middleName');
      data.lastName = formData.get('lastName');
      data.dob = formData.get('dob');
      data.gender = formData.get('gender');
      data.address = formData.get('address');
      data.city = formData.get('city');
      data.state = formData.get('state');
      data.postalCode = formData.get('postalCode');
      data.country = formData.get('country');
      data.class = formData.get('class');
      data.email = formData.get('email');
      data.mobileNo = formData.get('mobileNo');
      data.landlineNo = formData.get('landlineNo');
      data.courses = formData.get('courses');
      data.additionalInfo = formData.get('additionalInfo');
    } else {
      data.fullName = formData.get('fullName');
      data.email = formData.get('email');
      data.subjects = formData.getAll('subjects');
      data.levels = formData.getAll('levels');
      data.additionalInfo = formData.get('additionalInfo');
      // CV upload would go here in a real app, for now we just mock the URL
      data.cvUrl = "mock-cv-url";
    }

    try {
      await addDoc(collection(db, 'registrations'), data);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error("Error submitting registration:", err);
      setError("Failed to submit registration. Please try again.");
      handleFirestoreError(err, OperationType.WRITE, 'registrations');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-40 pb-20 px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-xl p-12 text-center"
        >
          <div className="bg-secondary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle className="text-secondary" size={40} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Registration Successful!</h2>
          <p className="text-black text-lg mb-10">
            Thank you for registering with Slasa. Our team will review your application and contact you within 24-48 hours.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-primary"
          >
            Back to Registration
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-24 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight"
          >
            Join Our <span className="text-secondary">Academy</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're a student looking to excel or a teacher looking to inspire, we'd love to have you in our community.
          </motion.p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center mb-16">
          <div className="bg-primary/5 p-1.5 rounded-2xl flex shadow-inner">
            <button
              onClick={() => setActiveTab('student')}
              className={`px-10 py-4 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'student' ? 'bg-white text-primary shadow-md scale-105' : 'text-primary/50 hover:text-primary/80'
              }`}
            >
              Student Enrollment
            </button>
            <button
              onClick={() => setActiveTab('teacher')}
              className={`px-10 py-4 rounded-xl font-bold transition-all duration-300 ${
                activeTab === 'teacher' ? 'bg-white text-secondary shadow-md scale-105' : 'text-primary/50 hover:text-primary/80'
              }`}
            >
              Teacher Registration
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-8 bg-brand-red/10 text-brand-red p-4 rounded-2xl flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2.5rem] border border-primary/10 shadow-lg p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {activeTab === 'student' ? (
              <div className="space-y-8">
                <div className="border-b border-primary/10 pb-4">
                  <h2 className="text-2xl font-bold text-primary">Student Registration Form</h2>
                  <p className="text-black">Fill out the form carefully for registration</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">First-Name</label>
                    <input name="firstName" required type="text" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="First-Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Middle-Name</label>
                    <input name="middleName" type="text" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Middle-Name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Last-Name</label>
                    <input name="lastName" required type="text" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Last-Name" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Date-of-birth</label>
                    <input name="dob" required type="date" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80 block mb-2">Gender</label>
                    <div className="flex space-x-6 pt-2">
                      {['Male', 'Female', 'N/A'].map((g) => (
                        <label key={g} className="flex items-center space-x-2 cursor-pointer group">
                          <input type="radio" name="gender" value={g} className="w-5 h-5 text-primary focus:ring-primary border-primary/20" />
                          <span className="text-primary/70 group-hover:text-primary transition-colors font-medium">{g}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-primary/80">Address</label>
                  <div className="grid grid-cols-1 gap-4">
                    <input name="address" required type="text" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Street Address" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="city" required type="text" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="City" />
                    <input name="state" required type="text" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="State / Province" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="postalCode" required type="text" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Postal / Zip Code" />
                    <select name="country" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                      <option value="UK">United Kingdom</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Class</label>
                    <select name="class" required className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                      <option value="ks1">KS1</option>
                      <option value="ks2">KS2</option>
                      <option value="ks3">KS3</option>
                      <option value="gcse">GCSE</option>
                      <option value="11plus">11 Plus</option>
                      <option value="sats">SATs</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">E-mail</label>
                    <input name="email" required type="email" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="E-mail" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Mobile No</label>
                    <input name="mobileNo" required type="tel" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Mobile No" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Landline No</label>
                    <input name="landlineNo" type="tel" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Landline No" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/80">Courses</label>
                  <select name="courses" required className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all">
                    <option value="maths">Maths</option>
                    <option value="english">English</option>
                    <option value="science">Science</option>
                    <option value="urdu">Urdu</option>
                    <option value="sats">SATs</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/80">Additional Information</label>
                  <textarea name="additionalInfo" rows={4} className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all" placeholder="Additional Information"></textarea>
                </div>

                <div className="flex items-center space-x-3">
                  <input required type="checkbox" id="agree" className="w-5 h-5 text-primary focus:ring-primary border-primary/20 rounded" />
                  <label htmlFor="agree" className="text-black">I Agree To These <Link to="/faq" className="text-primary hover:underline font-bold">Policies</Link></label>
                </div>

                <div className="pt-6">
                  <button disabled={submitting} type="submit" className="btn-primary w-full py-5 text-lg disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Send'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="border-b border-primary/10 pb-4">
                  <h2 className="text-2xl font-bold text-primary">Teacher Job Application Form</h2>
                  <p className="text-black">Join our team of expert educators</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-bold text-primary/80">
                      <User size={16} className="mr-2 text-primary" /> Full Name
                    </label>
                    <input name="fullName" required type="text" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Enter full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-bold text-primary/80">
                      <Mail size={16} className="mr-2 text-secondary" /> Email Address
                    </label>
                    <input name="email" required type="email" className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-secondary transition-all" placeholder="Email address" />
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-primary/80 block">Subjects You Can Teach</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {['Verbal Reasoning', 'Non-Verbal Reasoning', 'Literacy and Numeracy'].map((subject, idx) => {
                      const colors = ['text-primary', 'text-secondary', 'text-brand-orange', 'text-brand-red', 'text-brand-yellow'];
                      const color = colors[idx % colors.length];
                      return (
                        <label key={subject} className="flex items-center space-x-3 p-4 rounded-xl border border-primary/10 bg-primary/5 cursor-pointer hover:border-primary transition-all group">
                          <input name="subjects" value={subject} type="checkbox" className={`w-5 h-5 ${color.replace('text-', '')} rounded border-primary/20 focus:ring-primary`} />
                          <span className={`text-sm font-medium text-primary/70 group-hover:${color}`}>{subject}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-primary/80 block">Levels *</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                    {['KS1', 'KS2', 'KS3', 'GCSE', 'A Level', '11 Plus', '13 Plus', 'Grammar School', 'Other'].map((level) => (
                      <label key={level} className="flex items-center space-x-2 p-3 rounded-lg border border-primary/10 bg-primary/5 cursor-pointer hover:bg-white hover:border-primary transition-all">
                        <input name="levels" value={level} type="checkbox" className="w-4 h-4 text-primary rounded border-primary/20 focus:ring-primary" />
                        <span className="text-xs font-bold text-primary/70">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-primary/80">Additional Information *</label>
                  <textarea name="additionalInfo" required rows={4} className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all" placeholder="Tell us more about your experience and teaching style..."></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Upload your CV here *</label>
                    <div className="border-2 border-dashed border-primary/10 rounded-3xl p-8 text-center hover:border-primary transition-all cursor-pointer bg-primary/5 group">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <Upload className="text-primary" size={20} />
                      </div>
                      <p className="text-sm font-bold text-primary/80 mb-1">Click or drag a file to this area to upload.</p>
                      <p className="text-xs text-primary/50">PDF, DOC, or DOCX (Max 5MB)</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-primary/80">Other Testimonials (e.g Certificates)</label>
                    <div className="border-2 border-dashed border-primary/10 rounded-3xl p-8 text-center hover:border-primary transition-all cursor-pointer bg-primary/5 group">
                      <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                        <Upload className="text-primary" size={20} />
                      </div>
                      <p className="text-sm font-bold text-primary/80 mb-1">Click or drag a file to this area to upload.</p>
                      <p className="text-xs text-primary/50">Images or PDF (Max 10MB)</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6">
                  <button disabled={submitting} type="submit" className="btn-primary w-full py-5 text-lg disabled:opacity-50">
                    {submitting ? 'Submitting...' : 'Submit CV'}
                  </button>
                  <p className="text-center text-black text-sm mt-6">
                    By submitting, you agree to our terms and privacy policy.
                  </p>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Registration;
