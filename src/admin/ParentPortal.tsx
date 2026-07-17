import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  Bell, 
  CheckCircle, 
  Clock, 
  Star,
  Loader2,
  AlertCircle,
  ChevronRight,
  User,
  Heart
} from 'lucide-react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { motion } from 'motion/react';

const ParentPortal = () => {
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'feedback'), 
        where('parentId', '==', auth.currentUser?.uid),
        orderBy('createdAt', 'desc')
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedback(items);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Parent Portal</h1>
          <p className="text-neutral-500 font-medium">Track your child's progress, view weekly updates, and communicate with teachers.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-neutral-100 shadow-sm">
          <div className="bg-primary/10 text-primary p-2 rounded-xl">
            <Heart size={20} />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Child Progress</p>
            <p className="text-lg font-black text-neutral-900 tracking-tight">Excellent</p>
          </div>
        </div>
      </div>

      {/* Child Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Weekly Attendance', value: '100%', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Average Score', value: '92%', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Teacher Feedback', value: '4 New', icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm flex items-center space-x-6">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{stat.label}</p>
              <p className="text-3xl font-black text-neutral-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Weekly Updates */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-neutral-900 tracking-tight">Weekly Progress Updates</h3>
            <button className="text-sm font-bold text-primary hover:underline">View History</button>
          </div>

          <div className="space-y-4">
            {[
              { subject: 'Maths', topic: 'Algebra & Equations', progress: '95%', status: 'Excellent', date: 'Mar 20, 2026' },
              { subject: 'English', topic: 'Creative Writing', progress: '88%', status: 'Good', date: 'Mar 18, 2026' },
              { subject: 'Science', topic: 'Chemical Reactions', progress: '90%', status: 'Excellent', date: 'Mar 15, 2026' },
            ].map((update, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div className="flex items-center space-x-6">
                  <div className="bg-neutral-100 p-4 rounded-2xl text-neutral-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <CheckCircle size={24} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                        {update.subject}
                      </span>
                      <span className="text-xs font-bold text-neutral-400">{update.date}</span>
                    </div>
                    <h4 className="font-black text-neutral-900 text-lg">{update.topic}</h4>
                    <p className="text-sm text-neutral-500">Progress: {update.progress} • {update.status}</p>
                  </div>
                </div>
                <button className="p-3 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <ChevronRight size={24} />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Teacher Feedback */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-neutral-900 tracking-tight">Teacher Feedback</h3>
            <button className="text-sm font-bold text-primary hover:underline">Message Teacher</button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="p-20 text-center bg-white rounded-[3rem] border border-neutral-100">
                <Loader2 className="animate-spin mx-auto text-primary" size={32} />
              </div>
            ) : feedback.length > 0 ? feedback.map((fb) => (
              <div key={fb.id} className="bg-white p-8 rounded-[2.5rem] border border-neutral-100 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <div className="bg-neutral-100 p-2 rounded-xl text-neutral-400">
                        <User size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-black uppercase tracking-widest text-neutral-900">{fb.teacherName}</p>
                        <p className="text-[10px] text-neutral-400">{fb.subject}</p>
                      </div>
                    </div>
                    <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                      {fb.createdAt ? new Date(fb.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                    </p>
                  </div>
                  <p className="text-neutral-600 font-medium leading-relaxed">{fb.comment}</p>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-all"></div>
              </div>
            )) : (
              <div className="p-20 text-center bg-white rounded-[3rem] border border-neutral-100 text-neutral-400">
                <AlertCircle size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold">No feedback received yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentPortal;
