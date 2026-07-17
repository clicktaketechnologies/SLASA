import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Users, 
  BookOpen, 
  MessageSquare, 
  ArrowUpRight, 
  ArrowDownRight,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { collection, query, orderBy, limit, getDocs, where, doc, getDoc } from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import TeacherPortal from './TeacherPortal';
import StudentPortal from './StudentPortal';
import ParentPortal from './ParentPortal';

const Dashboard = () => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalLeads: 0,
    activeCourses: 0,
    pendingFeedback: 0
  });
  const [recentLeads, setRecentLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Wait for auth to be ready
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }

      try {
        // Fetch user role
        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          setUserRole(userDoc.data().role);
        } else if (auth.currentUser.email === 'clicktaketechnologies@gmail.com') {
          setUserRole('super_admin');
        }

        // Fetch stats
        const [
          studentsSnap,
          activeLeadsSnap,
          coursesSnap,
          pendingFeedbackSnap,
          recentLeadsSnap
        ] = await Promise.all([
          getDocs(query(collection(db, 'users'), where('role', '==', 'student'))),
          getDocs(query(collection(db, 'leads'), where('status', 'in', ['new', 'contacted']))),
          getDocs(collection(db, 'courses')),
          getDocs(query(collection(db, 'submissions'), where('status', '==', 'submitted'))),
          getDocs(query(collection(db, 'leads'), orderBy('createdAt', 'desc'), limit(5)))
        ]);

        const leads = recentLeadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentLeads(leads);

        setStats({
          totalStudents: studentsSnap.size,
          totalLeads: activeLeadsSnap.size,
          activeCourses: coursesSnap.size,
          pendingFeedback: pendingFeedbackSnap.size
        });
      } catch (err: any) {
        console.error('Error fetching dashboard data:', err);
        setError(err.message);
        if (err.message.includes('insufficient permissions')) {
          handleFirestoreError(err, OperationType.LIST, 'leads');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-10 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-3xl inline-block">
          <AlertCircle className="mx-auto mb-4" size={32} />
          <p className="font-bold">Error loading dashboard</p>
          <p className="text-sm opacity-80">{error}</p>
        </div>
      </div>
    );
  }

  // Render role-specific dashboards
  if (userRole === 'teacher') return <TeacherPortal />;
  if (userRole === 'student') return <StudentPortal />;
  if (userRole === 'parent') return <ParentPortal />;

  const statCards = [
    { title: 'Total Students', value: stats.totalStudents, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%', isUp: true },
    { title: 'Active Leads', value: stats.totalLeads, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50', trend: '+5%', isUp: true },
    { title: 'Active Courses', value: stats.activeCourses, icon: BookOpen, color: 'text-purple-600', bg: 'bg-purple-50', trend: '0%', isUp: true },
    { title: 'Pending Feedback', value: stats.pendingFeedback, icon: MessageSquare, color: 'text-orange-600', bg: 'bg-orange-50', trend: '-2%', isUp: false },
  ];

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Academy Overview</h1>
          <p className="text-neutral-500 font-medium">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white border border-neutral-200 px-4 py-2 rounded-xl text-sm font-bold text-neutral-600 hover:bg-neutral-50 transition-all flex items-center space-x-2">
            <Calendar size={18} />
            <span>Last 30 Days</span>
          </button>
          <button className="btn-primary px-6 py-2 text-sm font-bold shadow-lg shadow-primary/20">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-[2.5rem] border border-neutral-100 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center space-x-1 text-xs font-black ${stat.isUp ? 'text-green-500' : 'text-red-500'}`}>
                <span>{stat.trend}</span>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <h3 className="text-neutral-400 text-xs font-black uppercase tracking-widest mb-1">{stat.title}</h3>
            <p className="text-3xl font-black text-neutral-900 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Leads */}
        <div className="lg:col-span-2 bg-white rounded-[3rem] border border-neutral-100 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-neutral-100 flex items-center justify-between">
            <h3 className="text-xl font-black text-neutral-900 tracking-tight">Recent Leads</h3>
            <Link to="/admin/leads" className="text-primary font-bold text-sm hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50">
                  <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Name</th>
                  <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Status</th>
                  <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Date</th>
                  <th className="px-8 py-4 text-xs font-black text-neutral-400 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {recentLeads.length > 0 ? recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-neutral-50 transition-all group">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary text-xs">
                          {lead.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">{lead.name}</p>
                          <p className="text-xs text-neutral-400 font-medium">{lead.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        lead.status === 'new' ? 'bg-blue-50 text-blue-600' :
                        lead.status === 'contacted' ? 'bg-orange-50 text-orange-600' :
                        lead.status === 'enrolled' ? 'bg-green-50 text-green-600' :
                        'bg-neutral-100 text-neutral-500'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-2 text-neutral-400 text-sm font-medium">
                        <Clock size={14} />
                        <span>{new Date(lead.createdAt?.seconds * 1000).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <button className="text-neutral-400 hover:text-primary transition-colors">
                        <ArrowUpRight size={20} />
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center justify-center text-neutral-400">
                        <AlertCircle size={48} className="mb-4 opacity-20" />
                        <p className="font-bold">No leads found yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Activity */}
        <div className="bg-white rounded-[3rem] border border-neutral-100 shadow-sm p-8">
          <h3 className="text-xl font-black text-neutral-900 tracking-tight mb-8">Quick Actions</h3>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="bg-primary text-white p-3 rounded-xl">
                  <Users size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-primary">Add New Student</p>
                  <p className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Manual Enrollment</p>
                </div>
              </div>
              <ArrowRight className="text-primary group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-secondary/5 border border-secondary/10 hover:bg-secondary/10 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="bg-secondary text-white p-3 rounded-xl">
                  <BookOpen size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-secondary">Create Lesson</p>
                  <p className="text-[10px] font-bold text-secondary/40 uppercase tracking-widest">Weekly Content</p>
                </div>
              </div>
              <ArrowRight className="text-secondary group-hover:translate-x-1 transition-transform" size={20} />
            </button>

            <button className="w-full flex items-center justify-between p-4 rounded-2xl bg-accent-yellow/5 border border-accent-yellow/10 hover:bg-accent-yellow/10 transition-all group">
              <div className="flex items-center space-x-4">
                <div className="bg-accent-yellow text-white p-3 rounded-xl">
                  <MessageSquare size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-accent-yellow">Send Alert</p>
                  <p className="text-[10px] font-bold text-accent-yellow/40 uppercase tracking-widest">SMS & Email</p>
                </div>
              </div>
              <ArrowRight className="text-accent-yellow group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>

          <div className="mt-12">
            <h4 className="text-xs font-black text-neutral-400 uppercase tracking-widest mb-6">Recent Activity</h4>
            <div className="space-y-6">
              {[
                { user: 'Sarah Ahmed', action: 'added a new lesson', time: '2h ago', icon: CheckCircle, color: 'text-green-500' },
                { user: 'System', action: 'sent fee alerts', time: '5h ago', icon: AlertCircle, color: 'text-blue-500' },
                { user: 'Admin', action: 'updated pricing', time: '1d ago', icon: CheckCircle, color: 'text-green-500' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`${activity.color} mt-1`}>
                    <activity.icon size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-neutral-900">
                      <span className="font-black">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{activity.time}</p>
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

export default Dashboard;
