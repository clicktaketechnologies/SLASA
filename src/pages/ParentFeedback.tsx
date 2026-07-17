import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, User, GraduationCap, Phone, Mail, Send, CheckCircle, AlertCircle, Quote } from 'lucide-react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

interface Feedback {
  id: string;
  parentName: string;
  studentName: string;
  contactNo: string;
  email: string;
  comments: string;
  createdAt: Timestamp;
}

const ParentFeedback = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    contactNo: '',
    email: '',
    comments: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const feedbackData: Feedback[] = [];
      snapshot.forEach((doc) => {
        feedbackData.push({ id: doc.id, ...doc.data() } as Feedback);
      });
      setFeedbacks(feedbackData);
      setLoading(false);
    }, (err) => {
      console.error("Error fetching feedback:", err);
      setError("Failed to load feedback. Please try again later.");
      setLoading(false);
      handleFirestoreError(err, OperationType.LIST, 'feedbacks');
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, 'feedbacks'), {
        ...formData,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      setFormData({
        parentName: '',
        studentName: '',
        contactNo: '',
        email: '',
        comments: ''
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      console.error("Error submitting feedback:", err);
      setError("Failed to submit feedback. Please check your information and try again.");
      handleFirestoreError(err, OperationType.WRITE, 'feedbacks');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <section className="bg-gradient-to-br from-primary via-brand-orange to-secondary text-white py-20 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-red rounded-full blur-[120px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow rounded-full blur-[150px] opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Parent Feedback</h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Your feedback helps us grow. Share your experience with Slasa Academy.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-[2.5rem] border border-primary/10 shadow-xl p-8 md:p-12 h-fit sticky top-32"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary">Share Your Feedback</h2>
              <p className="text-primary/50">We value your thoughts and suggestions.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-primary/70">
                    <User size={16} className="mr-2 text-primary" /> Parent Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Parent Name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-primary/70">
                    <GraduationCap size={16} className="mr-2 text-secondary" /> Student Name
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.studentName}
                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-secondary transition-all"
                    placeholder="Student Name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-primary/70">
                    <Phone size={16} className="mr-2 text-primary" /> Contact #
                  </label>
                  <input
                    required
                    type="tel"
                    value={formData.contactNo}
                    onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Parent contact no"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-bold text-primary/70">
                    <Mail size={16} className="mr-2 text-brand-orange" /> Email
                  </label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-brand-orange transition-all"
                    placeholder="Email"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center text-sm font-bold text-primary/70">
                  <MessageSquare size={16} className="mr-2 text-primary" /> Comments
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 outline-none focus:ring-2 focus:ring-primary transition-all"
                  placeholder="Type your Comments here..."
                ></textarea>
              </div>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-secondary/10 text-secondary p-4 rounded-xl flex items-center"
                  >
                    <CheckCircle size={20} className="mr-2" />
                    Feedback submitted successfully!
                  </motion.div>
                )}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-brand-red/10 text-brand-red p-4 rounded-xl flex items-center"
                  >
                    <AlertCircle size={20} className="mr-2" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full py-5 text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {submitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Public Feedback Wall */}
          <div className="space-y-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary">Public Feedback Wall</h2>
              <p className="text-primary/50">See what other parents are saying about us.</p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : feedbacks.length === 0 ? (
              <div className="bg-primary/5 rounded-3xl p-12 text-center border border-dashed border-primary/20">
                <MessageSquare size={48} className="mx-auto text-primary/20 mb-4" />
                <p className="text-primary/50 font-medium">No feedback yet. Be the first to share!</p>
              </div>
            ) : (
              <div className="space-y-6">
                {feedbacks.map((item, idx) => {
                  const colors = ['border-primary', 'border-secondary', 'border-brand-orange', 'border-brand-red', 'border-brand-yellow'];
                  const color = colors[idx % colors.length];
                  const bgColors = ['bg-primary/5', 'bg-secondary/5', 'bg-brand-orange/5', 'bg-brand-red/5', 'bg-brand-yellow/5'];
                  const bgColor = bgColors[idx % bgColors.length];

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className={`bg-white p-8 rounded-[2rem] border-l-8 ${color} shadow-sm hover:shadow-md transition-all`}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <Quote size={32} className="text-primary/5" />
                        <span className="text-xs font-bold text-primary/40 uppercase tracking-widest">
                          {item.createdAt?.toDate().toLocaleDateString()}
                        </span>
                      </div>
                      
                      <p className="text-primary/80 text-lg italic mb-8 leading-relaxed">
                        "{item.comments}"
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-primary/5">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center font-bold text-primary/70`}>
                            {item.parentName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-primary">{item.parentName}</h4>
                            <p className="text-primary/50 text-sm">Parent of {item.studentName}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentFeedback;
