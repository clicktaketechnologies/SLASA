import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { ShieldCheck, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
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
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        // Create new user profile with default role
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          role: user.email === 'clicktaketechnologies@gmail.com' ? 'super_admin' : 'student',
          createdAt: serverTimestamp(),
        });
      }

      const role = userDoc.exists() ? userDoc.data().role : (user.email === 'clicktaketechnologies@gmail.com' ? 'super_admin' : 'student');
      
      if (['super_admin', 'admin', 'staff'].includes(role)) {
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

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      
      if (userDoc.exists()) {
        const role = userDoc.data().role;
        if (['super_admin', 'admin', 'staff'].includes(role)) {
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-brand-orange/5 to-secondary/5 z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl border border-neutral-100 p-10 relative z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-6 shadow-xl shadow-primary/20">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-black text-primary tracking-tight mb-2">Welcome Back</h1>
          <p className="text-neutral-500 font-medium">Log in to your academy account</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-2xl mb-6 text-sm font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleEmailLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-neutral-400 ml-4">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-100 border-none rounded-2xl pl-12 pr-4 py-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary w-full py-4 text-lg shadow-xl shadow-primary/20 flex items-center justify-center space-x-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <span>Sign In</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-neutral-100"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest font-black text-neutral-400">
            <span className="bg-white px-4">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white border border-neutral-200 rounded-2xl py-4 flex items-center justify-center space-x-3 hover:bg-neutral-50 transition-all shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
          <span className="font-bold text-neutral-700">Google Account</span>
        </button>

        <div className="mt-6">
          <button 
            onClick={async () => {
              setLoading(true);
              setError(null);
              try {
                const { createUserWithEmailAndPassword } = await import('firebase/auth');
                const res = await createUserWithEmailAndPassword(auth, 'admin@example.com', 'password123');
                await setDoc(doc(db, 'users', res.user.uid), {
                  uid: res.user.uid,
                  email: 'admin@example.com',
                  displayName: 'Demo Admin',
                  role: 'super_admin',
                  createdAt: serverTimestamp(),
                });
                alert('Demo Admin created! You can now login with admin@example.com / password123');
              } catch (err: any) {
                if (err.code === 'auth/email-already-in-use') {
                  setError('Demo account already exists. Try logging in with admin@example.com / password123');
                } else {
                  setError(err.message);
                }
              } finally {
                setLoading(false);
              }
            }}
            disabled={loading}
            className="w-full bg-neutral-100 text-neutral-600 rounded-2xl py-3 text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition-all"
          >
            Seed Demo Admin Account
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-neutral-500 font-medium">
            Don't have an account? <Link to="/registration" className="text-primary font-black hover:underline">Register Now</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
