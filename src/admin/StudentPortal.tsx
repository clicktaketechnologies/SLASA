import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  MessageSquare, 
  FileText, 
  Download,
  Loader2,
  AlertCircle,
  ChevronRight,
  Star
} from 'lucide-react';
import { collection, query, orderBy, getDocs, where, limit, addDoc, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { motion } from 'motion/react';

const StudentPortal = () => {
  const [lessons, setLessons] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (u) {
        fetchData(u.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async (uid: string) => {
    setLoading(true);
    try {
      // Fetch Lessons
      const lessonsQ = query(collection(db, 'lessons'), orderBy('createdAt', 'desc'), limit(5));
      const lessonsSnapshot = await getDocs(lessonsQ);
      setLessons(lessonsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));

      // Fetch Submissions (Query without orderBy to avoid composite index requirements, sort client-side)
      const submissionsQ = query(
        collection(db, 'submissions'), 
        where('studentId', '==', uid)
      );
      const submissionsSnapshot = await getDocs(submissionsQ);
      const subData = submissionsSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a: any, b: any) => {
          const timeA = a.submittedAt?.seconds || 0;
          const timeB = b.submittedAt?.seconds || 0;
          return timeB - timeA;
        })
        .slice(0, 10);
      setSubmissions(subData);

      // Fetch Feedback (Query without orderBy to avoid composite index requirements, sort client-side)
      const feedbackQ = query(
        collection(db, 'feedback'), 
        where('studentId', '==', uid)
      );
      const feedbackSnapshot = await getDocs(feedbackQ);
      const fbData = feedbackSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a: any, b: any) => {
          const timeA = a.createdAt?.seconds || 0;
          const timeB = b.createdAt?.seconds || 0;
          return timeB - timeA;
        })
        .slice(0, 5);
      setFeedback(fbData);

    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAverageScore = () => {
    const graded = submissions.filter(s => s.score !== undefined);
    if (graded.length === 0) return 'N/A';
    const avg = graded.reduce((acc, s) => acc + s.score, 0) / graded.length;
    if (avg >= 90) return 'A*';
    if (avg >= 80) return 'A';
    if (avg >= 70) return 'B';
    if (avg >= 60) return 'C';
    return 'D';
  };

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Student Dashboard</h1>
          <p className="text-neutral-500 font-medium">Welcome back! Here's your personalized learning overview.</p>
        </div>
        <div className="flex items-center space-x-3 bg-white p-2 rounded-2xl border border-neutral-100 shadow-sm">
          <div className="bg-green-50 text-green-600 p-2 rounded-xl">
            <CheckCircle size={20} />
          </div>
          <div className="pr-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">Attendance</p>
            <p className="text-lg font-black text-neutral-900 tracking-tight">98%</p>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Completed', value: submissions.filter(s => s.status === 'graded').length.toString(), icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Pending', value: submissions.filter(s => s.status === 'submitted').length.toString(), icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Assignments', value: submissions.length.toString(), icon: FileText, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Avg Grade', value: getAverageScore(), icon: Star, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm flex items-center space-x-4">
            <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-neutral-400">{stat.label}</p>
              <p className="text-2xl font-black text-neutral-900 tracking-tight">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Lessons List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-neutral-900 tracking-tight">Recent Lessons</h3>
            <button className="text-sm font-bold text-primary hover:underline">View All</button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="p-20 text-center bg-white rounded-[3rem] border border-neutral-100">
                <Loader2 className="animate-spin mx-auto text-primary" size={32} />
              </div>
            ) : lessons.length > 0 ? lessons.map((lesson) => (
              <motion.div 
                key={lesson.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-md transition-all group flex items-center justify-between"
              >
                <div className="flex items-center space-x-6">
                  <div className="bg-neutral-100 p-4 rounded-2xl text-neutral-400 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mb-1">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                        {lesson.subject}
                      </span>
                      <span className="text-xs font-bold text-neutral-400">by {lesson.teacherName || 'Teacher'}</span>
                    </div>
                    <h4 className="font-black text-neutral-900 text-lg">{lesson.title}</h4>
                  </div>
                </div>
                <button className="p-3 text-neutral-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all">
                  <ChevronRight size={24} />
                </button>
              </motion.div>
            )) : (
              <div className="p-20 text-center bg-white rounded-[3rem] border border-neutral-100 text-neutral-400">
                <AlertCircle size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-bold">No lessons available yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar: Feedback & Notifications */}
        <div className="space-y-10">
          <div className="bg-neutral-900 text-white p-8 rounded-[3rem] shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-black tracking-tight mb-2">Teacher's Feedback</h3>
              <p className="text-neutral-400 text-sm mb-6">Latest comments on your work.</p>
              
              <div className="space-y-4">
                {feedback.length > 0 ? feedback.map((fb, i) => (
                  <div key={i} className="bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-black uppercase tracking-widest text-primary">{fb.teacherName || 'Teacher'}</p>
                      <p className="text-[10px] text-neutral-500">{fb.createdAt?.toDate ? fb.createdAt.toDate().toLocaleDateString() : 'Recent'}</p>
                    </div>
                    <p className="text-sm text-neutral-300 font-medium">{fb.content}</p>
                  </div>
                )) : (
                  <p className="text-neutral-500 text-sm italic">No feedback yet.</p>
                )}
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-neutral-100 shadow-sm">
            <h3 className="text-xl font-black text-neutral-900 tracking-tight mb-6">Upcoming Tasks</h3>
            <div className="space-y-6">
              {[
                { title: 'Maths Homework', due: 'Tomorrow', priority: 'High' },
                { title: 'Science Project', due: 'Friday', priority: 'Medium' },
                { title: 'English Essay', due: 'Next Monday', priority: 'Low' },
              ].map((task, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className={`w-2 h-10 rounded-full ${
                    task.priority === 'High' ? 'bg-red-500' : 
                    task.priority === 'Medium' ? 'bg-orange-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-bold text-neutral-900 text-sm">{task.title}</p>
                    <p className="text-xs text-neutral-400">Due: {task.due}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPortal;
