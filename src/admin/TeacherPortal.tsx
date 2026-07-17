import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Upload, 
  MessageSquare, 
  Users, 
  CheckCircle, 
  Clock, 
  Plus, 
  FileText,
  Loader2,
  AlertCircle,
  Save,
  X
} from 'lucide-react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';

const TeacherPortal = () => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subject: 'Maths',
    content: '',
    targetGroup: 'Year 10'
  });

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'lessons'), 
        where('teacherId', '==', auth.currentUser?.uid)
      );
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLessons(items);
    } catch (error) {
      console.error('Error fetching lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addDoc(collection(db, 'lessons'), {
        ...formData,
        teacherId: auth.currentUser?.uid,
        teacherName: auth.currentUser?.displayName,
        createdAt: serverTimestamp()
      });
      setIsModalOpen(false);
      fetchLessons();
    } catch (error) {
      console.error('Error saving lesson:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Teacher Workspace</h1>
          <p className="text-neutral-500 font-medium">Manage your subjects, upload content, and provide feedback.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary px-8 py-3 text-sm font-bold shadow-lg shadow-primary/20 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>New Lesson Content</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Active Lessons', value: lessons.length, icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Students Assigned', value: '42', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Pending Feedback', value: '12', icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-50' },
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

      {/* Recent Lessons */}
      <div className="bg-white rounded-[3rem] border border-neutral-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-neutral-100">
          <h3 className="text-lg font-black text-neutral-900 tracking-tight">Your Uploaded Content</h3>
        </div>
        <div className="divide-y divide-neutral-100">
          {loading ? (
            <div className="p-20 text-center">
              <Loader2 className="animate-spin mx-auto text-primary" size={32} />
            </div>
          ) : lessons.length > 0 ? lessons.map((lesson) => (
            <div key={lesson.id} className="p-8 hover:bg-neutral-50 transition-all flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="bg-neutral-100 p-4 rounded-2xl text-neutral-400">
                  <FileText size={24} />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                      {lesson.subject}
                    </span>
                    <span className="text-xs font-bold text-neutral-400">{lesson.targetGroup}</span>
                  </div>
                  <h4 className="font-black text-neutral-900 text-lg">{lesson.title}</h4>
                  <p className="text-sm text-neutral-500 line-clamp-1">{lesson.content}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-xs font-bold text-neutral-400">Uploaded on</p>
                  <p className="text-sm font-black text-neutral-900">
                    {lesson.createdAt ? new Date(lesson.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                  </p>
                </div>
                <button className="p-3 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <MessageSquare size={20} />
                </button>
              </div>
            </div>
          )) : (
            <div className="p-20 text-center text-neutral-400">
              <AlertCircle size={48} className="mx-auto mb-4 opacity-20" />
              <p className="font-bold">No lessons uploaded yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <div>
                    <h2 className="text-3xl font-black text-neutral-900 tracking-tight">Upload Lesson</h2>
                    <p className="text-neutral-500 font-medium">Share subject-based content with your students.</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-3 text-neutral-400 hover:bg-neutral-100 rounded-full transition-all">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Subject</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="Maths">Maths</option>
                        <option value="English">English</option>
                        <option value="Science">Science</option>
                        <option value="History">History</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Target Group</label>
                      <input 
                        type="text" 
                        required
                        value={formData.targetGroup}
                        onChange={(e) => setFormData({...formData, targetGroup: e.target.value})}
                        className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g. Year 10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Lesson Title</label>
                    <input 
                      type="text" 
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-neutral-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="e.g. Introduction to Algebra"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Lesson Content</label>
                    <textarea 
                      required
                      value={formData.content}
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      rows={6}
                      className="w-full bg-neutral-100 border-none rounded-[2rem] px-6 py-6 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Write your lesson content or instructions here..."
                    />
                  </div>

                  <div className="flex items-center justify-end space-x-4 pt-6 border-t border-neutral-100">
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-8 py-4 text-sm font-bold text-neutral-500 hover:bg-neutral-100 rounded-2xl transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="btn-primary px-12 py-4 text-sm font-bold shadow-xl shadow-primary/20 flex items-center space-x-2"
                    >
                      {loading ? <Loader2 className="animate-spin" size={20} /> : (
                        <>
                          <Upload size={20} />
                          <span>Publish Lesson</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherPortal;
