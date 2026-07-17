import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Bell, 
  Search,
  BookOpen,
  MessageSquare,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const role = userDoc.data().role;
            setUserRole(role);
            if (!['super_admin', 'admin', 'staff', 'teacher', 'student', 'parent'].includes(role)) {
              navigate('/'); 
            }
          } else {
            // Check if it's the default admin
            if (user.email === 'clicktaketechnologies@gmail.com') {
              const defaultRole = 'super_admin';
              // Create the user document automatically for the default admin
              await setDoc(userDocRef, {
                uid: user.uid,
                email: user.email,
                displayName: user.displayName || 'Super Admin',
                role: defaultRole,
                createdAt: serverTimestamp()
              });
              setUserRole(defaultRole);
            } else {
              navigate('/');
            }
          }
        } catch (error) {
          console.error('Error checking user role:', error);
          // If it's a permission error, we might still be the default admin
          if (user.email === 'clicktaketechnologies@gmail.com') {
            setUserRole('super_admin');
          } else {
            navigate('/login');
          }
        }
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  const getMenuItems = () => {
    const baseItems = [
      { title: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    ];

    if (['super_admin', 'admin', 'staff'].includes(userRole || '')) {
      return [
        ...baseItems,
        { title: 'CMS / Pages', icon: FileText, path: '/admin/cms' },
        { title: 'Leads', icon: TrendingUp, path: '/admin/leads' },
        { title: 'Users & Roles', icon: Users, path: '/admin/users' },
        { title: 'Courses', icon: BookOpen, path: '/admin/courses' },
        { title: 'Feedback', icon: MessageSquare, path: '/admin/feedback' },
        { title: 'Settings', icon: Settings, path: '/admin/settings' },
      ];
    }

    if (userRole === 'teacher') {
      return [
        ...baseItems,
        { title: 'My Lessons', icon: BookOpen, path: '/admin/teacher/lessons' },
        { title: 'Student Feedback', icon: MessageSquare, path: '/admin/teacher/feedback' },
        { title: 'My Students', icon: Users, path: '/admin/teacher/students' },
      ];
    }

    if (userRole === 'student') {
      return [
        ...baseItems,
        { title: 'My Lessons', icon: BookOpen, path: '/admin/student/lessons' },
        { title: 'My Progress', icon: TrendingUp, path: '/admin/student/progress' },
        { title: 'Feedback', icon: MessageSquare, path: '/admin/student/feedback' },
      ];
    }

    if (userRole === 'parent') {
      return [
        ...baseItems,
        { title: 'Child Progress', icon: TrendingUp, path: '/admin/parent/progress' },
        { title: 'Teacher Feedback', icon: MessageSquare, path: '/admin/parent/feedback' },
        { title: 'Weekly Updates', icon: Bell, path: '/admin/parent/updates' },
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!auth.currentUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside 
        className={`bg-neutral-900 text-white w-64 fixed h-full transition-transform duration-300 z-50 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <Link to="/admin" className="flex items-center space-x-2">
            <ShieldCheck className="text-secondary" size={24} />
            <span className="font-black text-xl tracking-tight">Admin Panel</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-xl transition-all ${
                location.pathname === item.path 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'text-white/60 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon size={20} />
              <span className="font-bold text-sm">{item.title}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 p-3 w-full rounded-xl text-white/60 hover:bg-red-500/10 hover:text-red-500 transition-all"
          >
            <LogOut size={20} />
            <span className="font-bold text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-neutral-200 h-16 flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center space-x-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-neutral-500">
              <Menu size={24} />
            </button>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-neutral-100 border-none rounded-full pl-10 pr-4 py-2 text-sm w-64 focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-neutral-500 hover:bg-neutral-100 rounded-full relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 pl-4 border-l border-neutral-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-neutral-900">{auth.currentUser?.displayName || 'Admin'}</p>
                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{userRole?.replace('_', ' ')}</p>
              </div>
              <img 
                src={auth.currentUser?.photoURL || `https://ui-avatars.com/api/?name=${auth.currentUser?.email}&background=random`} 
                className="w-10 h-10 rounded-full border-2 border-neutral-100" 
                alt="Profile" 
              />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
