import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { 
  ShieldCheck, 
  Mail, 
  Lock, 
  ArrowRight, 
  Loader2, 
  User, 
  Sparkles, 
  CheckCircle,
  GraduationCap,
  Users2,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { motion } from 'motion/react';

const Login = () => {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'student' | 'parent' | 'teacher' | 'staff' | 'admin'>('student');
  const [loading, setLoading] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check if user exists in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      let finalRole = 'student';
      if (!userDoc.exists()) {
        finalRole = user.email === 'clicktaketechnologies@gmail.com' ? 'super_admin' : 'student';
        // Create new user profile with default role
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Google User',
          role: finalRole,
          createdAt: serverTimestamp(),
        });
      } else {
        finalRole = userDoc.data().role;
      }

      // Check if the role is valid for access
      if (['super_admin', 'admin', 'staff', 'teacher', 'student', 'parent'].includes(finalRole)) {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (activeTab === 'signin') {
        // Handle standard sign in
        const result = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          const userRole = userDoc.data().role;
          if (['super_admin', 'admin', 'staff', 'teacher', 'student', 'parent'].includes(userRole)) {
            navigate('/admin');
          } else {
            navigate('/');
          }
        } else {
          // Fallback if auth exists but no firestore doc
          navigate('/');
        }
      } else {
        // Handle standard sign up
        const result = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;

        // Create the user document in Firestore immediately
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: displayName || email.split('@')[0],
          role: role,
          createdAt: serverTimestamp(),
        });

        // Redirect directly to the dashboard
        navigate('/admin');
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('This email address is already registered. Try logging in instead.');
      } else if (err.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password.');
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  // Automated quick demo seeder and login function
  const handleDemoLogin = async (demoEmail: string, demoRole: 'super_admin' | 'teacher' | 'student' | 'parent', demoName: string) => {
    setLoading(true);
    setError(null);
    setSeedStatus(`Checking and provisioning demo account...`);

    try {
      let userCredential;
      try {
        // Attempt to login first
        userCredential = await signInWithEmailAndPassword(auth, demoEmail, 'password123');
      } catch (loginErr: any) {
        // If user doesn't exist, register them on the fly
        if (loginErr.code === 'auth/user-not-found' || loginErr.code === 'auth/invalid-credential') {
          setSeedStatus(`Creating permanent demo account for ${demoName}...`);
          userCredential = await createUserWithEmailAndPassword(auth, demoEmail, 'password123');
        } else {
          throw loginErr;
        }
      }

      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      // Force update or create the document to match our desired demo role
      if (!userDoc.exists() || userDoc.data().role !== demoRole) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: demoEmail,
          displayName: demoName,
          role: demoRole,
          createdAt: serverTimestamp(),
        }, { merge: true });
      }

      setSeedStatus(null);
      navigate('/admin');
    } catch (err: any) {
      setError(`Failed to set up demo login: ${err.message}`);
      setSeedStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { email: 'admin@example.com', role: 'super_admin' as const, name: 'Slasa Admin', icon: ShieldCheck, color: 'text-red-500 bg-red-50' },
    { email: 'teacher@example.com', role: 'teacher' as const, name: 'Dr. Jane Smith', icon: BookOpen, color: 'text-purple-500 bg-purple-50' },
    { email: 'student@example.com', role: 'student' as const, name: 'Alex Johnson', icon: GraduationCap, color: 'text-green-500 bg-green-50' },
    { email: 'parent@example.com', role: 'parent' as const, name: 'Robert Johnson', icon: Users2, color: 'text-blue-500 bg-blue-50' },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-brand-orange/5 to-secondary/5 z-0"></div>
      
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Left Side: Dynamic and Informative Promo Panel */}
        <div className="lg:col-span-5 text-left space-y-6 hidden lg:block pr-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider"
          >
            <Sparkles size={14} />
            <span>Slasa Academy Portal</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-black text-primary tracking-tight leading-tight"
          >
            Empowering <span className="text-secondary">Students</span> and Educators Alike
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-neutral-500 font-medium leading-relaxed"
          >
            Access personalized lessons, submit homework online, receive expert tutor reviews, and track student visual galleries through our robust educational management platform.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 pt-4 border-t border-neutral-200"
          >
            <div className="flex items-start space-x-3">
              <div className="bg-white p-2.5 rounded-xl shadow-sm border border-neutral-100 mt-1">
                <GraduationCap className="text-secondary" size={18} />
              </div>
              <div>
                <h4 className="font-bold text-neutral-800 text-sm">Personalized Learning</h4>
                <p className="text-xs text-neutral-400">Lessons structured strictly by educational levels.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="bg-white p-2.5 rounded-xl shadow-sm border border-neutral-100 mt-1">
                <ShieldCheck className="text-primary" size={18} />
              </div>
              <div>
                <h4 className="font-bold text-neutral-800 text-sm">Role-Based Access</h4>
                <p className="text-xs text-neutral-400">Secure dashboards for Admins, Teachers, Students, and Parents.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Tabbed Login / Sign Up Form & Live Verification */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-7 bg-white rounded-[3rem] shadow-2xl border border-neutral-100 p-8 md:p-10"
        >
          {/* Tabs header */}
          <div className="flex border-b border-neutral-100 mb-8">
            <button
              onClick={() => { setActiveTab('signin'); setError(null); }}
              className={`flex-1 pb-4 text-sm font-black uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'signin' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setActiveTab('signup'); setError(null); }}
              className={`flex-1 pb-4 text-sm font-black uppercase tracking-wider border-b-2 transition-all ${
                activeTab === 'signup' 
                  ? 'border-primary text-primary' 
                  : 'border-transparent text-neutral-400 hover:text-neutral-600'
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-primary tracking-tight mb-2">
              {activeTab === 'signin' ? 'Sign In to Your Account' : 'Create an Account'}
            </h1>
            <p className="text-sm text-neutral-500 font-medium">
              {activeTab === 'signin' ? 'Enter your details below to continue' : 'Join our academy community today'}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold flex items-start space-x-2">
              <span className="text-red-500 font-black">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {seedStatus && (
            <div className="bg-primary/5 border border-primary/10 text-primary p-4 rounded-2xl mb-6 text-sm font-bold flex items-center space-x-2">
              <Loader2 className="animate-spin text-primary" size={16} />
              <span>{seedStatus}</span>
            </div>
          )}

          <form onSubmit={handleEmailAuth} className="space-y-5">
            {activeTab === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-4">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                  <input 
                    type="text" 
                    required
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    placeholder="Enter full name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-4">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-4">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-4 py-3.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {activeTab === 'signup' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-4">Select Role</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { value: 'student', label: 'Student' },
                    { value: 'parent', label: 'Parent' },
                    { value: 'teacher', label: 'Teacher' },
                    { value: 'staff', label: 'Staff' }
                  ].map((r) => (
                    <button
                      key={r.value}
                      type="button"
                      onClick={() => setRole(r.value as any)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold transition-all border ${
                        role === r.value 
                          ? 'bg-primary text-white border-primary shadow-md shadow-primary/10' 
                          : 'bg-neutral-50 text-neutral-600 border-neutral-100 hover:bg-neutral-100'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="btn-primary w-full py-4 text-base shadow-xl shadow-primary/20 flex items-center justify-center space-x-2 transition-transform active:scale-95"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : (
                <>
                  <span>{activeTab === 'signin' ? 'Sign In' : 'Sign Up'}</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Social login divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-neutral-400">
              <span className="bg-white px-4">Or alternative access</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white border border-neutral-200 rounded-2xl py-3.5 flex items-center justify-center space-x-3 hover:bg-neutral-50 transition-all shadow-sm"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              <span className="font-bold text-sm text-neutral-700">Google Account</span>
            </button>

            {/* Quick Default Super Admin Shortcut for Owner */}
            <button 
              onClick={() => handleDemoLogin('clicktaketechnologies@gmail.com', 'super_admin', 'Slasa Developer')}
              disabled={loading}
              className="w-full bg-neutral-900 border border-neutral-800 text-white rounded-2xl py-3.5 flex items-center justify-center space-x-2 hover:bg-neutral-850 transition-all shadow-sm"
              title="Instantly sign-in to super admin using clicktaketechnologies@gmail.com"
            >
              <ShieldCheck className="text-secondary" size={18} />
              <span className="font-bold text-sm">Owner Auto-Admin</span>
            </button>
          </div>

          {/* Persistent Quick Demo Accounts for Verification */}
          <div className="mt-8 pt-6 border-t border-neutral-100">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
                ⚡ Quick Verify Demo Accounts (Seeded Instantly)
              </span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  onClick={() => handleDemoLogin(account.email, account.role, account.name)}
                  disabled={loading}
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-neutral-50 border border-neutral-100 hover:border-primary/20 hover:bg-white transition-all group text-center"
                >
                  <div className={`p-2 rounded-xl mb-2 transition-transform group-hover:scale-110 ${account.color}`}>
                    <account.icon size={16} />
                  </div>
                  <span className="text-xs font-bold text-neutral-800 block truncate max-w-full">
                    {account.role.replace('_', ' ')}
                  </span>
                  <span className="text-[9px] text-neutral-400 font-medium mt-0.5">
                    {account.email.split('@')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

